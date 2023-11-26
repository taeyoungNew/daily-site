import AuthApi from "@/api/auth";

const authStore = {
  namespaced: true,
  state() {
    return {
      userEmail: "",
      userName: "",
      userProfileIme: "",
      userHobby: "",
      userAddress: "",
      userMbti: "",
      userAboutMe: "",
      userAge: "",
    };
  },
  getters: {},
  mutations: {
    SIGNIN_USER(state, userData) {
      const { profileImg, name, hobby, address, mbti, aboutMe, age } =
        userData.UserInfo;
      console.log("userData = ", userData);
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
        context.commit("SIGNIN_USER", userData);
        // console.log(userData);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

export default authStore;
