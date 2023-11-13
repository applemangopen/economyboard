const { sequelize, initDB } = require("./src/entity");
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/route");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { db } = require("./constants");
const { User } = require("./src/user/user.model");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(
    new KakaoStrategy(
        {
            clientID: db.kakaoClientId,
            callbackURL: db.kakaoCallbackURL,
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: db.googleClientId,
            clientSecret: db.googleClientSecret,
            callbackURL: db.googleCallbackURL,
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        User.findByPk(jwt_payload.id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => done(err, false));
    })
);

initDB().then(() => {
    console.log("Database initialized and tables created!");

    app.use(route);
});

module.exports = app;
