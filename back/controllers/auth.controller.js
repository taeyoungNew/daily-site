const UserService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthController {
  userService = new UserService();
  // 로그인
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // 회원정보가져오기
      const user = await this.userService.findUser(email);
      if (!user) {
        return res.status(412).send({ message: "존재하지 않는 아이디입니다." });
      }

      // 패스워드 일치유무
      if (password !== user.password) {
        return res
          .status(412)
          .send({ message: "패스워드가 일치하지않습니다." });
      }
      // accessToken refreshToken 생성
      const accToken = await this.accessToken(user.id, user.email);
      const refToken = await this.refreshToken(user.id);

      // accessToken hash화
      const hashAccToekn = await this.hashAccessToken(accToken);
      // refreshToken 저장 및 hash화
      const hashRefToken = await this.refreshTokenSave(refToken, user.id);

      // 클라이언트에게 hashAccToken, hashRefToken보내기
      res.cookie("authorization", `Bearer ${hashAccToekn}`);
      res.cookie("refToken", `${hashRefToken}`);
      return res.status(200).send({ message: "로그인되었습니다." });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };

  // access token 생성성
  accessToken = async (userId, email) => {
    const accToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_EXPIRATION_TIME,
    });
    return accToken;
  };

  // refresh token 생성
  refreshToken = async (userId) => {
    const refToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: process.env.REFRESH_EXPIRATION_TIME,
    });
    return refToken;
  };

  // refresh token 저장
  refreshTokenSave = async (refreshToken, userId) => {
    const hashRefToken = await this.hashRefreshToken(refreshToken);
    const hashRefTokenExp = await this.hashRefreshTokenExp();
    const payload = {
      hashRefToken,
      hashRefTokenExp,
      userId,
    };
    await this.userService.saveRefToken(payload);
    return hashRefToken;
  };

  // access token hash화
  hashAccessToken = (accessToken) => {
    const saltOrRound = parseInt(process.env.SALT_ROUND);
    const hashAccToken = bcrypt.hash(accessToken, saltOrRound);
    return hashAccToken;
  };

  // refresh token hash화
  hashRefreshToken = (refreshToken) => {
    // 토큰값을 그대로 저장하지 않고 암호화를 거쳐 데이터베이스에 저장
    const saltOrRound = parseInt(process.env.SALT_ROUND);
    const hashRefToken = bcrypt.hash(refreshToken, saltOrRound);
    return hashRefToken;
  };

  // refresh token 기간 hash화
  hashRefreshTokenExp = async () => {
    // refresh token기간을 date형식으로 저장
    const crrDate = new Date();
    const crrRefTokenExp = new Date(
      crrDate.getTime() + parseInt(process.env.REFRESH_EXPIRATION_TIME)
    );
    return crrRefTokenExp;
  };

  // access token이 만료되었을 때 refresh확인 후 ref가 살아있으면 access token재발급
  checkRefToken = async (req, res) => {
    console.log(req.cookies);
    const { refToken } = req.cookies;
    const newAccToken = await this.authService.checkRefToken(refToken);
  };

  // decode accToken
  decodeAccToken = async () => {
    // const decodeAcc = this.jwt.
  };

  // decode refToken
  decodeRfeToken = async (refreshToken) => {
    return this.jwt.verfy(refreshToken, process.env.REFRESH_TOKEN_KEY);
  };

  // 로그아웃
  logout = () => {};
}

module.exports = AuthController;
