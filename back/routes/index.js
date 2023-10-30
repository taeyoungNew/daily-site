const express = require("express");
const router = express.Router();

const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const postRouter = require("./post.routes");
const postLikeRouter = require("./postLike.routes");
const commentRouter = require("./comment.routes");
const commentLikeRouter = require("./commentLike.routes");
const followRouter = require("./follow.routes");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/postLike", postLikeRouter);
router.use("/post", postRouter);
router.use("/commentLike", commentLikeRouter);
router.use("/comment", commentRouter);
router.use("/follow", followRouter);

module.exports = router;
