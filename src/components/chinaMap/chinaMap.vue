<template>
  <div class="china-map">
    <ECharts :options="chartData" auto-resize class="chart"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ChinaMapItem } from './types'

import ECharts from 'vue-echarts'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/chart/map'

import provinceData from './province'

ECharts.registerMap('china', provinceData)

@Component({
  components: {
    ECharts
  }
})
export default class ChinaMap extends Vue {
  /** 数据 */
  @Prop({ type: Array, default: () => [] }) data!: ChinaMapItem[]

  /** 最小值 */
  @Prop({ type: Number, default: 800 }) minValue!: number

  /** 最大值 */
  @Prop({ type: Number, default: 8000 }) maxValue!: number

  /** 省份边框颜色 */
  @Prop({ type: String, default: '#fff' }) borderColor!: string

  /** 颜色列表，从浅色到深色变化，最小包含 2 种颜色 */
  @Prop({
    type: Array,
    default: [ '#f1f5ff', '#d7e2ff', '#a3bdfd', '#598cfe', '#4763c6' ]
  }) colorRange!: string[]

  get chartData() {
    const result: any = {
      visualMap: {
        show: false,
        min: this.minValue,
        max: this.maxValue,
        inRange: {
          color: this.colorRange
        }
      },
      series: [
        {
          type: 'map',
          mapType: 'china',
          itemStyle: {
            areaColor: this.colorRange[0],
            borderColor: this.borderColor,
          },
          data: this.data
        }
      ]
    }
    return result
  }
}
</script>

<style lang="less" scoped>
.china-map {
  position: relative;
  width: 100%;
  height: 320px;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
