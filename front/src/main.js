import { createApp } from "vue";
// import VueCookie from "vue-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faMessage,
  faSmile,
  faImage,
} from "@fortawesome/free-regular-svg-icons";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";

library.add(faUsers, faBell, faMessage, faSmile, faImage);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  // .use(VueCookie)
  .mount("#app");
