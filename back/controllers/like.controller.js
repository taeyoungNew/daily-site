const LikeService = require("../services/like.service");
const PostService = require("../services/post.service");
const CommentService = require("../services/comment.service");
class LikeController {
  likeService = new LikeService();
  postService = new PostService();
  commentService = new CommentService();
  // 자신이 좋아요한 게시물 불러오기
  // 자신이 좋아요한 댓글 불러오기

  // 게시물좋아요
  postLike = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals.user;
      const payload = {
        userId: id,
        postId,
      };
      const getPost = await this.postService.getPostInfo(postId);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }

      const isExPostLike = await this.likeService.checkPostLike(payload);
      if (isExPostLike) {
        return res
          .status(412)
          .send({ message: "이미 좋아요를 누른 게시물입니다." });
      }
      await this.likeService.postLike(payload);
      return res.status(201).send({ message: "게시물에 좋아요를 눌렀습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 게시물 좋아요 취소
  postUnLike = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals.user;
      const payload = {
        userId: id,
        postId,
      };
      const getPost = await this.postService.getPostInfo(postId);
      if (!getPost) {
        return res
          .status(412)
          .send({ message: "해당 게실물을 찾을 수 없습니다." });
      }
      const isExPostLike = await this.likeService.checkPostLike(payload);
      if (!isExPostLike) {
        return res
          .status(412)
          .send({ message: "좋아요를 누른 게시물이 아닙니다." });
      }
      await this.likeService.postUnLike(payload);
      return res
        .status(201)
        .send({ message: "게시물에 좋아요를 취소했습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 댓글 좋아요
  commentLike = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { id } = res.locals.user;
      const getComment = await this.commentService.getComment(commentId);
      if (!getComment) {
        return res
          .status(412)
          .send({ message: "해당 댓글을 찾을 수 없습니다." });
      }
      const payload = {
        commentId,
        userId: id,
      };
      await this.likeService.commentLike(payload);
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
  // 댓글 좋아요 취소
  commentUnLike = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { id } = res.locals.user;
      const getComment = await this.commentService.getComment(commentId);
      if (!getComment) {
        return res
          .status(412)
          .send({ message: "해당 댓글을 찾을 수 없습니다." });
      }
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}

module.exports = LikeController;
