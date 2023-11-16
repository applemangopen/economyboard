const userService = require("./user.service");

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userData = await userService.fetchUserContentData(userId, req);
    if (!userData) {
      // userData가 null이면 오류 처리
      return res.status(500).send("Error fetching user data");
    }

    // console.log("user데이터는 이거", userData);
    // console.log("토큰은 이거", userData.token);
    res.render("user/user.modify.html", {
      userData: userData.user,
      token: userData.token,
    });
  } catch (error) {
    console.log("UserController getUserDetails Error: " + error.message);
    res.status(500).send("UserController getUserDetails Error");
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedData = { ...req.body };

    await userService.updateUserData(userId, updatedData, req);
    res.redirect(`/users/${userId}`);
  } catch (error) {
    console.error("UserController updateUserDetails Error: " + error.message);
    res.status(500).send("UserController updateUserDetails Error");
  }
};

// key 값을 file로 보내야 되고, binary 폼데이터로 보내면 호환된다.

exports.deleteUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUserData(userId, req);
    res.send("User deleted successfully");
  } catch (error) {
    console.error("UserController deleteUserDetails Error: " + error.message);
    res.status(500).send("UserController deleteUserDetails Error");
  }
};
