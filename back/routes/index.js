const express = require("express");
const router = express.Router();

const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const likeRouter = require("./like.routes");
const commentRouter = require("./comment.routes");
const followRouter = require("./follow.routes");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/like", likeRouter);
router.use("/comment", commentRouter);
router.use("/follow", followRouter);

module.exports = router;
