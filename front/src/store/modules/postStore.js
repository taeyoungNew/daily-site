import PostApi from "@/api/post";
import throttle from "lodash.throttle";
const postStore = {
  namespaced: true,
  state() {
    return {
      posts: "",
      myPosts: "",
    };
  },
  getters: {},
  mutations: {
    async LOAD_POSTS(state) {
      const postApi = new PostApi();
      if (state.posts.length !== 0) {
        const lastPostId = state.posts[state.posts.length - 1].id;
        const posts = await postApi.loadPosts(lastPostId);
        state.posts = state.posts.concat(posts.data.datas);
      } else {
        const posts = await postApi.loadPosts();
        state.posts = posts.data.datas;
      }
    },
    async LOAD_MY_POSTS(state) {
      const postApi = new PostApi();
      if (state.myPosts !== "") {
        const lastPostId = state.myPosts[state.myPosts.length - 1].id;
        const myPosts = await postApi.loadMyPosts(lastPostId);
        state.myPosts = state.myPosts.concat(myPosts.data.datas);
      } else {
        const myPosts = await postApi.loadMyPosts();
        state.myPosts = myPosts.data.datas;
      }
    },
  },
  actions: {
    LOAD_POSTS: throttle(function (context) {
      context.commit("LOAD_POSTS");
    }, 2000),
    LOAD_MY_POSTS: throttle(function (context) {
      context.commit("LOAD_MY_POSTS");
    }, 2000),
  },
};

export default postStore;
