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

          const valueShow = `${value}${this.unit}`
          const boxStyle = cssifyObject({
            position: 'relative',
            lineHeight: '16px',
            paddingLeft: '12px'
          })
          const valueStyle = cssifyObject({
            color: this.tooltipValueColor,
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: 'DINAlternate-Bold, DINAlternate'
          })
          const dotStyle = cssifyObject({
            position: 'absolute',
            left: '2px',
            top: '5px',
            width: '6px',
            height: '6px',
            borderRadius: '100%',
            backgroundColor: color,
          })
          const nameStyle = cssifyObject({
            color: this.tooltipNameColor,
            fontSize: '11px',
          })
          const html = `
            <div style="${boxStyle}">
              <p style="${valueStyle}">
                <i style="${dotStyle}"></i>
                ${valueShow}
              </p>
              <p style="${nameStyle}">${name}</p>
            </div>
          `
          return html.trim()
        },
        backgroundColor: '#fff',
        padding: [9, 12, 6, 8],
        extraCssText: cssifyObject({
          boxShadow: '0 2px 10px 1px rgba(212, 212, 212, .5)',
          borderRadius: '8px',
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
}
.the-chart {
  width: 100%;
  height: 100%;
}
</style>
