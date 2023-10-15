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
  // 이메일패스워드조회
  findUser = async (email) => {
    const result = await this.userRepositoy.findUser(email);
    return result;
  };
  // 회원정보조회
  // findUser = async (email) => {};
  // 회원탈퇴
  withdrawal = async (id) => {
    await this.userRepositoy.withdrawal(id);
  };
}

module.exports = UserService;
