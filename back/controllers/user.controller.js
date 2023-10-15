const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  // 회원가입
  signup = async (req, res) => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{8,25}$/;
    try {
      const {
        email,
        password,
        passwordConfirm,
        profileImg,
        name,
        hobby,
        address,
        mbti,
        food,
        age,
        aboutMe,
      } = req.body;
      // 회원가입 확인검증
      const isUser = await this.userService.findUser(email);
      console.log(isUser);
      if (isUser) {
        return res.status(401).send({ message: "이미 존재하는 회원입니다." });
      }
      // 이메일형식검증
      if (!emailRegex.test(email)) {
        return res.status(401).send({ message: "이메일형식에 맞지않습니다." });
      }

      // 패스워드 확인검증
      if (password !== passwordConfirm) {
        return res
          .status(401)
          .send({ message: "비밀번호확인이 일치하지 않습니다." });
      }

      // 패스워드 형식검증
      if (!passwordRegex.test(password)) {
        return res
          .status(412)
          .send({ message: "패스워드형식에 맞지않습니다." });
      }
      const payload = {
        email,
        password,
        profileImg,
        name,
        hobby,
        address,
        mbti,
        food,
        age,
        aboutMe,
      };
      // 회원가입하기
      await this.userService.signup(payload);
      return res.status(201).send({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  modify = async () => {
    console.log("회원정보 수정");
  };

  // 회원탈퇴
  withdrawal = async (req, res) => {
    const id = res.locals.user;
    const { email } = res.body;
    // 있는 회원인지 조회
    const isUser = this.findUser(email);
    if (!isUser) {
      return res
        .status(401)
        .send({ message: "이미 존재하지 않는 회원입니다." });
    }
    await this.userService.withdrawal(id);
  };

  findUser = async (email) => {
    const result = await this.userService.findUser(email);
    return result;
  };
}

module.exports = UserController;
