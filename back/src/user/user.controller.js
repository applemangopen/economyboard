const UserService = require("./user.service");

const userService = new UserService();

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
