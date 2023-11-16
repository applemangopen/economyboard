const express = require("express");
const router = express.Router();
const controller = require("./auth.controller.js");

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/signup", controller.getSignup);
router.post("/signup", controller.postSignup);

router.get("/logout", controller.getLogout);
// router.post("/logout", controller.postLogout);

module.exports = router;
