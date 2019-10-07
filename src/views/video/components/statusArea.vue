<template>
  <!-- 状态区 -->
  <div class="statusarea">
    <i class="reBack" title="返回"></i>
    <b class="kefu" title="客服"></b>
    <h4 class="status">待审核</h4>
    <p class="desc">平台审核广告中…</p>
    <div class="but">
      <button>编辑</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class StatusArea extends ViewBase {
  @Prop({ type: Object }) progress!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
