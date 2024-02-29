const UserRepositoy = require("../repositories/user.repository");
class UserService {
  userRepositoy = new UserRepositoy();

  // 유저 랜덤으로 불러오기
  getRandomUsers = async () => {
    const result = await this.userRepositoy.getRandomUsers();
    return result;
  };

  // 회원가입
  signup = async (payload) => {
    await this.userRepositoy.signup(payload);
  };
  // 회원정보 수정
  // 자기소개 수정
  modifyAboutMe = async (payload) => {
    await this.userRepositoy.modifyAboutMe(payload);
  };
  // 취미 수정
  modifyHobby = async (payload) => {
    await this.userRepositoy.modifyHobby(payload);
  };
  // 좋아하는음식 수정
  modifyFood = async (payload) => {
    await this.userRepositoy.modifyFood(payload);
  };
  // MBTI 수정
  modifyMbti = async (payload) => {
    await this.userRepositoy.modifyMbti(payload);
  };

  // freshToken정보 저장
  saveRefToken = async (payload) => {
    await this.userRepositoy.saveRefToken(payload);
  };
  // 이메일로회원정보조회
  findUser = async (email) => {
    const result = await this.userRepositoy.findUser(email);
    return result;
  };

  // id로이메일패스워드조회
  findIdUser = async (id) => {
    const result = await this.userRepositoy.findIdUser(id);
    return result;
  };
  // 회원정보상세조회
  findMyInfo = async (id) => {
    const result = await this.userRepositoy.findMyInfo(id);
    return result;
  };
  // 회원탈퇴
  withdrawal = async (id) => {
    await this.userRepositoy.withdrawal(id);
  };
}

module.exports = UserService;
