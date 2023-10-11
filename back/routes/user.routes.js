const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const authMiddleware = require("../middlewares/auth-middleware");
const UserController = require("../controllers/user.controller");
const userController = new UserController();

// 회원가입
router.post("/", userController.signup);

// 회원정보수정
router.put("/user-modify", authMiddleware, userController.modify);

// 회원탈퇴
router.delete("/user-withdrawal", authMiddleware, userController.withdrawal);

module.exports = router;
