const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const PostLikeController = require("../controllers/postLike.controller");
const postLikeController = new PostLikeController();

// 게시물 좋아요 누르기
router.post("/:postId", authMiddleware, postLikeController.postLike);

// 게시물 좋아요취소하기
router.delete("/:postId", authMiddleware, postLikeController.postUnLike);

// // 댓글 좋아요 누르기
// router.post(
//   "/like-comment/:commentId",
//   authMiddleware,
//   likeController.commentLike
// );

// // 댓글 좋아요 취소하기
// router.delete(
//   "/like-comment/:commentId",
//   authMiddleware,
//   likeController.commentUnLike
// );

module.exports = router;
