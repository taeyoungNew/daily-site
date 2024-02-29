const { User, UserInfo } = require("../models");
const { sequelize } = require("../models/index");
// const { Transaction } = require("sequelize");
class UserService {
  getRandomUsers = async () => {
    // 친구추천을 할껀데
    // 취미나, MBTI, 음식 등이 비슷한 알고리즘으로 친구가 떳으면 하는데 어떻게 해야할까
    // 위의 옵션이 없으면 랜덤으로 돌리고 있으면 그걸 바탕으로 where절에 돌려서 추출하자
    // 일단 랜덤으로 10개씩 가져오자
    const getUsers = await User.findAll({
      attributes: ["id"],
      include: [
        {
          model: UserInfo,
          attributes: ["profileImg", "name"],
        },
      ],
      order: sequelize.literal("rand()"),
      limit: 10,
    });
    console.log("getUsers = ", getUsers);
    return getUsers;
  };

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
      const id = await User.create(
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

  // 회원정보 수정
  // 자기소개 수정
  modifyAboutMe = async (payload) => {
    const { id, aboutMe } = payload;
    try {
      await UserInfo.update(
        { aboutMe },
        {
          where: { userId: id },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  // 취미 수정
  modifyHobby = async (payload) => {
    const { id, hobby } = payload;
    try {
      await UserInfo.update({ hobby }, { where: { userId: id } });
    } catch (error) {
      console.log(error);
    }
  };
  // 좋아하는음식 수정
  modifyFood = async (payload) => {
    const { id, food } = payload;
    try {
      await UserInfo.update({ food }, { where: { userId: id } });
    } catch (error) {
      console.log(error);
    }
  };
  // MBTI 수정
  modifyMbti = async (payload) => {
    const { id, mbti } = payload;
    try {
      await UserInfo.update({ mbti }, { where: { userId: id } });
    } catch (error) {
      console.log(error);
    }
  };

  // 회원탈퇴
  withdrawal = async (id) => {
    const t = await sequelize.transaction();
    try {
      await User.deleteOne({ where: { id } }, { transaction: t });
      await UserInfo.deleteOne({ where: { userId: id } }, { transaction: t });
    } catch (error) {
      await t.rollback();
    }
  };
  // email로 회원조회
  findUser = async (email) => {
    try {
      const result = await User.findOne({
        attributes: ["id", "email", "password"],
        where: { email: email },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  // id로 회원조회
  findIdUser = async (id) => {
    const result = await User.findOne({
      attributes: ["id", "email", "password"],
      where: { id: id },
    });
    return result;
  };

  // 회원의 정보들을 가져오기
  findMyInfo = async (id) => {
    const result = await User.findOne({
      attributes: ["email"],
      include: [
        {
          model: UserInfo,
          attributes: [
            "profileImg",
            "name",
            "hobby",
            "address",
            "mbti",
            "food",
            "age",
            "aboutMe",
          ],
        },
      ],
      where: { id },
    });
    return result;
  };

  // refresh token 정보저장
  saveRefToken = async (payload) => {
    const hashRefToken = payload.hashRefToken;
    const hashRefTokenExp = payload.hashRefTokenExp;
    const id = payload.userId;

    await this.Users.update(
      {
        crrRefToken: hashRefToken,
        crrRefTokenExp: hashRefTokenExp,
      },
      { where: { id: id } }
    );
  };
}

module.exports = UserService;
