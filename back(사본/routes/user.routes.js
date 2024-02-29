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

// 나의 정보 가져오기
router.get("/", authMiddleware, userController.findMyInfo);

// 회원정보수정
// 회원자기소개 수정
router.patch("/about-me", authMiddleware, userController.modifyAboutMe);
// 회원취미 수정
router.patch("/hobby", authMiddleware, userController.modifyHobby);
// 회원좋아하는 음식 수정
router.patch("/food", authMiddleware, userController.modifyFood);
// MBTI 수정
router.patch("/mbti", authMiddleware, userController.modifyMbti);

router.put("/", authMiddleware, userController.modify);

// 회원탈퇴
router.delete("/", authMiddleware, userController.withdrawal);

module.exports = router;
