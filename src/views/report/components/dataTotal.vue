<template>
  <div class="datatotal">
    <dl>
      <dd>
        <div class="box">
          <i class="icocinema"></i>
          <strong>{{cinemaCount}}</strong>
          <p>覆盖影院</p>
        </div>
      </dd>
      <dd>
        <div class="box">
          <i class="icomovie"></i>
          <strong>{{movieCount}}</strong>
          <p>覆盖影片</p>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class DataTotal extends ViewBase {
  @Prop({ type: String, default: '0' }) cinemaCount!: string
  @Prop({ type: String, default: '0' }) movieCount!: string
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
