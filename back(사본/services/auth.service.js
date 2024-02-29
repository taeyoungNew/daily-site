const AuthRepository = require("../repositories/auth.repository");

class AuthService {
  authRepository = new AuthRepository();

  checkRefToken = (refToken) => {
    
  };
}

module.exports = AuthService;
