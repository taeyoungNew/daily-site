const { Users, UserInfo } = require("../models");
const { sequelize } = require("../models/index");
// const { Transaction } = require("sequelize");
class UserService {
  // 회원가입
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
  // 회원탈퇴
  withdrawal = async (id) => {
    const t = await sequelize.transaction();
    try {
      await Users.deleteOne({ where: { id } }, { transaction: t });
      await UserInfo.deleteOne({ where: { userId: id } }, { transaction: t });
    } catch (error) {
      await t.rollback();
    }
  };
  // 회원조회
  findUser = async (email) => {
    const result = await Users.findOne({
      attributes: ["id", "email", "password"],
      where: { email: email },
    });
    return result;
  };

  // refresh token 정보저장
  saveRefToken = async (payload) => {
    const hashRefToken = payload.hashRefToken;
    const hashRefTokenExp = payload.hashRefTokenExp;
    const id = payload.userId;

    await Users.update(
      {
        crrRefToken: hashRefToken,
        crrRefTokenExp: hashRefTokenExp,
      },
      { where: { id: id } }
    );
  };
}

module.exports = UserService;
