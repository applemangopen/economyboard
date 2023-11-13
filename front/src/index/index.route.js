const express = require("express");
const router = express.Router();
const controller = require("./index.controller.js");

router.get("/", controller.getIndexPageData);

module.exports = router;
