const LikeRepository = require("../repositories/like.repository");

class LikeService {
  likeRepository = new LikeRepository();

  postLike = async (payload) => {
    await this.likeRepository.postLike(payload);
  };

  postUnLike = async (payload) => {
    await this.likeRepository.postUnLike(payload);
  };

  commentLike = async (payload) => {
    await this.likeRepository.commentLike(payload);
  };

  commentUnLike = async () => {};

  // 해당 게시물을 좋아요 눌렀는지 확인
  checkPostLike = async (payload) => {
    const isExPostLike = this.likeRepository.checkPostLike(payload);
    return isExPostLike;
  };
}

module.exports = LikeService;
