import AuthApi from "@/api/auth";
import {
  saveUserInfo,
  getUserEmail,
  getUserName,
  getUserMbti,
  getUserAge,
  getUserAboutMe,
  getUserFood,
  getUserHobby,
  getUserProfileImg,
  getUserAddress,
} from "@/utils/cookies";
const authStore = {
  namespaced: true,
  state() {
    return {
      userEmail: getUserEmail() || "",
      userName: getUserName() || "",
      userMbti: getUserMbti() || "",
      userProfileIme: getUserProfileImg() || "",
      userHobby: getUserHobby() || "",
      userAddress: getUserAddress() || "",
      userFood: getUserFood() || "",
      userAboutMe: getUserAboutMe() || "",
      userAge: getUserAge() || "",
    };
  },
  getters: {
    GET_USER_INFO(state) {
      const payload = {
        userAboutMe: state.userAboutMe,
        userMbti: state.userMbti,
        userHobby: state.userHobby,
        userFood: state.userFood,
      };
      return payload;
    },
  },
  mutations: {
    SIGNIN_USER(state, userData) {
      const { profileImg, name, hobby, address, mbti, aboutMe, age } =
        userData.UserInfo;
      const email = userData.email;
      state.userEmail = email;
      state.userName = name;
      state.userProfileIme = profileImg;
      state.userHobby = hobby;
      state.userAge = age;
      state.userMbti = mbti;
      state.userAboutMe = aboutMe;
      state.userAddress = address;
    },
  },
  actions: {
    async SIGNIN_USER(context, payload) {
      try {
        const authApi = new AuthApi();
        const userData = await authApi
          .signin(payload)
          .then((res) => {
            // console.log(res.)

            return res.data.data;
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        console.log("userData = ", userData);
        context.commit("SIGNIN_USER", userData);
        saveUserInfo(userData);
        // 기타정보는 어떻게 할까?
        // 로컬호스트로 저장을 하자
        // console.log(userData);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

export default authStore;
