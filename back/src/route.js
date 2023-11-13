const express = require("express");
const router = express.Router();
const userRoute = require("./user/user.route");
const boardRoute = require("./board/board.route");

router.use("/auth", userRoute);
router.use("/boards", boardRoute);

module.exports = router;
