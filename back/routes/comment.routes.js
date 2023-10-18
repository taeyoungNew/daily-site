const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

// 해당게시물의 댓글조회
router.get("/:postId", commentController.postsComments);
// 나의 모든 댓글조회
router.get("/myComments", authMiddleware, commentController.myComments);
// 로그인한 유저만 생성가능
router.post("/:postId", authMiddleware, commentController.commentCreate);
// 댓글수정
router.put(
  "/:postId/:commentId",
  authMiddleware,
  commentController.commentModify
);
// 댓글삭제
// 내 댓글만 삭제가능
router.delete(
  "/:postId/:commentId",
  authMiddleware,
  commentController.commentDelete
);

module.exports = router;
