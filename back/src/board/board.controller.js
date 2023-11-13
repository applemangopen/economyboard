const BoardService = require("./board.service");
const boardService = new BoardService();

const BoardController = {
    async createBoard(req, res) {
        try {
            const userId = req.user.id;
            const boardData = {
                ...req.body,
                user_id: userId,
                image: req.file ? req.file.path : null,
            };
            const newBoard = await boardService.createBoard(boardData);
            res.status(201).json(newBoard);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getBoardsByCategory(req, res) {
        try {
            const category = req.params.category;
            const boards = await boardService.getBoardsByCategory(category);
            res.json(boards);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getBoardById(req, res) {
        try {
            const boardId = req.params.boardId;
            const board = await boardService.getBoardById(boardId);
            if (!board) {
                return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
            }
            res.json(board);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateBoard(req, res) {
        try {
            const boardId = req.params.boardId;
            const userId = req.user.id; // JWT 토큰에서 추출한 사용자 ID

            const board = await boardService.getBoardById(boardId);
            if (!board) {
                return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
            }

            if (board.user_id !== userId) {
                return res.status(403).json({ message: "수정 권한이 없습니다." });
            }

            const updateData = {
                ...req.body,
                image: req.file ? req.file.path : null,
            };
            const updatedBoard = await boardService.updateBoard(boardId, updateData);
            res.json(updatedBoard);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteBoard(req, res) {
        try {
            const boardId = req.params.boardId;
            const userId = req.user.id; // JWT 토큰에서 추출한 사용자 ID

            const board = await boardService.getBoardById(boardId);
            if (!board) {
                return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
            }

            if (board.user_id !== userId) {
                return res.status(403).json({ message: "삭제 권한이 없습니다." });
            }

            await boardService.deleteBoard(boardId);
            res.json({ message: "게시글이 삭제되었습니다." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = BoardController;
