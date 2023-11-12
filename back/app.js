const { sequelize, initDB } = require("./src/entity");
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/route");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { db } = require("./constants");

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

initDB().then(() => {
    console.log("Database initialized and tables created!");

    app.use(route);
});

module.exports = app;
