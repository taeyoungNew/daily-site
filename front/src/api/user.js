import axios from "axios";
// 회원가입, 유저정보 조회, 수정 등
export default class UserApi {
  signup = async (payload) => {
    // return await axios.post(`${process.env.BASE_API_URL}/api/user/`, payload);
    return await axios.post(`http://localhost:3000/api/user/`, payload);
  };

  // 나의 정보가져오기

  // 다른 유저의 정보조회하기
}
