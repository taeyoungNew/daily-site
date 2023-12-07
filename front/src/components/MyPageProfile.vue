<template>
  <div class="profile-box">
    <div class="user-profile-img"></div>
    <div class="user-name">{{ myName }}</div>
    <font-awesome-icon icon="fa-regular fa-pen-to-square " class="edit-icon" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      myName: this.$store.state.authStore.userName,
    };
  },
};
</script>

<style scoped>
.profile-box {
  padding: 25px;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
}

.user-profile-img {
  border: 1px solid black;
  border-radius: 70%;
  width: 200px;
  height: 200px;
}

.user-name {
  font-size: 3em;
  margin: 0 20px 0 20px;
}

.edit-icon {
  font-size: 35px;
  cursor: pointer;
}
</style>
