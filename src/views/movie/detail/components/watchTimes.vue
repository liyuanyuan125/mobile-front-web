<template>
  <div class="watchtimes" v-if="viewData.data.length || wantSeeData.data.length">
    <div v-if="hasShowTime">
      <div class="tit">
        <h3>近7日观影人次</h3>
        <span>{{viewData.showDate}}</span>
      </div>
      <div style="margin-top:20px">
        <LineGraph :dataOption="viewDataTrend" />
      </div>
    </div>
    <div v-if="!hasShowTime">
      <div class="tit">
        <h3>近7日想看人次</h3>
        <span>{{wantSeeData.showDate}}</span>
      </div>
      <div style="margin-top:20px">
        <LineGraph :dataOption="wantSeeDataTrend" />
      </div>
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
  @Prop({ type: Object }) viewData: any
  @Prop({ type: Object }) wantSeeData: any
  @Prop({ type: Boolean }) hasShowTime!: boolean

  viewDataTrend: any = null
  wantSeeDataTrend: any = null

  created() {
    this.formatViewData()
    this.formatWantSeeData()
  }

  // 处理观影人次
  formatViewData() {
    const xData = []
    const yData = []
    const trend = this.viewData.data
    if (trend && trend.length) {
      for (const item of this.viewData.data) {
        xData.push(item.date)
        yData.push(item.value)
      }
      this.viewDataTrend = {
        xData,
        yData,
        title: '观影人次',
        unit: this.viewData.dataUnit,
        type: 2 // 区分是否是金额还是人次 1是钱 2是人
      }
    }
  }

  // 处理想看人次
  formatWantSeeData() {
    const xData = []
    const yData = []
    const trend = this.wantSeeData.data
    if (trend && trend.length) {
      for (const item of this.wantSeeData.data) {
        xData.push(item.date)
        yData.push(item.value)
      }
      this.wantSeeDataTrend = {
        xData,
        yData,
        title: '想看人次',
        unit: this.wantSeeData.dataUnit,
        type: 2
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
