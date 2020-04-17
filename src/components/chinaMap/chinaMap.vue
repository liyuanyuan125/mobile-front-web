<template>
  <div class="china-map">
    <ECharts :options="chartData" autoresize class="the-chart"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ChinaMapItem } from './types'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/tooltip'

import { cssifyObject } from 'css-in-js-utils'
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

  @Prop({ type: String, default: '%' }) unit!: string

  /** 最小值 */
  @Prop({ type: Number, default: 0 }) minValue!: number

  /** 最大值 */
  @Prop({ type: Number, default: 100 }) maxValue!: number

  /** 省份边框颜色 */
  @Prop({ type: String, default: '#fff' }) borderColor!: string

  /** 高亮状态下的地图区域块颜色 */
  @Prop({ type: String, default: '#ffcb84' }) emphasisAreaColor!: string

  /** 颜色列表，从浅色到深色变化，最小包含 2 种颜色 */
  @Prop({
    type: Array,
    default: () => [ '#f1f5ff', '#d7e2ff', '#a3bdfd', '#598cfe', '#4763c6' ]
  }) colorRange!: string[]

  @Prop({ type: String, default: '#2e2f5a' }) tooltipValueColor!: string

  @Prop({ type: String, default: '#8798af' }) tooltipNameColor!: string

  @Prop({ type: Number, default: 1 }) digits!: number

  get chartData() {
    const result: any = {
      tooltip: {
        trigger: 'item',
        position: 'top',
        formatter: (params: any) => {
          const { name, value, color } = params

          if (value == null || value == 0 || isNaN(value)) {
            return null
          }

          const valueShow = `${value.toFixed(this.digits)}${this.unit}`
          const valueColor = this.tooltipValueColor
          const nameColor = this.tooltipNameColor
          const html = `
            <div class="tooltip-box">
              <div class="tooltip-value" style="color: ${valueColor}">
                <i class="tooltip-dot" style="background-color: ${color}"></i>
                ${valueShow}
              </div>
              <div class="tooltip-name" style="color: ${nameColor}">${name}</p>
            </div>
          `
          return html.trim()
        },
        backgroundColor: '#fff',
        padding: [9, 12, 6, 8],
        extraCssText: cssifyObject({
          boxShadow: '0 2px 10px 1px rgba(212, 212, 212, .5)',
          borderRadius: '8px',
          zIndex: 38,
        }),
      },

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
          emphasis: {
            label: false,
            itemStyle: {
              areaColor: this.emphasisAreaColor
            }
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

  /deep/ .tooltip-box {
    position: relative;
    line-height: 32px;
    padding-left: 24px;
  }

  /deep/ .tooltip-value {
    font-size: 36px;
    font-weight: bold;
    font-family: DINAlternate-Bold, DINAlternate, sans-serif;
  }

  /deep/ .tooltip-dot {
    position: absolute;
    left: 4px;
    top: 10px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
  }

  /deep/ .tooltip-name {
    font-size: 22px;
  }
}

.the-chart {
  width: 100%;
  height: 100%;
}

</style>
