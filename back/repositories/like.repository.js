const { Like } = require("../models");
class LikeRepository {
  postLike = async (payload) => {
    const { userId, postId } = payload;
    await Like.create({ userId, postId });
  };

  postUnLike = async (payload) => {
    const { userId, postId } = payload;
    await Like.destroy({ where: { userId, postId } });
  };

  commentLike = async (payload) => {
    const { userId, commentId } = payload;
  };

  commentUnLike = async () => {};

  // 해당 게시물을 좋아요 눌렀는지 확인
  checkPostLike = async (payload) => {
    const { postId, userId } = payload;
    const isExPostLike = Like.findOne({ where: { postId, userId } });
    return isExPostLike;
  };
}

module.exports = LikeRepository;
