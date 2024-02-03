<template>
  <div class="post-container">
    <div class="post-profile-name-box">
      <div class="post-profile"></div>
      <div class="name">{{ postData.userName }}</div>
    </div>
    <div class="content-box">
      <div class="post-content">{{ postData.content }}</div>
    </div>
    <div class="post-footer">
      <div>
        <font-awesome-icon
          @click="likePost(postData.id)"
          class="like-btn icon"
          icon="fa-regular fa-thumbs-up"
        />
        <span v-if="postData.likeCnt > 0">{{ postData.likeCnt }}</span>
        <span v-else> {{ 0 }}</span>
      </div>
      <div>
        <font-awesome-icon
          @click="cmmntBtn($event, postData.id)"
          class="comment-btn icon"
          icon="fa-regular fa-comment-dots"
        />
        <span v-if="postData.commentCnt > 0">{{ postData.commentCnt }}</span>
        <span v-else> {{ 0 }}</span>
      </div>
    </div>
    <comment-box
      :id="`comments-${postData.id}`"
      v-bind:postId="postData.id"
      v-bind:comments="this.comments"
      class="comment-box"
    ></comment-box>
  </div>
</template>

<script>
import CommentBox from "./CommentBox.vue";
import CommentApi from "../api/comment";
export default {
  components: { CommentBox },
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    async cmmntBtn(e, postId) {
      const commentApi = new CommentApi();
      const postContainer = await e.currentTarget.parentElement.parentElement
        .parentElement;
      const postComments = document.getElementById(
        `${postContainer.children[3].id}`
      );
      if (postComments.style.display === "block") {
        postComments.style.display = "none";
      } else {
        postComments.style.display = "block";
      }
      // 댓글 불러오기
      const result = await commentApi.loadComments(postId);
      console.log(result.data.datas);
      this.comments = result.data.datas;
    },

    async likePost(param) {
      const postId = param;
      await this.$store.dispatch("postStore/LIKE_POST", postId);
    },
  },
  props: {
    postData: {
      type: Object,
      default() {
        return { message: "게시물을 올려주세요" };
      },
    },
  },
};
</script>

<style scoped>
.post-container {
  box-sizing: border-box;
  border: 0.5px solid gray;
  width: 100%;
  margin-top: 10px;
}

.post-profile-name-box {
  border: 1px solid black;
  display: flex;
  padding: 20px;
  align-items: center;
}

.post-profile {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  border-radius: 70%;
}
.name {
  margin-left: 15px;
  font-size: 20px;
}

.content-box {
  border: 1px solid black;
  height: 350px;
}
.post-content {
  padding: 20px;
  font-size: 16px;
  height: 100%;
}
.post-footer {
  padding: 20px;
  border: 1px solid black;
  font-size: 2em;
  display: flex;
  justify-content: flex-end;
}

.post-footer > div {
  padding: 1px;
}

.like-btn {
  margin-right: 0.4em;
}

.comment-btn {
  margin-right: 0.4em;
  margin-left: 0.4em;
}
.icon {
  cursor: pointer;
}

.comment-box {
  display: none;
}
</style>
