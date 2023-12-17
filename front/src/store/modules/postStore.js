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
      if (state.posts) {
        const lastPostId = state.posts[state.posts.length - 1].id;
        const posts = await postApi.loadPosts(lastPostId);
        console.log("posts.data.datas", posts.data);
        state.posts = state.posts.concat(posts.data.datas);
      } else {
        const posts = await postApi.loadPosts();
        state.posts = posts.data.datas;
      }
    },

    GET_MY_POSTS(state, payload) {
      state.myPosts = payload;
    },
  },
  actions: {
    LOAD_POSTS: throttle(function (context) {
      console.log("LOAD_POSTS");
      context.commit("LOAD_POSTS");
    }, 2000),

    async GET_MY_POSTS(context) {
      const postApi = new PostApi();
      const myPosts = await postApi.getMyPosts();
      context.commit("GET_MY_POSTS", myPosts.data.datas);
    },
  },
};

export default postStore;
