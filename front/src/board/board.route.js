const express = require("express");
const router = express.Router();
const controller = require("./board.controller.js");

// console.log("board_route.js  test");

router.get("/", controller.getBoardPageData);
router.get(
  "/board_id/:boardId/user_id/:userId",
  controller.getBoardModifyPageData
);
router.get("/announcement", controller.getAnnouncementPageData);
router.get("/domestic", controller.getDomesticPageData);
router.get("/foreign", controller.getForeignPageData);
router.get("/bitcoin", controller.getBitcoinPageData);

module.exports = router;
