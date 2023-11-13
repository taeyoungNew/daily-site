<template>
  <div class="container">
    <ShareDaily></ShareDaily>
  </div>
</template>

<script>
import ShareDaily from "../components/common/ShareDaily.vue";
export default {
  components: {
    ShareDaily,
  },
};
</script>

<style scoped>
.container {
  height: 100vw;
}
</style>
