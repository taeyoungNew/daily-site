const { PostLike } = require("../models");
class LikeRepository {
  postLike = async (payload) => {
    const { userId, postId } = payload;
    await PostLike.create({ userId, postId });
  };

  postUnLike = async (payload) => {
    const { userId, postId } = payload;
    await PostLike.destroy({ where: { userId, postId } });
  };

  // 해당 게시물을 좋아요 눌렀는지 확인
  checkPostLike = async (payload) => {
    const { postId, userId } = payload;
    const isExPostLike = PostLike.findOne({ where: { postId, userId } });
    return isExPostLike;
  };
}

module.exports = LikeRepository;
