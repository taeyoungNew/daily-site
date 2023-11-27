<template>
  <div class="container">
    <signup-component></signup-component>
  </div>
</template>

<script>
import SignupComponent from "@/components/SignupComponent.vue";
export default {
  components: { SignupComponent },
};
</script>

<style scoped>
@import url(../assets/css/container.css);
</style>
