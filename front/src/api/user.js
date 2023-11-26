import axios from "axios";
// 회원가입, 유저정보 조회 등
export default class UserApi {
  signup = async (payload) => {
    // return await axios.post(`${process.env.BASE_API_URL}/api/user/`, payload);
    return await axios.post(`http://localhost:3000/api/user/`, payload);
  };
}
