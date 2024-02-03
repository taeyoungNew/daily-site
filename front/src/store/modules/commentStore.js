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
        alert(error.response.data.message);
      }
    },
    async MODIFY_COMMENT(state, payload) {
      const commentApi = new CommentApi();
      try {
        await commentApi.modifyComment(payload);
        alert("댓글이 수정되었습니다.");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
    async DELETE_COMMENT(state, payload) {
      const commentApi = new CommentApi();
      try {
        await commentApi.deleteComment(payload);
        alert("댓글이 삭제되었습니다.");
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
  actions: {
    CREATE_COMMENT(context, payload) {
      context.commit("CREATE_COMMENT", payload);
    },
    // LOAD_COMMENTS(context, payload) {
    //   context.commit("LOAD_COMMENTS", payload);
    // },
    MODIFY_COMMENT(context, payload) {
      context.commit("MODIFY_COMMENT", payload);
    },
    DELETE_COMMENT(context, payload) {
      context.commit("DELETE_COMMENT", payload);
    },
  },
};

export default commentStore;
