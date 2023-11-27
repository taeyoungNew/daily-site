<template>
  <div class="info-box">
    <div>
      <label class="info-title" for="">자기소개 : </label>
    </div>
    <br />
    <div>
      <label class="info-title" for="">MBTI : </label>
    </div>
    <br />
    <div>
      <label class="info-title" for="">취미 : </label>
    </div>
    <br />
    <div>
      <label class="info-title" for="">음식 : </label>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.info-box {
  border: 1px solid black;
  padding: 20px;
  box-sizing: border-box;
}

.info-box > div {
  display: flex;
  align-items: center;
}

.info-title {
  font-size: 20px;
}
</style>
