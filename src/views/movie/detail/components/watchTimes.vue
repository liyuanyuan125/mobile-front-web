<template>
  <div class="watchtimes">
    <div class="tit">
      <h3>近7日观影人次</h3>
      <span>09-17 至 09-23</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class WatchTimes extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
