const CommentLikeRepository = require("../repositories/commentLike.repositoy");
class CommentLikeService {
  commentLikeRepository = new CommentLikeRepository();
  commentLike = async (payload) => {
    await this.commentLikeRepository.commentLike(payload);
  };

  commentUnLike = async (payload) => {
    await this.commentLikeRepository.commentUnLike(payload);
  };

  checkCommentLike = async (payload) => {
    const isExCommentLike = await this.commentLikeRepository.checkCommentLike(
      payload
    );
    return isExCommentLike;
  };
}

module.exports = CommentLikeService;
