import PostApi from "@/api/post";
import PostLikeApi from "@/api/postLike";
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
      if (state.posts.length === 0) {
        const posts = await postApi.loadPosts();
        state.posts = posts.data.datas;
      } else {
        const lastPostId = state.posts[state.posts.length - 1].id;
        const posts = await postApi.loadPosts(lastPostId);
        state.posts = state.posts.concat(posts.data.datas);
      }
    },
    async LOAD_MY_POSTS(state) {
      const postApi = new PostApi();
      if (state.myPosts.length === 0) {
        const myPosts = await postApi.loadMyPosts();
        state.myPosts = myPosts.data.datas;
      } else {
        const lastPostId = state.myPosts[state.myPosts.length - 1].id;
        const myPosts = await postApi.loadMyPosts(lastPostId);
        state.myPosts = state.myPosts.concat(myPosts.data.datas);
      }
    },

    async LIKE_POST(state, postId) {
      const postLikeApi = new PostLikeApi();
      try {
        await postLikeApi.likePost(postId);
        alert("해당 게시물에 좋아요를 눌렀습니다.");
      } catch (error) {
        alert(error.response.data.message);
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

    async LIKE_POST(context, postId) {
      await context.commit("LIKE_POST", postId);
    },
  },
};

export default postStore;
