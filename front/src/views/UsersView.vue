<template>
  <div class="container">
    <div>
      <span>친구추천목록</span>
      <div class="user-list">
        <div class="user-card">
          <div class="img"></div>
          <div class="btn-box">
            <span class="follow-btn">팔로우</span>
          </div>
        </div>
        <div class="user-card">
          <div class="img"></div>
          <div class="btn-box">
            <span class="follow-btn">팔로우</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <hr /> -->
    <div>친구목록</div>
  </div>
</template>

<script>
export default {
  methods: {
    async getUsers() {
      try {
        await this.$store.dispatch("userStore/GET_RANDOM_USERS");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
@import url(../assets/css/container.css);
.user-list {
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.user-card {
  width: 200px;
  height: 350px;
  border: 1px solid black;
}

.user-card > .img {
  width: inherit;
  height: 80%;
  border-bottom: 1px solid black;
}

.user-card > .btn-box {
  position: relative;
  height: 20%;
}

.btn-box > .follow-btn {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
