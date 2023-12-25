<template>
  <div class="comment-container">
    <div class="input-comment-box">
      <div class="user-profile"></div>
      <input type="text" />
      <button>댓글달기</button>
    </div>
    <div class="comment-list">
      <div class="comment-box">
        <div class="user-profile"></div>
        <div class="comment-content">
          <div class="">유저이름</div>
          <div class="">댓글내용</div>
          <div>댓글 좋아요</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.comment-container {
  padding: 20px;
}

.input-comment-box {
  display: flex;
  box-sizing: border-box;
  align-items: flex-end;
  justify-content: space-between;
}

.user-profile {
  border-radius: 70%;
  border: 1px solid black;
  width: 2em;
  height: 2em;
}

.input-comment-box > input {
  width: 85%;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-size: 16px;
}

.comment-box {
  border: 1px solid black;
  display: flex;
}
</style>
