const axios = require("axios");

exports.getBoardData = async (boardId, axiosConfig) => {
  try {
    console.log(boardId);
    console.log(process.env.DB_API);
    const response = await axios.get(
      `${process.env.DB_API}/boards/board_id/${boardId}`,
      axiosConfig
    );
    // console.log("response : ", response);

    const data = response.data.data;
    const loginUserInfo = response.data.user;
    // console.log("loginUserInfo : ", loginUserInfo);

    // category 값을 소문자로 변환
    const categoryLowercase = data.category.toLowerCase();
    const processedData = {
      title: data.title,
      profileImage: `${process.env.DB_API}${data.user.image}`,
      writer: data.user.nickname,
      createdAt: data.createdAt,
      likesCount: data.likesCount,
      viewsCount: data.viewsCount,
      commentsCount: data.commentsCount,
      content: data.content,
      category: categoryLowercase, // 소문자로 변환된 category 사용
      comments: data.comments,
      isGood: data.isGood,
      id: data.id,
      image: `${process.env.DB_API}${data.image}`,
      userData: {
        id: loginUserInfo.id,
        nickname: loginUserInfo.nickname,
        image: `${process.env.DB_API}${loginUserInfo.image}`,
      },
    };

    console.log("processedData : ", processedData);
    return processedData;
  } catch (error) {
    console.log("BoardService getBoardData Error : " + error.message);
    next(error);
  }
};
