import throttle from "lodash.throttle";
import UserApi from "@/api/user";

const userStore = {
  namespaced: true,
  state() {
    return {
      userLists: "",
      userEmail: "",
      userNickname: "",
    };
  },
  getters: {},
  mutations: {
    async GET_RANDOM_USERS(state) {
      const userApi = new UserApi();
      const userList = await userApi.getRandomUsers();
      state.userLists = userList.data.datas;
    },
  },
  actions: {
    GET_RANDOM_USERS: throttle(function (context) {
      context.commit("GET_RANDOM_USERS");
    }, 3000),
  },
};

export default userStore;
