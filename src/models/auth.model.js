const db = require("../config/db");

const authModel = {
  inputAuth: (data) => {
    return new Promise((resolve, reject) => {
      const { id, email, password, level, isVerified } = data;
      db.query(
        `INSERT INTO login (id, email, password, level, is_verified) 
              VALUES ('${id}', '${email}', '${password}',${level},${isVerified})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  inputWorker: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, phone, loginId } = data;
      db.query(
        `INSERT INTO worker (id, name, phone, login_id) 
                  VALUES ('${id}', '${name}', '${phone}','${loginId}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  inputRecruiter: (data) => {
    return new Promise((resolve, reject) => {
      const { id, user, company, position, phone, loginId } = data;
      db.query(
        `INSERT INTO recruiter (id, name_user, name_company, position, phone, login_id) 
                  VALUES ('${id}', '${user}','${company}', '${position}', '${phone}', '${loginId}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  login: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM login WHERE email='${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  getRecriter: (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT login.level, recruiter.id, recruiter.photo, recruiter.name_user, recruiter.login_id FROM login INNER JOIN recruiter ON login.id=recruiter.login_id WHERE recruiter.login_id ='${id}'`,
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  }),
  getWorker: (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT login.level, worker.id, worker.photo, worker.name, worker.login_id FROM login INNER JOIN worker ON login.id=worker.login_id WHERE worker.login_id = '${id}'`,
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  }),
};

module.exports = authModel;
