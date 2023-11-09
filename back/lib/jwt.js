const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        image: user.image,
    };

    const options = { expiresIn: "7d" };

    const token = jwt.sign(payload, JWT_SECRET, options);

    return token;
}

module.exports = { generateToken };
