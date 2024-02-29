const jwt = require("jsonwebtoken");

const UserService = require("../services/user.service");
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
        return res.status(412).send("존재하지 않는 아이디입니다.");
      }

      // 패스워드 일치유무
      if (password !== user.password) {
        return res.status(412).send("패스워드가 일치하지않습니다.");
      }
      const userInfo = await this.userService.findMyInfo(user.id);
      // accessToken refreshToken 생성
      const accToken = await this.accessToken(user.id, user.email);
      const refToken = await this.refreshToken(user.id);
      // 클라이언트에게 hashAccToken, hashRefToken보내기
      res.cookie("authorization", `Bearer ${accToken}`);
      res.cookie("refToken", `${refToken}`);
      return res
        .status(200)
        .json({ message: "로그인되었습니다.", data: userInfo });
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

  // 로그아웃
  logout = (req, res) => {
    try {
      const cookies = req.cookies;
      // authorization가 없으면
      if (!cookies.authorization) {
        return res.status(401).send({ errorMessage: "로그인상태가 아닙니다." });
      }

      // 쿠키에 있는 유저의 모든 정보 삭제
      for (let prop in cookies) {
        res.clearCookie(prop);
      }
      return res.status(200).send({ message: "로그아웃되었습니다." });
    } catch (error) {
      return res.status(400).send({ message: "로그인상태가 아닙니다." });
    }
  };
}

module.exports = AuthController;
