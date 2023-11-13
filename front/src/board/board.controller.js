const boardService = require("./board.service");
// test
// console.log("board_controller.js test");
// test
exports.getBoardPageData = async (req, res) => {
  try {
    res.render("board/view.html");
  } catch (error) {
    console.log("BoardController getBoardPageData Error : " + error.message);
    throw new Error(
      "BoardController getBoardPageData Error : " + error.message
    );
  }
};
exports.getAnnouncementPageData = async (req, res) => {
  try {
    // console.log("board_controller.js test");
    res.render("board/list.html", {});
  } catch (error) {
    console.log(
      "BoardController getAnnouncementPageData Error : " + error.message
    );
    throw new Error(
      "BoardController getAnnouncementPageData Error : " + error.message
    );
  }
};
exports.getDomesticPageData = async (req, res) => {
  try {
  } catch (error) {
    console.log("BoardController getDomesticPageData Error : " + error.message);
    throw new Error(
      "BoardController getDomesticPageData Error : " + error.message
    );
  }
};
exports.getForeignPageData = async (req, res) => {
  try {
  } catch (error) {
    console.log("BoardController getForeignPageData Error : " + error.message);
    throw new Error(
      "BoardController getForeignPageData Error : " + error.message
    );
  }
};
exports.getBitcoinPageData = async (req, res) => {
  try {
  } catch (error) {
    console.log("BoardController getBitcoinPageData Error : " + error.message);
    throw new Error(
      "BoardController getBitcoinPageData Error : " + error.message
    );
  }
};
