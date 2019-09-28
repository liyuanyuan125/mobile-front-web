<template>
  <div class="datatotal">
    <dl>
      <dd>
        <div class="box">
          <i class="icocinema"></i>
          <strong>26</strong>
          <p>覆盖影院</p>
        </div>
      </dd>
      <dd>
        <div class="box">
          <i class="icomovie"></i>
          <strong>11</strong>
          <p>覆盖影片</p>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class DataTotal extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
