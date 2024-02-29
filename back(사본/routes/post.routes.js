const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const PostController = require("../controllers/post.controller");
const postController = new PostController();

// 로그인상태 및 자신의 게시물만 수정 삭제가능
// 게시물 내용 수정
router.put("/:postId", authMiddleware, postController.postModify);

// 전체게시물 보기
router.get("/", postController.getAllPosts);

// 자신의 게시물 보기
router.get("/my-posts", authMiddleware, postController.getMyPosts);

// 게시물 등록
router.post("/", authMiddleware, postController.postCreate);

// 게시물 삭제
router.delete("/:postId", authMiddleware, postController.deletePost);

module.exports = router;
