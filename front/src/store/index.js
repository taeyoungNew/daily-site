import { createStore } from "vuex";
import userModule from "./user/index";

const store = createStore({
  modules: {
    userMod: userModule,
  },
});

export default store;
