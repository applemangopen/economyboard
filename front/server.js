require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const nunjucks = require("nunjucks");
const router = require("./src/index.js");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "html");
app.use(cors({ origin: "*", credentials: true }));
nunjucks.configure("views", {
  express: app,
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/config", (req, res) => {
  const clientConfig = {
    apiUrl: process.env.DB_API,
  };
  res.json(clientConfig);
});
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err.message);
  // 사용자에게 오류 페이지 출력
  res.status(500).sendFile(path.join(__dirname, "views", "error.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Front server Start");
});
