require("dotenv").config();

const {
    DB_DATABASE,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    KAKAO_CLIENT_ID,
    KAKAO_CALLBACK_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
} = process.env;

module.exports = {
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: "mysql",
    kakaoClientId: KAKAO_CLIENT_ID,
    kakaoCallbackURL: KAKAO_CALLBACK_URL,
    googleClientId: GOOGLE_CLIENT_ID,
    googleClientSecret: GOOGLE_CLIENT_SECRET,
    googleCallbackURL: GOOGLE_CALLBACK_URL,
};
