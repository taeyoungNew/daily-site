import { createStore } from "vuex";
import userStore from "./modules/userStore";
import authStore from "./modules/authStore";
import postStore from "./modules/postStore";
import commentStore from "./modules/commentStore";

const store = createStore({
  modules: {
    userStore,
    authStore,
    postStore,
    commentStore,
  },
  // plugins: [authStore],
});

export default store;
