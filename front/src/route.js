const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.html");
});

router.get("/user/:userId", (req, res) => {
    res.render("user/user.modify.html", { userId: req.params.userId });
});

module.exports = router;
