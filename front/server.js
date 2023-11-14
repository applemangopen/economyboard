const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const nunjucks = require("nunjucks");
const router = require("./src/index.js");
const axios = require("axios");

app.set("view engine", "html");
app.use(cors({ origin: "*", credentials: true }));
nunjucks.configure("views", {
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

app.listen(3000, () => {
  console.log("Front server Start");
});
