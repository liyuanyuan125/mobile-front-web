<template>
  <div class="datatrend">
    <div class="tit">
      <h3>数据趋势</h3>
      <span>{{dataTrend.showDate}}</span>
    </div>
    <ul class="tabindex">
      <li class="active">
        <button>支付金额</button>
      </li>
      <li>
        <button>曝光人次</button>
      </li>
      <li>
        <button>曝光场次</button>
      </li>
    </ul>
    <div class="chartbox">
      <AreaBasic :dataOption="dataTrend.showCost" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import AreaBasic from '../echarts/dataTrend.vue'

@Component({
  components: {
    AreaBasic
  }
})
export default class DataTrend extends ViewBase {
  @Prop({ type: Object }) dataTrend!: any
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
