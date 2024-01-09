<template>
  <div class="comment-container">
    <div class="input-comment-box">
      <div class="input-comment">
        <div class="user-profile"></div>
        <input type="text" v-model="commentContent" />
      </div>
      <button @click="createComment">댓글달기</button>
    </div>
    <div class="comment-list">
      <div
        :id="`comment-box-${comment.id}`"
        class="comment-box"
        v-for="comment in comments"
        v-bind:key="comment.id"
      >
        <div class="user">
          <div class="user-profile"></div>
          <div class="">{{ comment.name }}</div>
          <font-awesome-icon
            class="ellipsis-vertical"
            icon="fa-solid fa-ellipsis-vertical"
            @click="ellipsisVertical"
          />
          <div :id="`comment-menu-${comment.id}`" class="comment-menu">
            <font-awesome-icon @click="showTextArea" class="pen" icon="pen" />
            <font-awesome-icon
              @click="deleteComment(comment.id)"
              class="trash-can"
              icon="fa-solid fa-trash-can"
            />
          </div>
        </div>
        <div :id="`comment-content${comment.id}`" class="comment-content">
          <div class="">{{ comment.content }}</div>
        </div>
        <div :id="`textarea-${comment.id}`" class="edit-commnt-box">
          <textarea
            ref="editCommentInput"
            class="edit-comment"
            rows="1"
            name=""
            @input="resizeTextarea"
            v-model="editComment"
          ></textarea>
          <div class="edit-btn-box">
            <font-awesome-icon
              class="cencel-btn"
              @click="cencelModifyComment"
              icon="fa-solid fa-rectangle-xmark"
            />
            <font-awesome-icon
              class="edit-btn"
              @click="modifyComment(comment.id)"
              icon="fa-solid fa-pen"
            />
          </div>
        </div>
        <div class="comment-like">
          <font-awesome-icon
            class="comment-like-btn"
            :icon="['far', 'thumbs-up']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentContent: "",
      menu: false,
      editComment: "",
    };
  },
  methods: {
    // 댓글 생성하기
    async createComment() {
      const payload = {
        comment: this.commentContent,
        postId: this.postId,
        name: this.$store.state.authStore.userName,
      };
      await this.$store.dispatch("commentStore/CREATE_COMMENT", payload);
    },

    // 댓글 메뉴창 열기
    ellipsisVertical(e) {
      const commentContainer = e.currentTarget.parentElement;
      const commentMenu = document.getElementById(
        `${commentContainer.children[3].id}`
      );
      console.log(commentMenu.style.display);
      if (commentMenu.style.display === "block") {
        commentMenu.style.display = "none";
      } else {
        commentMenu.style.display = "block";
      }
    },

    // 댓글 수정입력란 보이게 하기
    showTextArea(e) {
      const commentBox =
        e.currentTarget.parentElement.parentElement.parentElement;

      const commentMenu = document.getElementById(
        `${commentBox.children[0].children[3].id}`
      );
      const crrCommentContent = document.getElementById(
        `${commentBox.children[1].id}`
      );
      const textArea = document.getElementById(`${commentBox.children[2].id}`);

      commentMenu.style.display = "none";
      if (textArea.style.display === "block") {
        textArea.style.display = "none";
        crrCommentContent.style.display = "block";
      } else {
        textArea.style.display = "block";
        crrCommentContent.style.display = "none";
      }
    },

    // 입력한 수정댓글 서버로 보내기
    async modifyComment(commentId) {
      const payload = {
        postId: this.postId,
        commentId,
        content: this.editComment,
      };
      await this.$store.dispatch("commentStore/MODIFY_COMMENT", payload);
    },

    // 수정하는거 취소하기
    cencelModifyComment(e) {
      const commentBox = document.getElementById(
        `${e.currentTarget.parentElement.parentElement.parentElement.id}`
      );

      const commentContent = document.getElementById(
        `${commentBox.children[1].id}`
      );
      const textAreaBox = document.getElementById(
        `${commentBox.children[2].id}`
      );

      commentContent.style.display = "block";
      textAreaBox.style.display = "none";
    },

    // 댓글 삭제하기
    async deleteComment(commentId) {
      const payload = {
        postId: this.postId,
        commentId,
      };
      await this.$store.dispatch("commentStore/DELETE_COMMENT", payload);
    },
    resizeTextarea() {
      this.$refs.editCommentInput[0].style.height = "2px";
      this.$refs.editCommentInput[0].style.height =
        this.$refs.editCommentInput[0].scrollHeight + "px";
    },
  },
  props: {
    postId: {
      type: Number,
    },
    comments: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.comment-container {
  padding: 20px;
}

.input-comment-box {
  display: flex;
  box-sizing: border-box;
  /* align-items: flex-end; */
  justify-content: space-between;
}

.input-comment-box > button {
  width: 10%;
}
.input-comment {
  display: flex;
  width: 100%;
}

.comment-list {
  margin-top: 10px;
}

.user-profile {
  border-radius: 70%;
  border: 1px solid black;
  width: 2em;
  height: 2em;
  margin-right: 10px;
}

.input-comment > input {
  padding: 10px;
  width: 95%;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-size: 16px;
}

.user {
  padding: 5px 10px;
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 1px solid gray;
}
.ellipsis-vertical {
  position: absolute;
  transform: translate(-50%, -50%);
  right: 1em;
  top: 50%;
  cursor: pointer;
}
.comment-menu {
  position: absolute;
  transform: translate(-50%, -50%);
  display: none;
  right: -0.5em;
  top: 110%;
  padding: 5px;
  border-radius: 10%;
  background-color: rgb(209, 208, 208);
}

.edit-btn,
.cencel-btn,
.pen,
.trash-can {
  cursor: pointer;
}
.pen {
  margin-right: 10px;
  color: dodgerblue;
}

.trash-can {
  color: tomato;
}
.comment-box {
  border: 1px solid black;
  display: flex;
  min-height: 160.5px;
  flex-direction: column;
  margin-top: 10px;
}
.comment-content {
  padding: 20px;
  /* border: 1px solid black; */
}

.edit-commnt-box {
  /* border: 1px solid black; */
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  display: none;
}
.edit-comment {
  width: 100%;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  box-sizing: border-box;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.edit-comment::-webkit-scrollbar {
  display: none; /* chrome */
}
.edit-btn-box {
  display: flex;
  justify-content: end;
  padding: 5px;
}
.edit-btn,
.cencel-btn {
  font-size: 20px;
  margin-left: 1em;
}

.edit-btn {
  color: dodgerblue;
}

.cencel-btn {
  color: tomato;
}
.comment-like {
  padding: 10px 20px 10px 20px;
}

.comment-like-btn {
  font-size: 23px;
}
</style>
