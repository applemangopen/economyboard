const userService = require("./user.service");

exports.getLoginPageData = async (req, res) => {
  try {
    // res.render("login.html", {});
  } catch (error) {
    console.log("UserController getLoginPageData Error : " + error.message);
    throw new Error("UserController getLoginPageData Error : " + error.message);
  }
};
