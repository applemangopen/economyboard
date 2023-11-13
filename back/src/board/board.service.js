const { Board } = require("./board.model");
const { BoardCreateRequestDTO, BoardCreateResponseDTO } = require("./board.dto");

class BoardService {
    async createBoard(boardData) {
        try {
            const boardDTO = new BoardCreateRequestDTO(boardData);

            const newBoard = await Board.create(boardDTO);
            return new BoardCreateResponseDTO(newBoard);
        } catch (error) {
            throw error;
        }
    }

    // 게시글 조회 (특정 카테고리에 대한 게시글 목록)
    async getBoardsByCategory(category) {
        try {
            const boards = await Board.findAll({
                where: { category },
            });

            // 각 게시글을 DTO로 변환
            return boards.map((board) => new BoardCreateResponseDTO(board));
        } catch (error) {
            throw error;
        }
    }

    // // 게시글 상세 조회
    // async getBoardById(boardId) {
    //     try {
    //         const board = await Board.findByPk(boardId);
    //         return board ? new BoardCreateResponseDTO(board) : null;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // 게시글 상세 조회 및 조회수 증가
    async getBoardById(boardId) {
        try {
            const board = await Board.findByPk(boardId);
            if (!board) return null;

            // 조회수 증가
            board.hit += 1;
            await board.save();

            return new BoardCreateResponseDTO(board);
        } catch (error) {
            throw error;
        }
    }

    // 게시글 업데이트
    async updateBoard(boardId, updateData) {
        try {
            const board = await Board.findByPk(boardId);
            if (!board) {
                throw new Error("게시글을 찾을 수 없습니다.");
            }

            // DTO를 사용하여 업데이트 데이터의 유효성 검사
            const updateDTO = new BoardCreateRequestDTO(updateData);

            Object.assign(board, updateDTO);
            await board.save();
            return new BoardCreateResponseDTO(board);
        } catch (error) {
            throw error;
        }
    }

    // 게시글 삭제
    async deleteBoard(boardId) {
        try {
            const board = await Board.findByPk(boardId);
            if (!board) {
                throw new Error("게시글을 찾을 수 없습니다.");
            }

            await board.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BoardService;
