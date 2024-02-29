const FollowRepository = require("../repositories/follow.repository");

class FollowService {
  followRepository = new FollowRepository();
  userFollow = async (payload) => {
    await this.followRepository.userFollow(payload);
  };

  userUnFollow = async (payload) => {
    await this.followRepository.userUnFollow(payload);
  };

  checkFollowing = async (payload) => {
    const result = await this.followRepository.checkFollowing(payload);
    return result;
  };
}

module.exports = FollowService;
