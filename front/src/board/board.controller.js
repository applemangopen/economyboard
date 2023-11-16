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

exports.getWritePageData = async (req, res) => {
  try {
    const token = req.cookies ? req.cookies.token : null;
    res.render("board/write.html", { ...token });
  } catch (error) {
    console.log("BoardController getBoardPageData Error : " + error.message);
    throw new Error(
      "BoardController getBoardPageData Error : " + error.message
    );
  }
};
exports.getModifyPageData = async (req, res) => {
  try {
    const token = req.cookies ? req.cookies.token : null;
    if (!token) {
      res.redirect(300, "/auth/login");
    }
    const response = await fetch(
      `http://13.209.19.175:4000/boards/board_id/${req.params.boardId}/user_id/${req.params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    const board = await response.json();
    res.render("board/modify.html", { ...board, ...token });
  } catch (error) {
    console.log("BoardController getModifyPageData Error : " + error.message);
    next(error);
  }
};

exports.getCategoryPageData = async (req, res) => {
  try {
    let response = null;
    if (req.query.keyword) {
      response = await fetch(
        `http://13.209.19.175:4000/boards/${req.params.category.toUpperCase()}/${
          req.params.page
        }?keyword=${req.query.keyword}`
      );
    } else {
      response = await fetch(
        `http://13.209.19.175:4000/boards/${req.params.category.toUpperCase()}/${
          req.params.page
        }`
      );
    }
    const boardList = await response.json();
    const list = boardList.data.list[0];
    for (let board of list) {
      board.createdAt = board.createdAt.toString().split("T")[0];
    }
    boardList.category = req.params.category.toUpperCase();
    res.render("board/list.html", boardList);
  } catch (error) {
    console.log("BoardController getCategorypageData Error : " + error.message);
    next(error);
  }
};
