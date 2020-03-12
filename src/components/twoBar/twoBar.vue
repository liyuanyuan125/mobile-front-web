<template>
  <div class="two-bar">
    <ECharts :options="chartData" auto-resize class="the-chart"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'

import { TwoBarItem } from './types'

@Component({
  components: {
    ECharts
  }
})
export default class TwoBar extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: TwoBarItem[]

  get chartData() {
    const result: any = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // axisLine: false,
        // 两端加空串，是为了等宽分割
        data: [...this.data.map(it => it.name)],
        // axisLine: lineStyle,
        // axisTick: false,
        // axisLabel
      },

      yAxis: {
        type: 'value',
        axisLine: false,
        // splitLine: lineStyle,
        // axisLabel,
        splitNumber: 3
      },

      grid: false,

      // grid: {
      //   left: 42,
      //   right: 42,
      //   top: 20,
      //   bottom: 20,
      //   containLabel: true
      // },

      series: [
        {
          type: 'bar',
          data: [...this.data.map(it => it.rate)],
          barWidth: 20,
          itemStyle: {
            color: '#08b6ca',
            // barBorderRadius: [8, 8, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: '#ca7273'
            }
          }
        }
      ]
    }
    return result
  }
}
</script>

<style lang="less" scoped>
.two-bar {
  position: relative;
  width: 100%;
  height: 188px;
}
.the-chart {
  width: 100%;
  height: 100%;
}
</style>
