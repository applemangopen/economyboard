const bcrypt = require("bcryptjs");
const { User } = require("./user.model");
const { generateToken } = require("../../lib/jwt");
const { UserCreateRequestDTO, UserCreateResponseDTO } = require("./user.dto");

class UserService {
    constructor() {}
    async createUser(userData) {
        try {
            console.log("service:", userData);

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

    async findOrCreateUser(socialData) {
        try {
            const { username, nickname, image, provider } = socialData;

            const userDTO = new UserCreateRequestDTO({
                username,
                nickname,
                image,
                provider,
            });

            let user = await User.findOne({ where: { username: userDTO.username } });

            if (!user) {
                const newUser = {
                    username: userDTO.username,
                    nickname: userDTO.nickname,
                    image: userDTO.image,
                    provider: userDTO.provider,
                };
                if (provider !== "kakao" && provider !== "google") {
                    newUser.password = await bcrypt.hash(userDTO.password, 8);
                } else {
                    newUser.password = null;
                }
                user = await User.create(newUser);
            }

            return new UserCreateResponseDTO(user);
        } catch (e) {
            throw e;
        }
    }

    async updateUser(userId, updateData) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error("사용자를 찾을 수 없습니다.");
            }

            // 업데이트할 데이터 처리
            Object.entries(updateData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    user[key] = value;
                }
            });

            // 비밀번호 변경 시, 비밀번호 해시화
            if (updateData.password) {
                user.password = await bcrypt.hash(updateData.password, 8);
            }

            await user.save();

            return user; // 업데이트된 사용자 정보 반환
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
