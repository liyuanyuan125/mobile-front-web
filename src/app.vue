<template>
  <div class="app">
    <!--    <div class="nav">-->
    <!--      <router-link :to="{ name: 'home' }">Home</router-link> |-->
    <!--      <router-link :to="{ name: 'demo' }">Demo</router-link>-->
    <!--    </div>-->
    <router-view />
  </div>
</template>

<style lang="less">
@import url(~@/styles/main.less);
</style>

<style lang="less" scoped>
// .app {
//   margin: 28px auto;
// }
.nav {
  text-align: center;
}
</style>
