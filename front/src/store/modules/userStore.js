import AuthApi from "@/api/auth";

const userStore = {
  namespaced: true,
  state() {
    return {
      userEmail: "",
      userNickname: "",
    };
  },
  getters: {},
  mutations: {
    SIGNIN_USER() {},
  },
  actions: {
    async SIGNIN_USER(context, payload) {
      console.log(context);
      await AuthApi.signin(payload);
    },
  },
};

export default userStore;
