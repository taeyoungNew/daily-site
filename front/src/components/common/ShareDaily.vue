<template>
  <div class="share-container">
    <div class="input-box">
      <textarea
        v-model="dailyText"
        placeholder="나의 일상 공유하기"
        type="text"
      />
      <button @click="uploadDaliy">전송</button>
    </div>
    <div class="icon-box">
      <font-awesome-icon class="icon" icon="fa-regular fa-image" />
      <font-awesome-icon class="icon" :icon="['far', 'face-smile']" />
    </div>
  </div>
</template>

<script>
import PostApi from "@/api/post";
export default {
  data() {
    return {
      dailyText: "",
    };
  },
  methods: {
    async uploadDaliy() {
      const payload = {
        content: this.dailyText,
        img: "",
      };
      try {
        const postApi = new PostApi();
        await postApi.createPost(payload);
        alert("게시물이 생성되었습니다.");
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.share-container {
  box-sizing: border-box;
  border: 0.5px solid gray;
}

.input-box,
.icon-box {
  margin-right: auto;
  margin-left: auto;
  width: 90%;
  display: flex;
}
.input-box {
  justify-content: space-evenly;
  margin-top: 30px;
}

.icon-box {
  display: flex;
  padding: 10px 0 15px 0;
  /* border: 1px solid black; */
}

.input-box > textarea {
  resize: vertical;
  height: 2em;
  max-height: 15em;
  font-size: 17px;
  width: 90%;
  border: none;
  border-bottom: 1px solid gray;
}

.input-box > button {
  border: 0.7px solid gray;
  border-radius: 70%;
  width: 3.4em;
  height: 3.4em;
  cursor: pointer;
  color: rgb(46, 46, 46);
  background-color: white;
}

.icon {
  font-size: 2em;
  cursor: pointer;
  margin-left: 0.6em;
}
</style>
