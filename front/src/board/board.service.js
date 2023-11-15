const axios = require("axios");

exports.getBoardData = async (req, res) => {
  try {
    console.log(process.env.DB_API);
    // const data =
    return {};
  } catch (error) {
    console.log("BoardService getBoardData Error : " + error.message);
    next(error);
  }
};
