const UserService = require("./user.service");
const userService = new UserService();
const { generateToken } = require("../../lib/jwt");

exports.signup = async (req, res) => {
    try {
        const { username, password, nickname } = req.body;
        const imagePath = req.file ? req.file.path : null;
        console.log(req.body);

        // UserService의 createUser 메소드를 사용하여 사용자를 생성합니다.
        const user = await userService.createUser({
            username,
            password,
            nickname,
            image: imagePath,
        });

        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const { token } = await userService.loginUser({ username, password });

        res.json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.loginWithKakao = async (req, res) => {
    try {
        const kakaoProfile = req.user;

        // kakaoProfile 객체의 properties 필드가 존재하는지 확인
        const properties = kakaoProfile._json && kakaoProfile._json.properties;

        // username, nickname, image 정보 추출
        const username = `kakao_${kakaoProfile.id}`;
        const nickname = properties ? properties.nickname : `User${kakaoProfile.id}`;
        const image = properties ? properties.profile_image : null;

        const user = await userService.findOrCreateUser({
            username,
            nickname,
            image,
            provider: "kakao",
        });

        const token = generateToken(user);

        res.redirect(`http://localhost:3000?token=${token}`);
    } catch (e) {
        console.error(e); // 오류 로그 출력
        res.status(400).json({ error: e.message });
    }
};

exports.loginWithGoogle = async (req, res) => {
    try {
        const googleProfile = req.user;

        // Google 프로필에서 필요한 정보 추출
        const username = `google_${googleProfile.id}`;
        const nickname = googleProfile.displayName || `User${googleProfile.id}`;
        const image = googleProfile.photos[0].value || null; // Google 프로필 이미지 URL

        // UserService를 통해 Google 사용자 찾기 또는 생성
        const user = await userService.findOrCreateUser({
            username,
            nickname,
            image,
            provider: "google",
        });

        // JWT 토큰 생성
        const token = generateToken(user);
        console.log("Generated JWT Token:", token);

        // 프론트엔드 메인 페이지로 리디렉션 (토큰 포함)
        res.redirect(`http://localhost:3000?token=${token}`);
    } catch (e) {
        console.error("Google Login Error:", e);
        res.status(500).json({ error: e.message });
    }
};

exports.updateUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body; // 예: { nickname: "새로운 닉네임", password: "새로운 비밀번호" }

        const updatedUser = await userService.updateUser(userId, updateData);

        const newToken = generateToken({
            id: updatedUser.id,
            nickname: updatedUser.nickname,
            image: updatedUser.image,
        });

        res.json({ message: "사용자 정보가 업데이트 되었습니다.", user: updatedUser, token: newToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        await userService.deleteUser(userId);
        res.json({ message: "사용자 계정이 삭제되었습니다" });
    } catch (error) {
        console.error(error);
        res.status(550).json({ error: error.message });
    }
};
