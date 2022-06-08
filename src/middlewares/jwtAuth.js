const jwt = require("jsonwebtoken");
const { failed } = require("../utils/response");
const { JWT_SECRET } = require("../utils/env");

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, JWT_SECRET);

    req.APP_DATA = { tokenDecoded: decoded };
    next();
  } catch (error) {
    failed(res, "Token Invalid", "failed", "Unauthorized");
  }
};
