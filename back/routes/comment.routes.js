const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

// 댓글생성
// 로그인한 유저만 생성가능
router.post("/:commentId", authMiddleware, commentController.commentCreate);

// 댓글수정
// 내 댓글만 수정가능
router.put("/:commentId", authMiddleware, commentController.commentModify);

// 댓글삭제
// 내 댓글만 삭제가능
router.delete("/:commentId", authMiddleware, commentController.commentDelete);

module.exports = router;
