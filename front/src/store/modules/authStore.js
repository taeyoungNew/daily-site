import AuthApi from "@/api/auth";

import {
  saveUserInfo,
  saveAboutMe,
  saveFood,
  saveHobby,
  saveMbti,
  getUserEmail,
  getUserName,
  getMyMbti,
  getUserAge,
  getMyAboutMe,
  getMyFood,
  getMyHobby,
  getUserProfileImg,
  getUserAddress,
} from "@/utils/cookies";
const authStore = {
  namespaced: true,
  state() {
    return {
      userEmail: getUserEmail() || "",
      userName: getUserName() || "",
      userMbti: getMyMbti() || "",
      userProfileIme: getUserProfileImg() || "",
      userHobby: getMyHobby() || "",
      userAddress: getUserAddress() || "",
      userFood: getMyFood() || "",
      userAboutMe: getMyAboutMe() || "",
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
      const { profileImg, name, hobby, address, mbti, aboutMe, age, food } =
        userData.UserInfo;
      const email = userData.email;
      state.userEmail = email;
      state.userName = name;
      state.userFood = food;
      state.userProfileIme = profileImg;
      state.userHobby = hobby;
      state.userAge = age;
      state.userMbti = mbti;
      state.userAboutMe = aboutMe;
      state.userAddress = address;
    },
    async MODIFY_ABOUTME(state, param) {
      console.log("MODIFY_ABOUTME =", param);
      state.userAboutMe = param;
    },
    async MODIFY_MBTI(state, param) {
      console.log("MODIFY_MBTI = ", param);
      state.userMbti = param;
    },
    async MODIFY_FOOD(state, param) {
      state.userFood = param;
    },
    async MODIFY_HOBBY(state, param) {
      state.userHobby = param;
    },

    async LOAD_MY_INFO(state, payload) {
      console.log("LOAD_MY_INFO");
      if (payload) {
        for (let key in payload["UserInfo"]) {
          if (key === "aboutMe") state.userAboutMe = payload["UserInfo"][key];
          if (key === "mbti") state.userMbti = payload["UserInfo"][key];
          if (key === "food") state.userFood = payload["UserInfo"][key];
          if (key === "hobby") state.userHobby = payload["UserInfo"][key];
        }
      }
    },
  },
  actions: {
    async LOAD_MY_INFO(context) {
      const authApi = new AuthApi();
      const myInfo = await authApi
        .loadMyInfo()
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      context.commit("LOAD_MY_INFO", myInfo);
    },

    async SIGNIN_USER(context, payload) {
      try {
        const authApi = new AuthApi();
        const userData = await authApi
          .signin(payload)
          .then((res) => {
            return res.data.data;
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        context.commit("SIGNIN_USER", userData);
        saveUserInfo(userData);
        // 기타정보는 어떻게 할까?
        // 로컬호스트로 저장을 하자
      } catch (error) {
        console.log(error.message);
      }
    },
    async MODIFY_ABOUTME(context, param) {
      const authApi = new AuthApi();
      console.log("getMyMbti()", getMyMbti());
      await authApi
        .modifyAboutMe(param)
        .then((res) => {
          console.log(res.data.message);
          saveAboutMe(param);
          context.commit("MODIFY_ABOUTME", param);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    async MODIFY_MBTI(context, param) {
      try {
        const authApi = new AuthApi();
        await authApi
          .modifyMbti(param)
          .then((res) => {
            console.log(res.data.message);
            saveMbti(param);
            context.commit("MODIFY_MBTI", param);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    async MODIFY_FOOD(context, param) {
      try {
        const authApi = new AuthApi();
        await authApi
          .modifyFood(param)
          .then((res) => {
            console.log(res.data.message);
            saveFood(param);
            context.commit("MODIFY_FOOD", param);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    async MODIFY_HOBBY(context, param) {
      try {
        const authApi = new AuthApi();
        await authApi
          .modifyHobby(param)
          .then((res) => {
            console.log(res.data.message);
            saveHobby(param);
            context.commit("MODIFY_HOBBY", param);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

export default authStore;
