const { Users, UserInfo } = require("../models");
const { sequelize } = require("../models/index");
// const { Transaction } = require("sequelize");
class UserService {
  signup = async (payload) => {
    // 트랜잭션 : 설정
    // const t = await sequelize.transaction({
    //   isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // 트랜잭션 격리 수준을 설정합니다.
    // });
    const t = await sequelize.transaction();
    const {
      email,
      password,
      profileImg,
      name,
      hobby,
      address,
      mbti,
      food,
      age,
      aboutMe,
    } = payload;
    // 트랜잭션으로 하자
    try {
      const id = await Users.create(
        {
          email,
          password,
        },
        { transaction: t }
      );
      await UserInfo.create(
        {
          userId: id.id,
          profileImg,
          name,
          hobby,
          address,
          mbti,
          food,
          age,
          aboutMe,
        },
        { transaction: t }
      );
      // 트랜잭션 : commit
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  };
  withdrawal = async (id) => {
    const t = await sequelize.transaction();
    try {
      await this.Users.deleteOne({ where: { id } }, { transaction: t });
      await this.UserInfo.deleteOne(
        { where: { userId: id } },
        { transaction: t }
      );
    } catch (error) {
      await t.rollback();
    }
  };
  findEmail = async (email) => {
    const result = await Users.findOne({ where: { email: email } });
    return result;
  };
}

module.exports = UserService;
