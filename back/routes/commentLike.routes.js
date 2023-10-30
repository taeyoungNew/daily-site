const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const CommentLikeController = require("../controllers/commentLike.controller");
const commentLikeController = new CommentLikeController();

// 댓글 좋아요 누르기
router.post("/:commentId", authMiddleware, commentLikeController.commentLike);

// 댓글 좋아요 취소하기
router.delete(
  "/:commentId",
  authMiddleware,
  commentLikeController.commentUnLike
);

module.exports = router;
