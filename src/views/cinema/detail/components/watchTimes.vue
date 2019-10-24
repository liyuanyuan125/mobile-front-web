<template>
  <div class="watchtimes">
    <div class="tit">
      <h3>近15日观影人次</h3>
      <span>{{cinemaTrend.showDate}}</span>
    </div>
    <div style="margin-top:20px">
      <LineGraph :dataOption="viewDataTrend" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import LineGraph from '@/components/charts/lineGraph.vue'

@Component({
  components: {
    LineGraph
  }
})
export default class WatchTimes extends ViewBase {
  @Prop({ type: Object }) cinemaTrend: any

  viewDataTrend: any = null

  created() {
    this.formatViewData()
  }

  // 处理观影人次
  formatViewData() {
    const xData = []
    const yData = []
    const trend = this.cinemaTrend.data
    if (trend && trend.length) {
      for (const item of this.cinemaTrend.data) {
        xData.push(item.date)
        yData.push(item.value)
      }
      this.viewDataTrend = {
        xData,
        yData,
        title: '观影人次',
        unit: this.cinemaTrend.dataUnit,
        type: 2 // 区分是否是金额还是人次 1是钱 2是人
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
