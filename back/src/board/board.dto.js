const BaseDTO = require("../dto");

class BoardCreateRequestDTO extends BaseDTO {
    user_id;
    title;
    content;
    image;
    category;

    constructor(body) {
        super();
        this.user_id = body.user_id;
        this.title = body.title;
        this.content = body.content;
        this.image = body.image;
        this.category = body.category;

        // this.validate(this); // 생성된 객체를 검증합니다.
    }
}

class BoardCreateResponseDTO extends BaseDTO {
    board_id;
    user_id;
    title;
    content;
    image;
    category;
    created_at;

    constructor(boardModelInstance) {
        super();
        this.board_id = boardModelInstance.board_id;
        this.user_id = boardModelInstance.user_id;
        this.title = boardModelInstance.title;
        this.content = boardModelInstance.content;
        this.image = boardModelInstance.image;
        this.category = boardModelInstance.category;
        this.created_at = this.toDate(boardModelInstance.createdAt);

        this.validate(this); // 생성된 객체를 검증합니다.
    }
}

module.exports = {
    BoardCreateRequestDTO,
    BoardCreateResponseDTO,
};
