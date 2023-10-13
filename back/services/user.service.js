const UserRepositoy = require("../repositories/user.repository");
class UserService {
  userRepositoy = new UserRepositoy();

  // 회원가입
  signup = async (payload) => {
    await this.userRepositoy.signup(payload);
  };
  // 이메일 조회
  findEmail = async (email) => {
    const result = await this.userRepositoy.findEmail(email);
    return result;
  };
  // 회원탈퇴
  withdrawal = async (id) => {
    await this.userRepositoy.withdrawal(id);
  };
}

module.exports = UserService;
