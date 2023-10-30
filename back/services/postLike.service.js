const PostLikeRepositoy = require("../repositories/postLike.repository");

class LikeService {
  postLikeRepositoy = new PostLikeRepositoy();

  postLike = async (payload) => {
    await this.postLikeRepositoy.postLike(payload);
  };

  postUnLike = async (payload) => {
    await this.postLikeRepositoy.postUnLike(payload);
  };

  // 해당 게시물을 좋아요 눌렀는지 확인
  checkPostLike = async (payload) => {
    const isExPostLike = this.postLikeRepositoy.checkPostLike(payload);
    return isExPostLike;
  };
}

module.exports = LikeService;
