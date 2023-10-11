const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserController = require("../controllers/users.controller");
const userController = new UserController();

// 회원가입
router.post("/", userController.signup);

// 회원정보수정

// 회원탈퇴

module.exports = router;
