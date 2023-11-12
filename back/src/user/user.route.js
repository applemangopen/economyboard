const express = require("express");
const userController = require("./user.controller");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const UserService = require("./user.service");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, "./uploads");
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname) + "_" + Date.now() + ext;
            done(null, filename);
        },
    }),
});

router.post("/signup", upload.single("upload1"), userController.signup);
router.post("/login", userController.login);

router.get("/kakao", passport.authenticate("kakao", { session: false }));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
        session: false,
    }),
    userController.loginWithKakao
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    userController.loginWithGoogle
);
router.put("/user/:userId", passport.authenticate("jwt", { session: false }), userController.updateUserInfo);

module.exports = router;
