<template>
  <div class="signup-container">
    <h1 class="signup-title">회원가입</h1>
    <form class="signup-form" action="">
      <input placeholder="email" type="text" />
      <label for="">*필수</label>
      <input placeholder="password" type="text" />
      <label for="">*필수</label>
      <input placeholder="password confirm" type="text" />
      <label for="">*필수</label>
      <input placeholder="nickname" type="text" />
      <label for="">*필수</label>
      <input placeholder="address" type="text" />
      <input placeholder="hobby" type="text" />
      <input placeholder="mbti" type="text" />
      <input placeholder="food" type="text" />
      <input placeholder="age" type="text" />
      <input class="signup-btn" value="Sign up" type="submit" />
    </form>
  </div>
</template>

<script>
export default {};
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
