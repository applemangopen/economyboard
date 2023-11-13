const express = require("express");
const router = express.Router();
const boardRouter = require("./board/board.route.js");
const userRouter = require("./user/user.route.js");
const indexRouter = require("./index/index.route.js");
const axios = require("axios");

router.use("/", indexRouter);
router.use("/users", userRouter);
router.use("/boards", boardRouter);
// router.get으로 쓸 때와, router.use를 쓸 때가 다르다
// 이걸로 엄청난 시간을 고민을 하게 됐다. 주의!!!

router.get("/boardstats", (req, res) => {
  res.render("boardstats.html");
});
router.get("admin", (req, res) => {
  res.render("admin.html");
});
router.get("/chat", (req, res) => {
  res.render("users.html");
});
router.get("/help", (req, res) => {
  res.render("users.html");
});

// router.get("/users/:userId", (req, res) => {
//   res.render("user/user.modify.html", { userId: req.params.userId });
// });

module.exports = router;
