<template>
  <div class="viewpage">
    <div class="viewer">
      <TopBar />
      <CinemaInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopBar from '@/components/topBar'
import CinemaInfo from './components/cinemaInfo.vue'

@Component({
  components: {
    TopBar,
    CinemaInfo
  }
})
export default class CinemaDetail extends Vue {}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
