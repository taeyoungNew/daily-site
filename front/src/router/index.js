import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/SigninView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/SignupView.vue"),
  },
  {
    path: "/myPage",
    name: "myPage",
    component: () => import("@/views/MyPageView.vue"),
  },
  {
    path: "/usersPage",
    name: "usersPage",
    component: () => import("@/views/UsersView.vue"),
  },
  {
    path: "/404",
    name: "NotFoundPage",
    component: () => import("@/views/NotFoundView.vue"),
  },
  {
    path: "/:catchAll(.*)", // vue3에서는 catchAll을 따로 붙여줘야한다.
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
