const { Follow } = require("../models");
class FollowRepository {
  userFollow = async (payload) => {
    const { followingId, followerId } = payload;
    await Follow.create({ followingId, followerId });
  };

  userUnFollow = async (payload) => {
    const { followingId, followerId } = payload;
    await Follow.destroy({ where: { followingId, followerId } });
  };

  checkFollowing = async (payload) => {
    const { followingId, followerId } = payload;
    const result = await Follow.findOne({ where: { followingId, followerId } });
    return result;
  };
}
module.exports = FollowRepository;
