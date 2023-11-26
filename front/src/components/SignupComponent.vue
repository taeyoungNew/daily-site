<template>
  <div class="signup-container">
    <h1 class="signup-title">회원가입</h1>
    <form class="signup-form" @submit.prevent="signupForm" action="">
      <input v-model="email" placeholder="email" type="text" />
      <label for="">*필수</label>
      <input v-model="password" placeholder="password" type="text" />
      <label for="">*필수</label>
      <input
        v-model="passwordConfirm"
        placeholder="password confirm"
        type="text"
      />
      <label for="">*필수</label>
      <input v-model="name" placeholder="name" type="text" />
      <label for="">*필수</label>
      <input v-model="address" placeholder="address" type="text" />
      <input v-model="hobby" placeholder="hobby" type="text" />
      <input v-model="mbti" placeholder="mbti" type="text" />
      <input v-model="food" placeholder="food" type="text" />
      <input v-model="age" placeholder="age" type="text" />
      <input class="signup-btn" value="Sign up" type="submit" />
    </form>
  </div>
</template>

<script>
import UserApi from "@/api/user";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      profileImg: "",
      name: "",
      address: "",
      hobby: "",
      mbti: "",
      food: "",
      age: "",
    };
  },
  methods: {
    async signupForm() {
      const userApi = new UserApi();
      const payload = {
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        profileImg: this.profileImg,
        name: this.name,
        address: this.address,
        hobby: this.hobby,
        mbti: this.mbti,
        food: this.food,
        age: this.age,
      };
      try {
        const result = await userApi.signup(payload);
        console.log(result);
        this.$router.push("/signin");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
}
.signup-container {
  border: 1px solid black;
  width: 500px;
  padding: 25px;
  box-sizing: border-box;
}

.signup-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.signup-title {
  font-weight: bold;
  font-size: 30px;
}
h1 {
  text-align: center;
}
input {
  height: 40px;
  font-size: 20px;
  padding: 4px;
  margin-top: 20px;
}

label {
  color: tomato;
  margin-top: 5px;
}
</style>
