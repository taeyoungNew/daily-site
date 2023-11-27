<template>
  <nav v-if="isSigngin" class="header-container">
    <h1>로고</h1>
    <ul id="header-menu" class="header-menu">
      <li>
        <font-awesome-icon class="menu-icon" :icon="['fas', 'users']" />
      </li>
      <li>
        <font-awesome-icon class="menu-icon" :icon="['far', 'message']" />
      </li>
      <li>
        <font-awesome-icon class="menu-icon" :icon="['far', 'bell']" />
      </li>
      <li>
        <div class="user-icon" @click="myPage"></div>
      </li>
    </ul>
  </nav>
  <nav v-else class="header-container">
    <router-link to="/">
      <h1>로고</h1>
    </router-link>
    <ul id="non-login-menu" class="non-login-menu">
      <li>
        <router-link to="/signin">Sign in</router-link>
      </li>
      <li>
        <router-link to="/signup">Sign up</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isSigngin: false,
    };
  },
  methods: {
    myPage() {
      this.$router.push("/myPage");
    },
  },
  computed: {
    isSignin() {
      return this.$store.state.authStore.userEmail;
    },
  },
  watch: {
    isSignin() {
      this.isSigngin = !this.isSigngin;
    },
  },
};
</script>

<style scopd>
.header-container {
  border: 1px solid black;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  padding-left: 30px;
}
.header-menu,
.non-login-menu {
  display: flex;
  list-style: none;
  width: 20%;
  padding: 0;
  align-items: center;
}
.header-menu {
  justify-content: space-between;
}

.menu-icon,
.user-icon {
  cursor: pointer;
}
.menu-icon {
  font-size: 37px;
}
.user-icon {
  border: 1px solid black;
  border-radius: 70%;
  width: 37px;
  height: 37px;
}

.non-login-menu {
  width: 10%;
  justify-content: space-between;
}
</style>
