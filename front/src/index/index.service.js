const axios = require("axios");

exports.fetchIndexContentData = async (req, res) => {
  try {
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
    const response = await axios.get(
      "http://15.164.233.146:4000/",
      axiosConfig
    );
    // console.log("index response : ", response);
    const { data } = response.data;
    const { user } = response.data;
    // ===== response된 data를 처리 =====
    const mainPhotos = data.mainPhotos.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      image: `http://43.201.38.233:4000${item.image}`,
    }));
    const announcementsLatest = data.announcementLatests.map((item) => ({
      id: item.id,
      title: item.title,
    }));
    const domesticBoardLikes = data.domesticBoardLikes.map((item) => ({
      id: item.id,
      title: item.title,
      likesCount: item.likesCount,
      commentsCount: item.commentsCount,
    }));
    const foreignBoardLikes = data.foreignBoardLikes.map((item) => ({
      id: item.id,
      title: item.title,
      likesCount: item.likesCount,
      commentsCount: item.commentsCount,
    }));
    const bitcoinBoardLikes = data.bitcoinBoardLikes.map((item) => ({
      id: item.id,
      title: item.title,
      likesCount: item.likesCount,
      commentsCount: item.commentsCount,
    }));
    const boardLikes = data.boardLikes.map((item) => ({
      id: item.id,
      title: item.title,
      likesCount: item.likesCount,
      commentsCount: item.commentsCount,
    }));

    const boardComments = data.boardComments.map((item) => ({
      id: item.id,
      title: item.title,
      likesCount: item.likesCount,
      commentsCount: item.commentsCount,
    }));
    const newPhotos = data.newPhotos.map((item) => ({
      id: item.id,
      title: item.title,
      image: `http://43.201.38.233:4000${item.image}`,
      likesCount: item.likesCount,
      commentsCount: item.commentsCount,
    }));
    let userData = {};
    if (user) {
      // user 데이터가 존재하는 경우에만 실행
      userData = {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        image: `http://15.164.233.146:4000${user.image}`,
        role: user.role,
        createdAt: user.createdAt,
      };
    }
    // console.log("userData : ", userData);

    // ===== 처리된 데이터 =====
    const processedData = {
      mainPhotos: mainPhotos,
      announcementsLatest: announcementsLatest,
      domesticBoardLikes: domesticBoardLikes,
      foreignBoardLikes: foreignBoardLikes,
      bitcoinBoardLikes: bitcoinBoardLikes,
      boardLikes: boardLikes,
      boardComments: boardComments,
      newPhotos: newPhotos,
      userData: userData,
    };
    console.log("processedData : ", processedData);

    return processedData;
  } catch (error) {
    console.log("IndexService fetchIndexContentData Error : " + error.message);
    throw new Error(
      "IndexService fetchIndexContentData Error : " + error.message
    );
  }
};
