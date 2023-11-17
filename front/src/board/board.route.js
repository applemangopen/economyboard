const express = require("express");
const router = express.Router();
const controller = require("./board.controller.js");

// console.log("board_route.js  test");

router.get("/", controller.getWritePageData);
router.get("/board_id/:boardId/user_id/:userId", controller.getModifyPageData);
router.get("/board_id/:boardId", controller.getBoardPageData);
router.get("/:category/:page", controller.getCategoryPageData);
router.get("/board_id/:boardId/user_id/:userId", controller.getModifyPageData);

router.post("/board_id/:boardId/user_id/:userId", controller.postLikePage);
router.delete(
  "/board_id/:boardId/user_id/:userId",
  controller.deleteDislikePage
);

router.delete("/board_id/:boardId", controller.deleteBoardPage);

module.exports = router;
