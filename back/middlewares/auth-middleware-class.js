const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const UserService = require("../services/user.service");
require("dotenv").config();

class AuthMiddleware {
  userService = new UserService();
  authToken = async (req, res) => {
    const { authorization } = req.cookies;
    if (!authorization) {
      return res.status(401).send({ message: "로그인 후에 이용가능합니다." });
    }
    const [tokenType, token] = authorization.split(" ");
    if (tokenType !== "Bearer" || !token) {
      return res.status(401).json({ message: "로그인 후에 이용가능합니다." });
    }

    // decoded token이 만료에러를 뜰때 DB에 저장되어 있는 Refresh토큰이 유효한지 확인한다.
    const decodeResult = this.verifyAccToken(token);

    try {
      if (decodeResult === "jwt exired") {
        // accToken이 만료되면
        // DB에 저장되있던 refresh토큰을 꺼내어 만료되었는지 확인
        const getRefToken = await Users.findOne({
          attributes: ["id", "crrRefToken"],
          where: { id },
        });
        const id = getRefToken.id;
        const crrRefToken = getRefToken.crrRefToken;
        const decodeRefToken = this.verifyRefToken(crrRefToken);
        // refresh토큰이 만료되면
        if (decodeRefToken === "jwt exired") {
          // 로그인이 필요하다는 에러메세지 던지기
          return res
            .status(401)
            .send({ message: "로그인 후에 이용가능합니다." });
        } else {
          // 만료가 되지 않았다면 access토큰 재발급하기
          // 회원정보가져오기
          const user = await this.userService.findUser(email);
          // acctoken 재발급
          const accToken = await this.accessToken(user.id, user.email);
          res.cookie("authorization", `Bearer ${accToken}`);
          res.locals.user = user;
          next();
        }
      } else {
        // accToken이 만료되지 않았다면
        const email = decodeResult.email;
        const user = await this.userService.findUser(email);

        if (!user) {
          return res
            .status(401)
            .json({ message: "해당 유저가 존재하지 않습니다." });
        }
        res.locals.user = user;
        next();
      }
    } catch (error) {
      // console.log(error)
      return res.status(401).send({
        message: error,
      });
    }
  };

  // 토큰해석
  verifyAccToken = (accToken) => {
    const decodeAccToken = jwt.verify(accToken, process.env.ACCESS_TOKEN_KEY);
    return decodeAccToken;
  };
  verifyRefToken = (refToken) => {
    const decodeAccToken = jwt.verify(accToken, process.env.REFRESH_TOKEN_KEY);
    return decodeAccToken;
  };

  // access token 생성성
  accessToken = async (userId, email) => {
    const accToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_EXPIRATION_TIME,
    });
    return accToken;
  };
}

module.exports = AuthMiddleware;
