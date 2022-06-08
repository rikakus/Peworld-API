const express = require("express");
const {
  registerWorker,
  login,
  registerRecruiter,
  getUser,
} = require("../controllers/auth.controller");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

router
  .post("/register/worker", registerWorker)
  .post("/register/recruiter", registerRecruiter)
  .post("/login", login)
  .get("/photo", jwtAuth, getUser);

module.exports = router;
