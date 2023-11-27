const UserRepositoy = require("../repositories/user.repository");
class UserService {
  userRepositoy = new UserRepositoy();

  // 회원가입
  signup = async (payload) => {
    await this.userRepositoy.signup(payload);
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
  findUserInfo = async (id) => {
    const result = await this.userRepositoy.findUserInfo(id);
    return result;
  };
  // 회원탈퇴
  withdrawal = async (id) => {
    await this.userRepositoy.withdrawal(id);
  };
}

module.exports = UserService;
