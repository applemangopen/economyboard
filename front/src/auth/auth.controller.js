const authService = require("./auth.service.js");
const axios = require("axios");

// ===== Login =====
exports.getLogin = async (req, res) => {
  try {
    res.render("login.html", {});
  } catch (error) {
    console.log("AuthController getLogin Error : " + error.message);
    throw new Error("AuthController getLogin Error : " + error.message);
  }
};
exports.postLogin = async (req, res) => {
  try {
    console.log("postLogin req.body : ", req.body);

    const { username: email, password: passowrd } = req.body;

    // axios를 사용하여 외부 서버로 POST 요청
    const response = await axios.post("http://43.201.38.233:4000/auth/login", {
      username,
      password,
    });

    // 결과를 저장하고 필요한 작업 수행
    console.log("응답 받음:", response.data);
  } catch (error) {
    console.log("AuthController postLogin Error : " + error.message);
    throw new Error("AuthController postLogin Error : " + error.message);
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
