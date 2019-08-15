<template>
  <div class="home">
    Home Page
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  margin-top: 88px;
}
</style>
