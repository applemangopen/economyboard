const express = require("express");
const router = express.Router();
const controller = require("./board.controller.js");

// console.log("board_route.js  test");

router.get("/", controller.getWritePageData);
router.get("/board_id/:boardId/user_id/:userId", controller.getModifyPageData);
router.get("/board_id/:boardid", controller.getBoardPageData);
router.get("/:category/:page", controller.getCategoryPageData);
router.get(
  "/board_id/:boardId/user_id/:userId",
  controller.getBoardModifyPageData
);
router.delete("/board_id/:boardId", controller.deleteBoardPage);

module.exports = router;
