const AuthRepository = require("../repositories/auth.repository");

class AuthService {
  authRepository = new AuthRepository();
}

module.exports = AuthService;
