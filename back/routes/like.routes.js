const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const LikeController = require("../controllers/like.controller");
const likeController = new LikeController();

// 게시물 좋아요 누르기
router.post("/like-post/:postId", authMiddleware, likeController.postLike);

// 게시물 좋아요취소하기
router.delete(
  "/unlike-post/:postId",
  authMiddleware,
  likeController.postUnLike
);

// 댓글 좋아요 누르기
router.post(
  "/like-comment/:commentId",
  authMiddleware,
  likeController.commentLike
);

// 댓글 좋아요 취소하기
router.delete(
  "/like-comment/:commentId",
  authMiddleware,
  likeController.commentUnLike
);

module.exports = router;
