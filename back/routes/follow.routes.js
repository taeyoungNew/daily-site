const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const FollowController = require("../controllers/follow.controller");
const followController = new FollowController();

// 팔로우하기
// 로그인한 상태에서만 가능
router.post("/follow/:userId", authMiddleware, followController.userFollow);

// 팔로우 취소하기
// 로그인한 상태에서만 가능
router.delete(
  "/un-follow/:userId",
  authMiddleware,
  followController.userUnFollow
);

module.exports = router;
