const axios = require("axios");

exports.fetchUserContentData = async (userId, req) => {
  try {
    let token;
    let axiosConfig = {};
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
      axiosConfig.headers = {
        Authorization: `Bearer ${token.token}`,
      };
    } else {
      return res.redirect("/auth/login");
    }

    const response = await axios.get(
      `${process.env.DB_API}/users/${userId}`,
      axiosConfig
    );
    const userData = response.data;

    if (userData && userData.data && userData.data.image) {
      userData.data.image = `${process.env.DB_API}${userData.data.image}`;
    }

    // userData 객체에 token을 추가
    return { ...userData, token: token };
  } catch (error) {
    console.error("UserService fetchUserContentData Error: " + error.message);
    return null;
  }
};

// exports.updateUserData = async (req) => {
//     try {
//         // token 추출
//         let token = req.cookies && req.cookies["token"] ? req.cookies["token"] : null;

//         // 여기서 token을 사용할 수 있음
//         // 예를 들어, token을 로깅하거나 다른 함수에 전달할 수 있음
//         console.log("token : ", token);

//         // 필요한 로직을 여기에 추가할 수 있음
//         // 예를 들어, token을 기반으로 사용자 데이터 업데이트 등

//         // 함수에서는 token을 반환할 수 있음
//         return token;
//     } catch (error) {
//         console.error("UserService updateUserData Error: " + error.message);
//         throw new Error("UserService updateUserData Error: " + error.message);
//     }
// };

exports.deleteUserData = async (userId, req) => {
  try {
    let token;
    let axiosConfig = {};
    // req.cookies가 존재하고, token이 있다면 token 값을 설정
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
      console.log("token : ", token);
      // token이 존재할 경우, headers에 Authorization을 추가
      axiosConfig.headers = {
        Authorization: `Bearer ${token.token}`,
      };
    } else {
      res.redirect("/auth/login");
    }

    const response = await axios.delete(
      `${process.env.DB_API}/users/${userId}`,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    console.error("UserService deleteUserData Error: " + error.message);
    throw new Error("UserService deleteUserData Error: " + error.message);
  }
};
