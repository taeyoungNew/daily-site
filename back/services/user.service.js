const UserRepositoy = require("../repositories/user.repository");
class UserService {
  userRepositoy = new UserRepositoy();
}

module.exports = UserService;
