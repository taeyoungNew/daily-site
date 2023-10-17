const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const UserService = require("../services/user.service");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const userService = new UserService();
  const { authorization, refToken } = req.cookies;
  if (!authorization) {
    return res.status(401).send({ message: "로그인 후에 이용가능합니다." });
  }
  const [tokenType, token] = authorization.split(" ");
  if (tokenType !== "Bearer" || !token) {
    return res.status(401).json({ message: "로그인 후에 이용가능합니다." });
  }

  // decoded token이 만료에러를 뜰때 DB에 저장되어 있는 Refresh토큰이 유효한지 확인한다.
  const decodeResult = verifyAccToken(token);
  try {
    if (decodeResult === "jwt exired") {
      console.log("acc토큰 만료");
      // accToken이 만료되면
      // cookie에 있는 refresh토큰을 만료되었는지 확인
      const decodeRefToken = verifyRefToken(refToken);
      // refresh토큰이 만료되면
      if (decodeRefToken === "jwt exired") {
        // 로그인이 필요하다는 에러메세지 던지기
        return res.status(401).send({ message: "로그인 후에 이용가능합니다." });
      } else {
        // 만료가 되지 않았다면 access토큰 재발급하기
        // 회원정보가져오기
        const user = await userService.findUserInfo(decodeRefToken.userId);
        // acctoken 재발급
        const accToken = await accessToken(user.id, user.email);
        res.cookie("authorization", `Bearer ${accToken}`);
        res.locals.user = user;
        next();
      }
    } else {
      console.log("acc토큰 유효");
      // accToken이 만료되지 않았다면
      const id = decodeResult.userId;
      const user = await userService.findUserInfo(id);

      if (!user) {
        return res
          .status(401)
          .json({ message: "해당 유저가 존재하지 않습니다." });
      }
      res.locals.user = user;
      next();
    }
  } catch (error) {
    return res.status(401).send({
      message: error,
    });
  }
};

// 토큰해석
function verifyAccToken(accToken) {
  const decodeAccToken = jwt.verify(
    accToken,
    process.env.ACCESS_TOKEN_KEY,
    (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            return "jwt exired";
        }
      }
      return decoded;
    }
  );
  return decodeAccToken;
}
function verifyRefToken(refToken) {
  const decodeAccToken = jwt.verify(
    refToken,
    process.env.REFRESH_TOKEN_KEY,
    (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            return "jwt exired";
        }
      }
      return decoded;
    }
  );
  return decodeAccToken;
}

// access token 생성성
async function accessToken(userId, email) {
  const accToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_EXPIRATION_TIME,
  });
  return accToken;
}
