<template>
  <div class="vertical-bar">
    <ECharts :options="chartData" auto-resize class="the-chart" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

import { VerticalBarItem } from './types'

import { cssifyObject } from 'css-in-js-utils'

@Component({
  components: {
    ECharts
  }
})
export default class VerticalBar extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: VerticalBarItem[]

  @Prop({ type: String, default: '%' }) unit!: string

  /** 默认的 bar 颜色 */
  @Prop({ type: String, default: 'rgba(122, 160, 245, .4)' }) color!: string

  /** 是否隐藏 X 坐标轴 */
  @Prop({ type: Boolean, default: false }) hideX!: boolean

  /** 是否隐藏 Y 坐标轴 */
  @Prop({ type: Boolean, default: false }) hideY!: boolean

  /** 高亮的（选中的）bar 颜色 */
  @Prop({ type: String, default: '#7ca4ff' }) hiColor!: string

  @Prop({ type: String, default: '#2e2f5a' }) tooltipValueColor!: string

  @Prop({ type: String, default: '#8798af' }) tooltipNameColor!: string

  @Prop({ type: String, default: '#8798af' }) axisLabelColor!: string

  get chartData() {
    const result: any = {
      tooltip: {
        trigger: 'item',
        position: 'top',
        formatter: (params: any) => {
          const { name, value } = params
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
            backgroundColor: this.hiColor,
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

      xAxis: {
        show: !this.hideX,
        type: 'category',
        data: [...this.data.map(it => it.name)],
        axisLabel: {
          color: this.axisLabelColor,
          interval: 0,
        },
        axisTick: false,
        axisLine: {
          lineStyle: {
            color: '#c2c6d8',
          }
        },
      },

      yAxis: {
        show: !this.hideY,
        type: 'value',
        splitNumber: 3,
        axisTick: false,
        axisLabel: {
          formatter: `{value}${this.unit}`,
          color: this.axisLabelColor,
        },
        axisLine: {
          lineStyle: {
            width: 0
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#c2c6d8',
          }
        }
      },

      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
        containLabel: true
      },

      series: [
        {
          type: 'bar',
          data: [...this.data.map(it => it.value)],
          barWidth: 20,
          itemStyle: {
            color: this.color
          },
          emphasis: {
            itemStyle: {
              color: this.hiColor
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
.vertical-bar {
  position: relative;
  width: 100%;
  height: 388px;
}
.the-chart {
  width: 100%;
  height: 100%;
}
</style>
