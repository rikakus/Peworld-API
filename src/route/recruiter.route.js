const express = require("express");

const upload = require("../middlewares/upload");
const jwtAuth = require("../middlewares/jwtAuth");
const {
  list,
  detail,
  update,
  updatePhoto,
} = require("../controllers/recruiter.controller");

const router = express.Router();

router
  .get("/recruiter", list)
  .get("/recruiter/:id", jwtAuth, detail)
  .put("/recruiter/:id", update)
  .put("/recruiter/:id/photo", upload, updatePhoto)

module.exports = router;
