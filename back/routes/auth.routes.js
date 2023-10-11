const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

// 로그인
router.post("/", authController.login);
// 로그아웃
router.delete("/logout", authMiddleware, authController.logout);

module.exports = router;
