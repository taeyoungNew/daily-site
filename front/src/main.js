import { createApp } from "vue";
// import VueCookie from "vue-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUsers, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faMessage,
  faSmile,
  faImage,
  faThumbsUp,
  faCommentDots,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";

library.add(
  faPen,
  faPenToSquare,
  faCommentDots,
  faThumbsUp,
  faUsers,
  faBell,
  faMessage,
  faSmile,
  faImage
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  // .use(VueCookie)
  .mount("#app");
