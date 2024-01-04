<template>
  <div class="info-box">
    <div>
      <div class="edit-box" v-if="editAboutMe">
        <!-- <label class="info-title edit-aboutMe" for="">자기소개 : </label> -->
        <textarea
          maxlength="255"
          placeholder="자기소개"
          id="new-about-me"
          class="input-box"
          type="text"
        />
        <font-awesome-icon
          @click="modifyAboutMe()"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
      <div v-else>
        <label class="info-title" for="">자기소개 : </label>
        {{ aboutMe }}
        <font-awesome-icon
          @click="editInfo(`abouMe`)"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
    </div>
    <br />
    <div>
      <div class="edit-box" v-if="editMbti">
        <input placeholder="MBTI" id="new-mbti" class="input-box" type="text" />
        <font-awesome-icon
          @click="modifyMbti(`mbti`)"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
      <div v-else>
        <label class="info-title" for="">MBTI : </label>
        {{ mbti }}
        <font-awesome-icon
          @click="editInfo(`mbti`)"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
    </div>
    <br />
    <div>
      <div class="edit-box" v-if="editHobby">
        <input
          placeholder="취미"
          id="new-hobby"
          class="input-box"
          type="text"
        />
        <font-awesome-icon
          @click="modifyHobby(`hobby`)"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
      <div v-else>
        <label class="info-title" for="">취미 : </label>
        {{ hobby }}
        <font-awesome-icon
          @click="editInfo(`hobby`)"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
    </div>
    <br />
    <div>
      <div class="edit-box" v-if="editFood">
        <input placeholder="음식" id="new-food" class="input-box" type="text" />
        <font-awesome-icon
          @click="modifyFood(`food`)"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
      <div v-else>
        <label class="info-title" for="">음식 : </label>
        {{ food }}
        <font-awesome-icon
          @click="editInfo(`food`)"
          class="info-edit-icon"
          icon="fa-solid fa-pen"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutMe: this.$store.state.authStore.userAboutMe,
      mbti: this.$store.state.authStore.userMbti,
      hobby: this.$store.state.authStore.userHobby,
      food: this.$store.state.authStore.userFood,
      editAboutMe: false,
      editMbti: false,
      editHobby: false,
      editFood: false,
    };
  },
  methods: {
    async loadMyInfo() {
      try {
        await this.$store.dispatch("authStore/LOAD_MY_INFO");
      } catch (error) {
        console.log(error);
      }
    },
    editInfo(param) {
      if (param === "abouMe") {
        this.editAboutMe = !this.editAboutMe;
      } else if (param === "mbti") {
        this.editMbti = !this.editMbti;
      } else if (param === "hobby") {
        this.editHobby = !this.editHobby;
      } else {
        this.editFood = !this.editFood;
      }
    },
    async modifyAboutMe() {
      const newAboutMe = document.getElementById("new-about-me").value;
      try {
        await this.$store.dispatch("authStore/MODIFY_ABOUTME", newAboutMe);
        this.editAboutMe = !this.editAboutMe;
      } catch (error) {
        console.log(error);
      }
    },
    async modifyMbti() {
      const newMbti = document.getElementById("new-mbti").value;
      try {
        await this.$store.dispatch("authStore/MODIFY_MBTI", newMbti);
        this.editMbti = !this.editMbti;
      } catch (error) {
        console.log(error);
      }
    },
    async modifyHobby() {
      const newHobby = document.getElementById("new-hobby").value;
      try {
        await this.$store.dispatch("authStore/MODIFY_HOBBY", newHobby);
        this.editHobby = !this.editHobby;
      } catch (error) {
        console.log(error);
      }
    },
    async modifyFood() {
      const newFood = document.getElementById("new-food").value;
      try {
        await this.$store.dispatch("authStore/MODIFY_FOOD", newFood);
        this.editFood = !this.editFood;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.loadMyInfo();
  },
  computed: {
    getUserInfo() {
      return this.$store.getters["authStore/GET_USER_INFO"];
    },
  },
  watch: {
    getUserInfo(params) {
      console.log("getUserInfo(params)=", params);
      this.aboutMe = params.userAboutMe || "";
      this.mbti = params.userMbti || "";
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

.edit-box {
  display: flex;
}

.info-box > div {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
}

.info-title {
  font-size: 20px;
}
.input-box {
  border: none;
  border-bottom: 1px solid gray;
  width: auto;
  max-width: 12em;
  font-size: 16px;
}
.input-box:focus {
  outline: none;
}

.info-edit-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
