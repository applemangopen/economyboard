const boardService = require("./board.service");

exports.getBoardPageData = async (req, res) => {
  try {
    const boardId = req.params.boardid;
    console.log(boardId);

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

    const boardPageData = await boardService.getBoardData(boardId, axiosConfig);

    res.render("board/view.html", boardPageData);
  } catch (error) {
    console.log("BoardController getBoardPageData Error : " + error.message);
    next(error);
  }
};

exports.getModifyPageData = async (req, res) => {
  try {
    res.render("board/write.html");
  } catch (error) {
    console.log("BoardController getBoardPageData Error : " + error.message);
    throw new Error(
      "BoardController getBoardPageData Error : " + error.message
    );
  }
};
exports.getBoardModifyPageData = async (req, res) => {
  try {
    const token = req.cookies ? req.cookies.token : null;
    if (!token) {
      res.redirect(300, "/auth/login");
    }
    const response = await fetch(
      `http://13.125.55.102:4000/boards/board_id/${req.params.boardId}/user_id/${req.params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const board = await response.json();
    res.render("board/modify.html", board);
  } catch (error) {
    console.log("BoardController getModifyPageData Error : " + error.message);
    next(error);
  }
};

exports.getAnnouncementPageData = async (req, res) => {
  try {
    let processedData = {};
    processedData.category = "Announcement";
    res.render("board/list.html", processedData);
  } catch (error) {
    console.log(
      "BoardController getAnnouncementPageData Error : " + error.message
    );
    next(error);
  }
};
exports.getDomesticPageData = async (req, res) => {
  try {
    res.render("board/list.html", {});
  } catch (error) {
    console.log("BoardController getDomesticPageData Error : " + error.message);
    next(error);
  }
};
exports.getForeignPageData = async (req, res) => {
  try {
    res.render("board/list.html", {});
  } catch (error) {
    console.log("BoardController getForeignPageData Error : " + error.message);
    next(error);
  }
};
exports.getBitcoinPageData = async (req, res) => {
  try {
    res.render("board/list.html", {});
  } catch (error) {
    console.log("BoardController getBitcoinPageData Error : " + error.message);
    next(error);
  }
};
