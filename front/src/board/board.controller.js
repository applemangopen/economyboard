const boardService = require("./board.service");
const axios = require("axios");
// console.log("BoardController .env : ", process.env.DB_API);
exports.getBoardPageData = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    // console.log("BoardController getBoardPageData boardId : ", boardId);

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

exports.getWritePageData = async (req, res, next) => {
  try {
    // ===== 사용자 cookie 받아와서, user객체 정보 받아오기 =====
    let token;
    let axiosConfig = {};

    // req.cookies가 존재하고, token이 있다면 token 값을 설정
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
      // console.log("token : ", token);
      // token이 존재할 경우, headers에 Authorization을 추가
      axiosConfig.headers = {
        Authorization: `Bearer ${token.token}`,
      };
    }

    // axios GET 요청
    const responseData = await axios.get(`${process.env.DB_API}`, axiosConfig);
    // console.log("index response : ", response);
    const { user } = responseData.data;
    user.image = `${process.env.DB_API}${user.image}`;

    // console.log(user);
    // =========================================================

    token = req.cookies ? req.cookies.token : null;
    res.render("board/write.html", { ...token, userData: user });
  } catch (error) {
    console.log("BoardController getBoardPageData Error : " + error.message);
    throw new Error(
      "BoardController getBoardPageData Error : " + error.message
    );
  }
};

exports.getModifyPageData = async (req, res, next) => {
  try {
    // ===== 사용자 cookie 받아와서, user객체 정보 받아오기 =====
    let token;
    let axiosConfig = {};

    // req.cookies가 존재하고, token이 있다면 token 값을 설정
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
      // console.log("token : ", token);
      // token이 존재할 경우, headers에 Authorization을 추가
      axiosConfig.headers = {
        Authorization: `Bearer ${token.token}`,
      };
    }

    // axios GET 요청
    const responseData = await axios.get(`${process.env.DB_API}`, axiosConfig);
    // console.log("index response : ", response);
    const { user } = responseData.data;
    user.image = `${process.env.DB_API}${user.image}`;

    // console.log(user);
    // =========================================================

    token = req.cookies ? req.cookies.token : null;
    if (!token) {
      res.redirect(300, "/auth/login");
    }
    const response = await fetch(
      `${process.env.DB_API}/boards/board_id/${req.params.boardId}/user_id/${req.params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    const board = await response.json();
    // console.log(" { ...board, ...token, userData: user } : ", {
    //   ...board,
    //   ...token,
    //   userData: user,
    // });
    res.render("board/modify.html", { ...board, ...token, userData: user });
  } catch (error) {
    console.log("BoardController getModifyPageData Error : " + error.message);
    next(error);
  }
};

exports.getCategoryPageData = async (req, res, next) => {
  try {
    // ===== 사용자 cookie 받아와서, user객체 정보 받아오기 =====
    let token;
    let axiosConfig = {};

    // req.cookies가 존재하고, token이 있다면 token 값을 설정
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
      // console.log("token : ", token);
      // token이 존재할 경우, headers에 Authorization을 추가
      axiosConfig.headers = {
        Authorization: `Bearer ${token.token}`,
      };
    }

    // axios GET 요청
    const responseData = await axios.get(`${process.env.DB_API}`, axiosConfig);
    // console.log("index response : ", response);
    const { user } = responseData.data;

    // console.log(user);
    // =========================================================

    let response = null;
    if (req.query.keyword) {
      response = await fetch(
        `${process.env.DB_API}/boards/${req.params.category.toUpperCase()}/${
          req.params.page
        }?keyword=${req.query.keyword}`
      );
    } else {
      response = await fetch(
        `${process.env.DB_API}/boards/${req.params.category.toUpperCase()}/${
          req.params.page
        }`
      );
    }
    const boardList = await response.json();
    // console.log("BoardController getCategoryPageData boardList : ", boardList);
    // console.log(
    //   "BoardController getCategoryPageData boardList.data : ",
    //   boardList.data
    // );
    // console.log(
    //   "BoardController getCategoryPageData boardList.data.list : ",
    //   boardList.data.list
    // );
    const list = boardList.data.list[0];

    for (let board of list) {
      board.createdAt = board.createdAt.toString().split("T")[0];
    }
    boardList.category = req.params.category.toUpperCase();
    boardList.userData = {
      id: user.id,
      nickname: user.nickname,
      image: `${process.env.DB_API}${user.image}`,
    };

    // console.log("boardlist : ", boardList);

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

exports.postLikePage = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const userId = req.params.userId;
    console.log("boardId와 userId : ", boardId, userId);
    // ===== 사용자 cookie 받아와서, user객체 정보 받아오기 =====
    let token;
    let axiosConfig = {};

    // req.cookies가 존재하고, token이 있다면 token 값을 설정
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
      // console.log("token : ", token);
      // token이 존재할 경우, headers에 Authorization을 추가
      axiosConfig.headers = {
        Authorization: `Bearer ${token.token}`,
      };
    }

    console.log("axiosConfig : ", axiosConfig);
    // axios 요청
    // const responseData = await axios.get(`${process.env.DB_API}/`, axiosConfig);
    // console.log("index response : ", response);
    // const { user } = responseData.data;
    // console.log("user : ", user);

    // console.log(user);
    // =========================================================
    // 요청 URL을 변수에 저장하고 확인
    const requestUrl = `${process.env.DB_API}/boards/board_id/${boardId}/user_id/${userId}`;
    console.log("요청 URL: ", requestUrl);

    // axios POST 요청
    const response = await axios.post(requestUrl, {}, axiosConfig);

    // 로그로 응답 확인
    console.log("응답: ", response.status, response.statusText);
    if (response.status === 201) {
      res.status(201).json({ message: response.statusText });
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.log("BoardController postLikePage Error : " + error.message);
    next(error);
  }
};
exports.deleteDislikePage = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const userId = req.params.userId;
    console.log("boardId와 userId : ", boardId, userId);
    // ===== 사용자 cookie 받아와서, user객체 정보 받아오기 =====
    let token;
    let axiosConfig = {};

    // req.cookies가 존재하고, token이 있다면 token 값을 설정
    if (req.cookies && req.cookies["token"]) {
      token = req.cookies["token"];
      // console.log("token : ", token);
      // token이 존재할 경우, headers에 Authorization을 추가
      axiosConfig.headers = {
        Authorization: `Bearer ${token.token}`,
      };
    }

    console.log("axiosConfig : ", axiosConfig);
    // axios 요청
    // const responseData = await axios.get(`${process.env.DB_API}/`, axiosConfig);
    // console.log("index response : ", response);
    // const { user } = responseData.data;
    // console.log("user : ", user);

    // console.log(user);
    // =========================================================
    // 요청 URL을 변수에 저장하고 확인
    const requestUrl = `${process.env.DB_API}/boards/board_id/${boardId}/user_id/${userId}`;
    console.log("요청 URL: ", requestUrl);

    // axios POST 요청
    const response = await axios.delete(requestUrl, axiosConfig);

    // 로그로 응답 확인
    console.log("응답: ", response.data);
    if (response.data.affected === 1) {
      res.status(201).json({ message: "dislike_successed" });
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.log("BoardController deleteDislikePage Error : " + error.message);
    next(error);
  }
};
