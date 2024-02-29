const UseInfoRepository = require("../repositories/userInfo.repository");

class UserInfoService {
  useInfoRepository = new UseInfoRepository();
}

module.exports = UserInfoService;
