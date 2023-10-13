const LikeRepository = require("../repositories/like.repository");

class LikeService {
  likeRepository = new LikeRepository();
}

module.exports = LikeService;
