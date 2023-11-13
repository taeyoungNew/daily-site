<template>
  <nav class="header-container">
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
        <div class="user-icon"></div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
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
.header-menu {
  display: flex;
  list-style: none;
  justify-content: space-between;
  width: 20%;
  padding: 0;
  align-items: center;
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
</style>
