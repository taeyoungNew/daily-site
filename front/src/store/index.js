import { createStore } from "vuex";
import userStore from "./modules/userStore";
import authStore from "./modules/authStore";
import postStore from "./modules/postStore";

const store = createStore({
  modules: {
    userStore,
    authStore,
    postStore,
  },
  // plugins: [authStore],
});

export default store;
