const authModel = require("../models/auth.model");
const { success, failed } = require("../utils/response");
const bcrypt = require("bcrypt");
const jwtToken = require("../utils/generateJwtToken");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  registerWorker: async (req, res) => {
    try {
      const { name, email, phone, password, level, isVerified } = req.body;
      const user = await authModel.login(email);
      if (user.rowCount) {
        failed(res, "Email sudah terdaftar", "failed", "Register Gagal");
        return;
      }
      const idLogin = uuidv4();
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "failed hash password");
        }
        const data = {
          id: idLogin,
          email,
          password: hash,
          level,
          isVerified,
        };
        const worker = {
          id: uuidv4(),
          name,
          phone,
          loginId: idLogin,
        };
        authModel
          .inputAuth(data)
          .then((result) => {
            authModel
              .inputWorker(worker)
              .then((result) => {
                success(res, result, "success", "Berhasil Register");
              })
              .catch((err) => {
                failed(res, err.message, "failed", "Gagal Register");
              });
          })
          .catch((err) => {
            failed(res, err.message, "failed", "Gagal Register");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
  registerRecruiter: async (req, res) => {
    try {
      const {
        user,
        email,
        phone,
        company,
        position,
        password,
        level,
        isVerified,
      } = req.body;
      const check = await authModel.login(email);
      if (check.rowCount) {
        failed(res, "Email sudah terdaftar", "failed", "Register Gagal");
        return;
      }
      const idLogin = uuidv4();
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "failed hash password");
        }
        const data = {
          id: idLogin,
          email,
          password: hash,
          level,
          isVerified,
        };
        const recruiter = {
          id: uuidv4(),
          user,
          company,
          position,
          phone,
          loginId: idLogin,
        };
        authModel
          .inputAuth(data)
          .then((result) => {
            authModel
              .inputRecruiter(recruiter)
              .then((result) => {
                success(res, result, "success", "Berhasil Register");
              })
              .catch((err) => {
                failed(res, err.message, "failed", "Gagal Register");
              });
          })
          .catch((err) => {
            failed(res, err.message, "failed", "Gagal Register");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authModel.login(email);
      if (user.rowCount > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);
        if (match) {
          const jwt = await jwtToken({
            id: user.rows[0].id,
            level: user.rows[0].level,
          });
          const data = {
            token: jwt,
            id: user.rows[0].id,
          };
          success(res, data, "success", "Login Berhasil");
          return;
        }
      }

      failed(res, "Email atau Password Salah", "failed", "Login Gagal");
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
  getUser: async (req, res) => {
    try {
      if (req.APP_DATA.tokenDecoded.level == 1) {
        const data = await authModel.getWorker(req.APP_DATA.tokenDecoded.id);
        success(res, data.rows[0], "success", "get photo Success");
        return;
      } else if (req.APP_DATA.tokenDecoded.level == 2) {
        const data = await authModel.getRecriter(req.APP_DATA.tokenDecoded.id);
        const obj = {
          id: data.rows[0].id,
          photo: data.rows[0].photo,
          name: data.rows[0].name_user,
          level: data.rows[0].level,
          login_id: data.rows[0].login_id,
        };
        success(res, obj, "success", "get photo Success");
        return;
      }
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
};
