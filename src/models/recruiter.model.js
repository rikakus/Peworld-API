const db = require("../config/db");

module.exports = {
  countAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) FROM recruiter", (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  selectAll: (paging, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiter WHERE name_user LIKE '%${search}%' LIMIT ${paging.limitValue} OFFSET ${paging.offset}`,
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
        `SELECT login.email, recruiter.id, recruiter.photo, recruiter.name_user, recruiter.name_company, recruiter.phone, recruiter.position, recruiter.business_fields, recruiter.city, recruiter.description, recruiter.login_id, recruiter.instagram, recruiter.linkedin, recruiter.email_company FROM login INNER JOIN recruiter ON login.id=recruiter.login_id WHERE recruiter.login_id ='${id}'`,
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
        nameUser,
        nameCompany,
        position,
        phone,
        businessFields,
        city,
        desc,
        instagram,
        linkedin,
        email
      } = data;

      db.query(
        `UPDATE recruiter SET name_user='${nameUser}', name_company='${nameCompany}', position='${position}', phone='${phone}', business_fields='${businessFields}', city='${city}', description='${desc}', instagram='${instagram}', linkedin='${linkedin}', email_company='${email}' WHERE id='${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  getRecruiter: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiter WHERE id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updatePhoto: (id, photo) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE recruiter SET photo='${photo}' WHERE id='${id}'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};
