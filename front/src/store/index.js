import { createStore } from "vuex";
import userStore from "./modules/userStore";
import authStore from "./modules/authStore";

const store = createStore({
  modules: {
    userStore,
    authStore,
  },
});

export default store;
