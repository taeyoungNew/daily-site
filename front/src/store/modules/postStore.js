import PostApi from "@/api/post";

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
    LOAD_POSTS(state, payload) {
      state.posts = payload;
    },

    GET_MY_POSTS(state, payload) {
      state.myPosts = payload;
    },
  },
  actions: {
    async LOAD_POSTS(context) {
      const postApi = new PostApi();
      const posts = await postApi.loadPosts();
      context.commit("LOAD_POSTS", posts.data);
    },
    async GET_MY_POSTS(context) {
      const postApi = new PostApi();
      const myPosts = await postApi.getMyPosts();
      console.log(myPosts.data);
      context.commit("GET_MY_POSTS", myPosts.data.datas);
    },
  },
};

export default postStore;
