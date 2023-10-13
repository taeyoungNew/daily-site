const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();
  signup = async (req, res) => {
    try {
      const {
        email,
        password,
        name,
        hobby,
        address,
        mbti,
        food,
        age,
        aboutMe,
      } = req.body;
      // 회원가입 확인검증

      // 이메일형식검증
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      // 패스워드 확인검증
      // 패스워드 형식검증
      console.log(
        email,
        password,
        name,
        hobby,
        address,
        mbti,
        food,
        age,
        aboutMe
      );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  modify = async () => {
    console.log("회원정보 수정");
  };

  withdrawal = async () => {
    console.log("회원탈퇴");
  };
}

module.exports = UserController;
