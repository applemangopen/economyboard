const authService = require("./auth.service.js");
const axios = require("axios");

// ===== Login =====
exports.getLogin = async (req, res) => {
  try {
    res.render("auth/login.html", {});
  } catch (error) {
    console.log("AuthController getLogin Error : " + error.message);
    throw new Error("AuthController getLogin Error : " + error.message);
  }
};
exports.postLogin = async (req, res) => {
  try {
    console.log("postLogin req.body : ", req.body);
    const loginInfo = req.body;

    // axios를 사용하여 외부 서버로 POST 요청
    const response = await axios.post(
      `${process.env.DB_API}/auth/login`,
      loginInfo
    );
    const token = response.data;
    console.log("AuthController postLogin token : ", token);

    // ===== token 제대로 받아왔으면, 쿠키로 전송
    if (token) {
      res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json({ success: true, redirectUrl: "/" });
    }
  } catch (error) {
    console.log("AuthController postLogin Error : " + error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== Signup =====
exports.getSignup = async (req, res) => {
  try {
    res.render("auth/signup.html", {});
  } catch (error) {
    console.log("AuthController getSignup Error : " + error.message);
    throw new Error("AuthController getSignup Error : " + error.message);
  }
};
exports.postSignup = async (req, res) => {
  try {
    // res.render("login.html", {});
  } catch (error) {
    console.log("AuthController postSignup Error : " + error.message);
    throw new Error("AuthController postSignup Error : " + error.message);
  }
};
exports.postLogout = async (req, res) => {
  try {
    // res.render("login.html", {});
  } catch (error) {
    console.log("AuthController postSignup Error : " + error.message);
    throw new Error("AuthController postSignup Error : " + error.message);
  }
};
