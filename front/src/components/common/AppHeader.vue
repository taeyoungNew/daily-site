<template>
  <nav v-if="isSignin" class="header-container">
    <router-link class="logo" to="/">
      <h1>일상스케치</h1>
    </router-link>
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
        <router-link to="/myPage">
          <div class="user-icon" @click="myPage"></div>
        </router-link>
      </li>
      <li>
        <font-awesome-icon
          @click="logout"
          class="menu-icon logout-btn"
          :icon="['fas', 'arrow-right-from-bracket']"
        />
      </li>
    </ul>
  </nav>
  <nav v-else class="header-container">
    <router-link class="logo" to="/">
      <h1>일상스케치</h1>
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
      isLogin: false,
    };
  },
  methods: {
    myPage() {
      this.$router.push("/myPage");
    },
    async logout() {
      await this.$store.dispatch("authStore/LOGOUT_USER");
    },
  },
  computed: {
    isSignin() {
      return this.$store.state.authStore.userEmail;
    },
  },
};
</script>

<style scopd>
.header-container {
  height: 55px;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  align-items: center;
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

.logout-btn {
  color: tomato;
}

.non-login-menu {
  width: 10%;
  justify-content: space-between;
}
.logo {
  font-size: 30px;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>
