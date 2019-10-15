<template>
  <!-- 状态区 -->
  <div class="statusarea">
    <i class="reBack" title="返回"></i>
    <b class="kefu" title="客服"></b>
    <h4 class="status">
      <i v-if="statusInfo.adVideoStatus=='4'" class="succ"></i>
      <i v-if="statusInfo.adVideoStatus==5" class="fail"></i>
      {{statusInfo.adVideoStatusShow}}
    </h4>
    <p class="desc">{{statusInfo.adVideoStatusDesc}}</p>
    <div class="but" v-if="statusInfo.hasCanEdit">
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
  @Prop({ type: Object }) statusInfo!: any

  statusTit = ''
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
