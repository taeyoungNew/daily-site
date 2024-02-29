import axios from "axios";
// 회원가입, 유저정보 조회, 수정 등
export default class UserApi {
  // 유저리스트가져오기
  getRandomUsers = async () => {
    return await axios.get("http://localhost:3000/api/user/getRandomUser", {
      withCredentials: true,
    });
  };

  signup = async (payload) => {
    // return await axios.post(`${process.env.BASE_API_URL}/api/user/`, payload);
    return await axios.post(`http://localhost:3000/api/user/`, payload);
  };

  // 나의 정보가져오기

  // 다른 유저의 정보조회하기
}
