const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./src/route");

app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

module.exports = app;
