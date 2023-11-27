<template>
  <AppHeader />
  <router-view />
</template>

<script>
import AppHeader from "./components/common/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<style>
@import "../src/assets/css/reset.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  max-width: 1500px;
  margin: 0;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
