const BaseDTO = require("../dto");

class UserCreateRequestDTO extends BaseDTO {
    username;
    password;
    nickname;
    image;
    provider;

    constructor(body) {
        super();
        this.username = body.username;
        this.password = body.password;
        this.nickname = body.nickname;
        this.image = body.image;
        this.provider = body.provider || "local"; // 기본값으로 'local'을 할당합니다.

        // this.validate(this); // 생성된 객체를 검증합니다.
    }
}

class UserCreateResponseDTO extends BaseDTO {
    id;
    username;
    nickname;
    image;
    provider;
    created_at;
    updated_at;

    constructor(userModelInstance) {
        super();
        this.id = userModelInstance.id;
        this.username = userModelInstance.username;
        this.nickname = userModelInstance.nickname;
        this.image = userModelInstance.image;
        this.provider = userModelInstance.provider;
        this.created_at = this.toDate(userModelInstance.createdAt);
        this.updated_at = this.toDate(userModelInstance.updatedAt);

        this.validate(this); // 생성된 객체를 검증합니다.
    }
}

module.exports = {
    UserCreateRequestDTO,
    UserCreateResponseDTO,
};
