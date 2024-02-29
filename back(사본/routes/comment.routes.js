const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

// 해당게시물의 댓글조회
router.get("/post-comments/:postId", commentController.postsComments);
// 나의 모든 댓글조회
router.get("/my-comments", authMiddleware, commentController.myComments);
// 댓글생성
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
