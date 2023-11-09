const bcrypt = require("bcryptjs");
const { User } = require("./user.model");
const { generateToken } = require("../../lib/jwt");
const { UserCreateRequestDTO, UserCreateResponseDTO } = require("./user.dto");

class UserService {
    constructor() {}
    async createUser(userData) {
        try {
            console.log("service:", userData);
            // 비밀번호 해시화 (일단은 생략 해놓음 추후에 해시화 할꺼얌)
            const userDTO = new UserCreateRequestDTO(userData);

            const hashedPassword = await bcrypt.hash(userDTO.password, 8);

            const user = await User.create({
                username: userDTO.username,
                password: hashedPassword,
                nickname: userDTO.nickname,
                image: userDTO.image,
                provider: userDTO.provider,
            });

            const userResponseDTO = new UserCreateResponseDTO(user);

            return userResponseDTO;
        } catch (error) {
            throw error;
        }
    }
    async loginUser(loginData) {
        try {
            const { username, password } = loginData;

            const user = await User.findOne({
                where: { username },
            });

            if (!user) {
                throw new Error("등록되지 않은 사용자입니다");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error("비밀번호가 틀렸습니다");
            }

            const token = generateToken({ id: user.id });

            return { token };
        } catch (e) {
            throw e.message;
        }
    }
}

module.exports = UserService;
