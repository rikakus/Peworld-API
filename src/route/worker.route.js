const express = require("express");

const upload = require("../middlewares/upload");
const jwtAuth = require("../middlewares/jwtAuth");
const {
  list,
  detail,
  update,
  deleteSkill,
  deleteExp,
  deletePorto,
  updatePhoto,
  inputSkill,
  inputPorto,
  inputExp,
  listJob,
} = require("../controllers/worker.controllers");

const router = express.Router();

router
  .get("/worker", list)
  .get("/job", listJob)
  .get("/worker/:id", jwtAuth, detail)
  .post("/skill", inputSkill)
  .post("/experience", inputExp)
  .post("/portofolio", inputPorto)
  .put("/worker/:id", update)
  .put("/worker/:id/photo", upload, updatePhoto)
  .delete("/skill/:id", deleteSkill)
  .delete("/experience/:id", deleteExp)
  .delete("/portofolio/:id", deletePorto);

module.exports = router;
