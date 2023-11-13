const passport = require("passport");

// JWT 인증 미들웨어
function authenticateJwt(req, res, next) {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(401).json({ message: "인증 실패" });
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = authenticateJwt;
