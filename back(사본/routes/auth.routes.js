const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

// 로그인
router.post("/login", authController.login);
// 로그아웃
router.delete("/logout", authController.logout);

module.exports = router;
