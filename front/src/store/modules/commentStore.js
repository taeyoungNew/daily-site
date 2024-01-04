import CommentApi from "@/api/comment";
const commentStore = {
  namespaced: true,

  state() {
    return {};
  },
  getters: {},
  mutations: {
    async CREATE_COMMENT(state, payload) {
      const commentApi = new CommentApi();
      try {
        await commentApi.createComment(payload);
        alert("댓글이 생성되었습니다.");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  },
  actions: {
    async CREATE_COMMENT(context, payload) {
      context.commit("CREATE_COMMENT", payload);
    },
  },
};

export default commentStore;
