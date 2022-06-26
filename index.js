const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const { failed } = require("./src/utils/response");
const { APP_NAME, NODE_ENV, PORT } = require("./src/utils/env");

// deklarasi express
const app = express();

app.use(express.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());
app.use(cors());
app.use(express.static("public"));

// root router
app.get("/", (req, res) =>
  res.send(`${APP_NAME} API - ${NODE_ENV[0].toUpperCase() + NODE_ENV.slice(1)}`)
);
// main router

app.use(require("./src/route/auth.route"));
app.use(require("./src/route/worker.route"));
app.use(require("./src/route/recruiter.route"));

// 404 router
app.use((req, res) => {
  failed(res, "Resource on that url not found", "failed", "Not Found");
});

// running server
app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}`);
});
