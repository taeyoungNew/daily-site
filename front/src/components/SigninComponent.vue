<template>
  <div class="signin-container">
    <h1>로그인</h1>
    <form class="signin-form" action="">
      <input placeholder="email" type="text" />
      <input placeholder="password" type="text" />
      <input value="Sign in" type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
.signin-container {
  border: 1px solid black;
  width: 500px;
  position: absolute;
  translate: -50% -60%;
  top: 50%;
  left: 50%;
  height: 400px;
  padding: 25px;
  box-sizing: border-box;
}
.signin-form {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h1 {
  text-align: center;
}
input {
  height: 40px;
  font-size: 20px;
  padding: 4px;
}
</style>
