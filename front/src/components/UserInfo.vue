<template>
  <div class="info-box">
    <div>
      <label class="info-title" for="">자기소개 : </label>
      <label class="info-title edit-aboutMe" for="">자기소개 : </label>
      <input type="text" />
      <font-awesome-icon
        @click="editInfo(`abouMe`)"
        class="info-edit-icon"
        icon="fa-solid fa-pen"
      />
    </div>
    <br />
    <div>
      <label class="info-title" for="">MBTI : {{ this.mbti }}</label>
      <font-awesome-icon
        @click="editInfo(`mbti`)"
        class="info-edit-icon"
        icon="fa-solid fa-pen"
      />
    </div>
    <br />
    <div>
      <label class="info-title" for="">취미 : {{ this.hobby }}</label>
      <font-awesome-icon
        @click="editInfo(`hobby`)"
        class="info-edit-icon"
        icon="fa-solid fa-pen"
      />
    </div>
    <br />
    <div>
      <label class="info-title" for="">음식 : {{ this.food }}</label>
      <font-awesome-icon
        @click="editInfo(`food`)"
        class="info-edit-icon"
        icon="fa-solid fa-pen"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutMe: "",
      mbti: "",
      hobby: "",
      food: "",
    };
  },
  methods: {
    editInfo(param) {
      console.log(param);
    },
  },
  computed: {
    getUserInfo() {
      // console.log(this.$store.getters["authStore/GET_USER_INFO"]);
      return this.$store.getters["authStore/GET_USER_INFO"];
    },
  },
  watch: {
    getUserInfo(params) {
      this.aboutMe = params.userAboutMe || "";
      this.mbti = params.userMbit || "";
      this.hobby = params.userHobby || "";
      this.food = params.userFood || "";
    },
  },
};
</script>

<style scoped>
.info-box {
  border: 1px solid black;
  padding: 20px;
  box-sizing: border-box;
  /* max-width: 100px; */
}

.info-box > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-title {
  font-size: 20px;
}

.info-edit-icon {
  left: 0;
}
</style>
