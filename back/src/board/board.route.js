const express = require("express");
const boardController = require("./board.controller");
const authenticateJwt = require("../../lib/authenticateJwt");
const multer = require("multer");
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, "./uploads/boards");
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
            done(null, filename);
        },
    }),
});

const router = express.Router();

// 카테고리 별 게시판 조회
router.get("/announcement", boardController.getBoardsByCategory.bind(null, "announcement"));
router.get("/domestic", boardController.getBoardsByCategory.bind(null, "domestic"));
router.get("/foreign", boardController.getBoardsByCategory.bind(null, "foreign"));
router.get("/bitcoin", boardController.getBoardsByCategory.bind(null, "bitcoin"));

// 개별 게시판 조회
router.get("/:boardId", boardController.getBoardById);

// 게시판 생성 - 로그인 필요
router.post("/", authenticateJwt, upload.single("image"), boardController.createBoard);

// 게시판 업데이트 - 로그인 및 권한 필요
router.put("/:boardId", authenticateJwt, upload.single("image"), boardController.updateBoard);

// 게시판 삭제 - 로그인 및 권한 필요
router.delete("/:boardId", authenticateJwt, boardController.deleteBoard);

module.exports = router;
