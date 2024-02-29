const CommentLikeService = require("../services/commentLike.service");
const CommentService = require("../services/comment.service");
class CommentLikeController {
  commentLikeService = new CommentLikeService();
  commentService = new CommentService();
  // // 댓글 좋아요
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
      const isExCommentLike = await this.commentLikeService.checkCommentLike(
        payload
      );
      if (isExCommentLike) {
        return res
          .status(412)
          .send({ message: "이미 좋아요를 누른 댓글입니다." });
      }
      await this.commentLikeService.commentLike(payload);
      return res
        .status(201)
        .send({ message: "해당 댓글에 좋아요를 눌렀습니다." });
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
      const payload = {
        commentId,
        userId: id,
      };
      const isExCommentLike = await this.commentLikeService.checkCommentLike(
        payload
      );
      if (!isExCommentLike) {
        return res.status(412).send({ message: "좋아요를 누른 댓글아닙니다." });
      }
      await this.commentLikeService.commentUnLike(payload);
      return res.status(201).send({ message: "댓글에 좋아요를 취소했습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}
module.exports = CommentLikeController;
