<template>
  <div class="vertical-bar">
    <ECharts
      :options="chartData"
      autoresize
      @finished="handleFinished"
      @mouseover="handleMouseOver"
      class="the-chart"
      ref="chart"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import { VerticalBarItem } from './types'
import { cssifyObject } from 'css-in-js-utils'
import { maxBy } from 'lodash'

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

  /** 是否禁止自动高亮最大值，默认是自动高亮行为 */
  @Prop({ type: Boolean, default: false }) disableAutoHighlightMaxValue!: boolean

  @Prop({ type: Number, default: 1 }) digits!: number

  get chart() {
    const chart = this.$refs.chart as any
    return chart
  }

  get chartData() {
    const result: any = {
      tooltip: {
        trigger: 'item',
        position: 'top',
        formatter: (params: any) => {
          const { name, value } = params
          const valueShow = `${value.toFixed(this.digits)}${this.unit}`
          const valueColor = this.tooltipValueColor
          const dotColor = this.hiColor
          const nameColor = this.tooltipNameColor
          const html = `
            <div class="tooltip-box">
              <div class="tooltip-value" style="color: ${valueColor}">
                <i class="tooltip-dot" style="background-color: ${dotColor}"></i>
                ${valueShow}
              </div>
              <div class="tooltip-name" style="color: ${nameColor}">${name}</div>
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
        left: 5,
        right: 5,
        top: 10,
        bottom: 5,
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

  get maxValueIndex() {
    const item = maxBy(this.data, 'value')
    const index = this.data.findIndex(it => it === item)
    return index
  }

  firstHighlight = false

  handleFinished() {
    if (!this.firstHighlight && !this.disableAutoHighlightMaxValue) {
      this.firstHighlight = true
      const index = this.maxValueIndex
      this.highlight(index)
      this.showTip(index)
    }
  }

  handleMouseOver({ dataIndex }: any) {
    if (dataIndex != this.maxValueIndex) {
      this.highlight(this.maxValueIndex, false)
    }
  }

  highlight(dataIndex: number, enable = true) {
    this.chart.dispatchAction({
      type: enable ? 'highlight' : 'downplay',
      seriesIndex: 0,
      dataIndex,
    })
  }

  showTip(dataIndex: number, enable = true) {
    this.chart.dispatchAction({
      type: enable ? 'showTip' : 'hideTip',
      seriesIndex: 0,
      dataIndex,
    })
  }
}
</script>

<style lang="less" scoped>
.vertical-bar {
  position: relative;
  width: 100%;
  height: 388px;

  /deep/ .tooltip-box {
    position: relative;
    line-height: 32px;
    padding-left: 24px;
  }

  /deep/ .tooltip-dot {
    position: absolute;
    left: 4px;
    top: 10px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
  }

  /deep/ .tooltip-value {
    font-size: 36px;
    font-weight: bold;
    font-family: DINAlternate-Bold, DINAlternate, sans-serif;
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
