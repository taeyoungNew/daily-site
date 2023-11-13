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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

body {
  max-width: 1500px;
  margin: 0;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
}

nav {
  /* padding: 30px; */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
