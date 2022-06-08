const workerModel = require("../models/worker.model");
const pagination = require("../utils/pagination");
const { success, failed } = require("../utils/response");
const { v4: uuidv4 } = require("uuid");
const deleteFile = require("../utils/deleteFile");

module.exports = {
  list: async (req, res) => {
    try {
      const str = "";
      const search = req.query.search ? req.query.search : str;
      const { page, limit } = req.query;
      const count = await workerModel.countAll();
      const paging = await pagination(count.rows[0].count, page, limit);
      const users = await workerModel.selectAll(paging, search);

      const data = [];
      for (let i = 0; i < users.rows.length; i++) {
        const skill = await workerModel.skillWithLimit(users.rows[i].id);
        data.push({ ...users.rows[i], skill: skill.rows });
      }

      success(
        res,
        data,
        "success",
        "Select List User Success",
        paging.pagination
      );
    } catch (err) {
      failed(res, err.message, "failed", "Select List User failed");
    }
  },
  detail: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await workerModel.getDetail(id);

      if (!user.rowCount) {
        return failed(res, "data not found", "failed", "failed to get data");
      }

      const skills = await workerModel.getSkill(user.rows[0].id);
      const exp = await workerModel.getExp(user.rows[0].id);
      const porto = await workerModel.getPortofolio(user.rows[0].id);

      const data = {
        user: user.rows[0],
        skills: skills.rows,
        experience: exp.rows,
        portofolio: porto.rows,
      };

      success(res, data, "success", "success to get detail");
    } catch (err) {
      failed(res, err.message, "failed", "failed to get detail");
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const {
        name,
        phone,
        residence,
        jobDesk,
        workplace,
        desc,
        instagram,
        github,
        twitter,
      } = req.body;
      const user = await workerModel.getWorker(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(
          res,
          `User with Id ${id} not found`,
          "failed",
          "Update User Failed"
        );
        return;
      }
      const data = {
        id,
        name,
        phone,
        residence,
        jobDesk,
        workplace,
        desc,
        instagram,
        github,
        twitter,
      };

      await workerModel.updateById(id, data);

      success(res, null, "success", "Update User Success");
    } catch (err) {
      failed(res, err.message, "failed", "Internal Server Error");
    }
  },
  deleteSkill: (req, res) => {
    try {
      const id = req.params.id;
      workerModel
        .deleteSkill(id)
        .then((result) => {
          success(res, result.command, "success", "success to delete");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to delete");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete");
    }
  },
  deleteExp: (req, res) => {
    try {
      const id = req.params.id;
      workerModel
        .deleteExp(id)
        .then((result) => {
          success(res, result.command, "success", "success to delete");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to delete");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete");
    }
  },
  deletePorto: (req, res) => {
    try {
      const id = req.params.id;
      workerModel
        .deletePorto(id)
        .then((result) => {
          success(res, result.command, "success", "success to delete");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to delete");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete");
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await workerModel.getWorker(id);
      if (!user.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }

        failed(
          res,
          `User with Id ${id} not found`,
          "failed",
          "Update User Failed"
        );
        return;
      }
      if (req.file) {
        if (user.rows[0].photo) {
          // menghapus photo lama
          deleteFile(`public/${user.rows[0].photo}`);
        }
        await workerModel.updatePhoto(id, req.file.filename);
      }

      success(res, null, "success", "Update User Success");
    } catch (err) {
      failed(res, err.message, "failed", "Internal Server Error");
    }
  },
  inputSkill: async (req, res) => {
    try {
      const { skill, id } = req.body;
      const user = await workerModel.getWorker(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(
          res,
          `User with Id ${id} not found`,
          "failed",
          "Update User Failed"
        );
        return;
      }

      await workerModel.inputSkill({
        id: uuidv4(),
        name: skill,
        userId: id,
      });

      success(res, null, "success", "Update User Success");
    } catch (err) {
      failed(res, err.message, "failed", "Internal Server Error");
    }
  },
  inputExp: async (req, res) => {
    try {
      const { position, companyName, dateJoin, dateOut, desc, id } = req.body;
      console.log(req.body);
      const user = await workerModel.getWorker(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(
          res,
          `User with Id ${id} not found`,
          "failed",
          "Update User Failed"
        );
        return;
      }

      await workerModel.inputExp({
        id: uuidv4(),
        userId: id,
        position,
        companyName,
        dateJoin,
        dateOut,
        desc,
      });

      success(res, null, "success", "Update User Success");
    } catch (err) {
      failed(res, err.message, "failed", "Internal Server Error");
    }
  },
  inputPorto: async (req, res) => {
    try {
      const { id, name, repository, type } = req.body;
      const user = await workerModel.getWorker(id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(
          res,
          `User with Id ${id} not found`,
          "failed",
          "Update User Failed"
        );
        return;
      }

      await workerModel.inputPorto({
        id: uuidv4(),
        userId: id,
        name,
        repository,
        type,
      });

      success(res, null, "success", "Update User Success");
    } catch (err) {
      failed(res, err.message, "failed", "Internal Server Error");
    }
  },
};
