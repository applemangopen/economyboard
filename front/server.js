const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./src/index.js");
const axios = require("axios");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

app.listen(8080, () => {
  console.log("Front server Start");
});
