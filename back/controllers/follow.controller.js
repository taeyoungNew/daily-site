const FollowService = require("../services/follow.service");
class FollowContoller {
  followService = new FollowService();
  userFollow = async (req, res) => {
    try {
      const { id } = res.locals.user;
      const { followingId } = req.params;

      if (id === followingId) {
        return res
          .status(412)
          .send({ message: "자신을 팔로우 할 수 없습니다." });
      }
      const payload = {
        followerId: id,
        followingId,
      };
      // 팔로우 되어있는지 확인
      const isExFollowing = await this.followService.checkFollowing(payload);
      if (isExFollowing) {
        return res.status(412).send({ message: "이미 팔로우한 유저입니다." });
      }
      await this.followService.userFollow(payload);

      return res.status(201).send({ message: "팔로우하였습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };

  userUnFollow = async (req, res) => {
    try {
      const { id } = res.locals.user;
      const { followingId } = req.params;
      if (id === followingId) {
        return res
          .status(412)
          .send({ message: "자신을 팔로우취소 할 수가 없습니다." });
      }
      const payload = {
        followerId: id,
        followingId,
      };
      // 팔로우 되어있는지 확인
      const isExFollowing = await this.followService.checkFollowing(payload);
      if (!isExFollowing) {
        return res.status(412).send({ message: "팔로우한 유저가 아닙니다." });
      }

      await this.followService.userUnFollow(payload);
      return res.status(201).send({ message: "팔로우를 취소하였습니다." });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  };
}

module.exports = FollowContoller;
