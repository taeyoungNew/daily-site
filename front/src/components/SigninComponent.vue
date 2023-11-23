<template>
  <div class="signin-container">
    <h1 class="signin-title">로그인</h1>
    <form class="signin-form" @submit.prevent="signinForm" action="">
      <input placeholder="email" v-model="email" type="text" />
      <input placeholder="password" v-model="password" type="text" />
      <input class="signin-btn" value="Sign in" type="submit" />
    </form>
    <div class="option-box">
      <router-link to="/signup">Sign up</router-link>
      <!-- <router-link to="">forgot password?</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signinForm() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("authStore/SIGNIN_USER", payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    isSignin() {
      return this.$store.state.authStore.userEmail;
    },
  },
  watch: {
    isSignin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.signin-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
}

.signin-container {
  border: 1px solid black;
  width: 500px;
  /* height: 400px; */
  padding: 25px;
  box-sizing: border-box;
}
.signin-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.option-box {
  margin-top: 10px;
  text-align: center;
  /* position: absolute;
  transform: translate(-50%, -50%); */
  /* bottom: 10%;
  left: 50%; */
}
.signin-title {
  font-weight: bold;
  font-size: 30px;
}
.option-box > div {
  margin-bottom: 10px;
}
h1 {
  text-align: center;
}
input {
  margin-top: 20px;
  height: 40px;
  font-size: 20px;
  padding: 4px;
}
</style>
