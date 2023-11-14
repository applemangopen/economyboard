const axios = require("axios");

exports.fetchIndexContentData = async (req, res) => {
  try {
    const response = await axios.get("http://15.164.233.146:4000/");
    const { data } = response.data;

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
    };

    return processedData;
  } catch (error) {
    console.log("IndexService fetchIndexContentData Error : " + error.message);
    throw new Error(
      "IndexService fetchIndexContentData Error : " + error.message
    );
  }
};
