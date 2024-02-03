import axios from "axios";
export default class AuthApi {
  signin = async (payload) => {
    return await axios.post("http://localhost:3000/api/auth/login", payload, {
      withCredentials: true, // axios는 withCredentials를 true로 하지 않으면 토큰을 저장안함
    });
  };
  logout = async () => {
    return await axios.delete("http://localhost:3000/api/auth/logout", {
      withCredentials: true,
    });
  };
  loadMyInfo = async () => {
    return await axios.get(`http://localhost:3000/api/user/`, {
      withCredentials: true,
    });
  };
  modifyAboutMe = async (aboutMe) => {
    return await axios.patch(
      `http://localhost:3000/api/user/about-me`,
      { aboutMe }, // patch는 객체형태로 데이터를 보낸다.
      {
        withCredentials: true,
      }
    );
  };
  modifyMbti = async (mbti) => {
    return await axios.patch(
      `http://localhost:3000/api/user/mbti`,
      { mbti },
      {
        withCredentials: true,
      }
    );
  };
  modifyFood = async (food) => {
    return await axios.patch(
      `http://localhost:3000/api/user/food`,
      { food },
      {
        withCredentials: true,
      }
    );
  };
  modifyHobby = async (hobby) => {
    return await axios.patch(
      `http://localhost:3000/api/user/hobby`,
      { hobby },
      {
        withCredentials: true,
      }
    );
  };
}
