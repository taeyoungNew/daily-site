const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  // 모든회원정보 가져오기
  // 랜덤으로 10명씩 가져오자
  // 추후에 자신이 팔로우한 유저는 안불러올거임
  getRandomUsers = async (req, res) => {
    try {
      console.log("getRandomUsers");
      const getUsers = await this.userService.getRandomUsers();
      console.log("getUsers", getUsers);
      return res.status(200).json({ datas: getUsers });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

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
  // 회원정보가져오기
  findMyInfo = async (req, res) => {
    const { id } = res.locals.user;
    try {
      const userInfo = await this.userService.findMyInfo(id);
      return res.status(200).json({ data: userInfo });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // 회원정보 수정
  // 자기소개 수정
  modifyAboutMe = async (req, res) => {
    const { id } = res.locals.user;
    const { aboutMe } = req.body;
    // 자기소개 내용들은 공백이어도 상관이 없을 듯
    // 스페이스만 존재한다면 스페이스를 없애고 저장하자
    const payload = {
      id,
      aboutMe,
    };
    try {
      await this.userService.modifyAboutMe(payload);
      return res.status(201).send({ message: "자기소개가 수정되었습니다." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  // 취미 수정
  modifyHobby = async (req, res) => {
    const { id } = res.locals.user;
    const { hobby } = req.body;
    const payload = {
      id,
      hobby,
    };
    try {
      await this.userService.modifyHobby(payload);
      return res.status(201).send({ message: "취미가 완료되었습니다." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  // 좋아하는음식 수정
  modifyFood = async (req, res) => {
    const { id } = res.locals.user;
    const { food } = req.body;
    const payload = {
      id,
      food,
    };
    try {
      await this.userService.modifyFood(payload);
      return res
        .status(201)
        .send({ message: "좋아하는 음식이 수정되었습니다." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  // MBTI 수정
  modifyMbti = async (req, res) => {
    const { id } = res.locals.user;
    const { mbti } = req.body;
    const payload = {
      id,
      mbti,
    };
    try {
      await this.userService.modifyMbti(payload);
      return res.status(200).send({ message: "MBTI가 수정되었습니다." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  modify = async () => {
    console.log("회원정보 수정");
  };

  // 회원탈퇴
  withdrawal = async (req, res) => {
    const { id } = res.locals.user;
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
