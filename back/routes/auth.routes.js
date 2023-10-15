const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

// 로그인
router.post("/login", authController.login);
// ref token확인 및 재발급
router.post("/refresh-token", authController.checkRefToken);
// 로그아웃
router.delete("/logout", authController.logout);

module.exports = router;
