import PostApi from "@/api/post";

const postStore = {
  namespaced: true,
  state() {
    return {
      posts: "",
    };
  },
  getters: {},
  mutations: {
    LOAD_POSTS(state, payload) {
      state.posts = payload;
    },
  },
  actions: {
    async LOAD_POSTS(context, payload) {
      const postApi = new PostApi();
      const posts = await postApi.loadPosts(payload);
      console.log("posts = ", posts);
      context.commit("LOAD_POSTS", posts.data);
    },
  },
};

export default postStore;
