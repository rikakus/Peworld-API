const db = require("../config/db");

module.exports = {
  countAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) FROM worker", (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  selectAll: (paging, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM worker WHERE name LIKE '%${search}%' LIMIT ${paging.limitValue} OFFSET ${paging.offset}`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  getDetail: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT login.email, worker.id, worker.photo, worker.name, worker.phone, worker.residence, worker.job_desk, worker.workplace, worker.description, worker.login_id, worker.instagram, worker.github, worker.twitter FROM login INNER JOIN worker ON login.id=worker.login_id WHERE worker.login_id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
    skillWithLimit: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill WHERE user_id = '${id}' LIMIT 3 OFFSET 0`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  getSkill: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill WHERE user_id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  getExp: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experience WHERE user_id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  getPortofolio: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM portofolio WHERE user_id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateById: (id, data) =>
    new Promise((resolve, reject) => {
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
      } = data;

      db.query(
        `UPDATE worker SET name='${name}', phone='${phone}', residence='${residence}', job_desk='${jobDesk}', workplace='${workplace}', description='${desc}', instagram='${instagram}', github='${github}', twitter='${twitter}' WHERE id='${id}'`,
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
      db.query(`SELECT * FROM worker WHERE id = '${id}'`, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  inputSkill: (data) =>
    new Promise((resolve, reject) => {
      const { name, id, userId } = data;
      db.query(
        `INSERT INTO skill( id, name, user_id) 
        VALUES ('${id}', '${name}','${userId}')`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  inputExp: (data) =>
    new Promise((resolve, reject) => {
      const {
        id,
        userId,
        position,
        companyName,
        dateJoin,
        dateOut,
        desc,
      } = data;
      db.query(
        `INSERT INTO experience( id, position, company_name, date_join, date_out, description, user_id) 
        VALUES ('${id}', '${position}','${companyName}','${dateJoin}', '${dateOut}', '${desc}', '${userId}')`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  inputPorto: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, name, repository, type } = data;
      db.query(
        `INSERT INTO portofolio( id, name, repository, type, user_id) 
        VALUES ('${id}', '${name}','${repository}','${type}', '${userId}')`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  deleteSkill: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM skill WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  deleteExp: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM experience WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  deletePorto: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM portofolio WHERE id='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  updatePhoto: (id, photo) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE worker SET photo='${photo}' WHERE id='${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};
