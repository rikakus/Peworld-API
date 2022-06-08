const recruiterModel = require("../models/recruiter.model");
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
      const count = await recruiterModel.countAll();
      const paging = await pagination(count.rows[0].count, page, limit);
      const users = await recruiterModel.selectAll(paging, search);

      success(
        res,
        users.rows,
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

      const user = await recruiterModel.getDetail(id);

      if (!user.rowCount) {
        return failed(res, "data not found", "failed", "failed to get data");
      }

      success(res, user.rows[0], "success", "success to get detail");
    } catch (err) {
      failed(res, err.message, "failed", "failed to get detail");
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

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
      } = req.body;
      const user = await recruiterModel.getRecruiter(id);
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
      };

      await recruiterModel.updateById(id, data);

      success(res, null, "success", "Update User Success");
    } catch (err) {
      failed(res, err.message, "failed", "Internal Server Error");
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await recruiterModel.getRecruiter(id);
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
        await recruiterModel.updatePhoto(id, req.file.filename);
      }

      success(res, null, "success", "Update User Success");
    } catch (err) {
      failed(res, err.message, "failed", "Internal Server Error");
    }
  },
};
