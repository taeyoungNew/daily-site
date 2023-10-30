const { CommentLike } = require("../models");
class CommentLikeRepository {
  commentLike = async (payload) => {
    const { userId, commentId } = payload;
    await CommentLike.create({ userId, commentId });
  };

  commentUnLike = async (payload) => {
    const { userId, commentId } = payload;
    console.log("");
    await CommentLike.destroy({ where: { userId, commentId } });
  };

  // 해당 댓글에 좋아요를 눌렀는지 확인
  checkCommentLike = async (payload) => {
    const { commentId, userId } = payload;
    console.log("좋아요를 누른댓글인지 확인", payload);
    const isExCommentLike = CommentLike.findOne({
      where: { commentId, userId },
    });
    return isExCommentLike;
  };
}
module.exports = CommentLikeRepository;
