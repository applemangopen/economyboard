const boardService = require("./board.service");
const axios = require("axios");

exports.getBoardPageData = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    console.log("BoardController getBoardPageData boardId : ", boardId);

    if (!req.cookies || !req.cookies["token"]) {
      // 클라이언트 측에서 js를 실행하여 알림을 띄운 후 리디렉션 하도록 하는 로직
      return res.send(`
        <script>
          alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
          window.location.href = "/auth/login";
        </script>
      `);
    }

    let token = req.cookies["token"];
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const boardPageData = await boardService.getBoardData(boardId, axiosConfig);
    res.render("board/view.html", boardPageData);
  } catch (error) {
    console.log("BoardController getBoardPageData Error : " + error.message);
    next(error);
  }
};

exports.getModifyPageData = async (req, res, next) => {
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

exports.getBoardModifyPageData = async (req, res, next) => {
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

exports.deleteBoardPage = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    let token = req.cookies["token"];
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    console.log("BoardController deleteBoardPage axiosConfig : ", axiosConfig);
    console.log("BoardController deleteBoardPage boardId : ", boardId);

    const response = await axios.delete(
      `${process.env.DB_API}/boards/board_id/${boardId}`,
      axiosConfig
    );

    console.log("BoardController deleteBoardPage response : ", response);

    // 여기서 response.data.affected가 1이라면 삭제 성공으로 간주
    if (response.data && response.data.affected === 1) {
      return res.json({ isDeleted: true });
    } else {
      return res.json({ isDeleted: false });
    }
  } catch (error) {
    console.log("BoardController deleteBoardPage Error : " + error.message);
    next(error);
  }
};