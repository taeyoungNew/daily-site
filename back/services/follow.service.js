const FollowRepository = require("../repositories/follow.repository");

class FollowService {
  followRepository = new FollowRepository();
}

module.exports = FollowService;
