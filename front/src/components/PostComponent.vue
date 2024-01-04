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
      <font-awesome-icon class="like-btn icon" icon="fa-regular fa-thumbs-up" />
      <font-awesome-icon
        @click="cmmntBtn"
        class="comment-btn icon"
        icon="fa-regular fa-comment-dots"
      />
    </div>
    <comment-box
      :id="`comments-${postData.id}`"
      v-bind:postId="postData.id"
      style="display: block"
    ></comment-box>
  </div>
</template>

<script>
import CommentBox from "./CommentBox.vue";
export default {
  components: { CommentBox },
  data() {
    return {};
  },
  methods: {
    async cmmntBtn(e) {
      const postContainer = await e.currentTarget.parentElement.parentElement;
      const postComments = document.getElementById(
        `${postContainer.children[3].id}`
      );
      console.log("postComments = ", postComments);
      if (postComments.style.display === "block") {
        postComments.style.display = "none";
      } else {
        postComments.style.display = "block";
      }
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
  padding: 10px;
}

.like-btn {
  margin-right: 1em;
}
.icon {
  cursor: pointer;
}
</style>
