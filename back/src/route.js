const express = require("express");
const router = express.Router();
const userRoute = require("./user/user.route");

router.use("/auth", userRoute);

module.exports = router;
