import axios from "axios";
export default class AuthApi {
  signin = async (payload) => {
    return await axios.post("http://localhost:3000/api/auth/login", payload, {
      withCredentials: true, // axios는 withCredentials를 true로 하지 않으면 토큰을 저장안함
    });
  };
}
