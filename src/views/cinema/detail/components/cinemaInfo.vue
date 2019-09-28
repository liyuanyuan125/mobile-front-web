<template>
  <div class="cinemainfo">
    <h2>大地影城望京新天地店</h2>
    <p class="address">朝阳区阜通西大街11号合生麒麟新天地2层</p>
    <div>
      ￥
      <b>100</b>
      <span>￥200</span>
      <span>/千次曝光</span>
      <em>5折特惠</em>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class CinemaInfo extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
