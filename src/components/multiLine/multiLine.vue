<template>
  <div class="multi-line" ref="box">
    <ECharts :options="chartData" auto-resize class="the-chart" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

import { MultiLineItem, MultiLineTooltipFormatTitle, MultiLineEvents } from './types'
import { cssifyObject } from 'css-in-js-utils'
import { toThousands } from '@/util/dealData'

@Component({
  components: {
    ECharts
  }
})
export default class MultiLine extends Vue {
  /** 数据项名称列表 */
  @Prop({ type: Array, default: () => [] }) names!: string[]

  @Prop({ type: Array, default: () => [] }) data!: MultiLineItem[]

  @Prop({ type: Boolean, default: false }) smooth!: boolean

  @Prop({
    type: Function,
    default: ({ list }: any) => {
      const { name, data } = list[0]
      return data && data.tooltipTitle || name || ''
    }
  })
  tooltipFormatTitle!: MultiLineTooltipFormatTitle

  @Prop({ type: Object, default: () => ({}) }) events!: MultiLineEvents

  @Prop({ type: String, default: '#303030' }) tooltipNameColor!: string

  @Prop({ type: String, default: '#47403b' }) tooltipTitleColor!: string

  @Prop({ type: String, default: 'rgba(71, 64, 59, .6)' }) axisLabelColor!: string

  get chartData() {
    const series = this.data.map(({ name, data, color }) => {
      const line: any = {
        name,
        type: 'line',
        smooth: this.smooth,
        data,
        connectNulls: true
      }
      color && (line.itemStyle = { color })
      return line
    })

    const result: any = {
      tooltip: {
        trigger: 'axis',
        formatter: (list: any[]) => {
          const title = this.tooltipFormatTitle({ list })
          const titleColor = this.tooltipTitleColor
          const nameColor = this.tooltipNameColor
          const listHtml = list.map(({ seriesName, name, value, color }) => {
            const valueColor = color || nameColor
            const valueShow = value != null ? toThousands(value) : '暂无数据'
            const itemHtml = `
              <p class="tooltip-item">
                <i class="tooltip-dot" style="background-color: ${color}"></i>
                <span class="tooltip-name" style="color: ${nameColor}">${seriesName}</span>
                <span class="tooltip-value" style="color: ${valueColor}">${valueShow}</span>
              </p>
            `
            return itemHtml.trim()
          })
          const ename = list[0].name
          const event = this.events[ename]
          const eventHtml = event
            ? `<div class="tooltip-event" data-tooltip-event-name="${ename}">${event.name}</div>`
            : ''
          const html = `
            <div class="tooltip-box">
              <div class="tooltip-title" style="color: ${titleColor}">${title}</div>
              ${listHtml}
              ${eventHtml}
            </div>
          `
          return html.trim()
        },
        backgroundColor: '#fff',
        padding: 0,
        extraCssText: cssifyObject({
          border: '2px solid rgba(48, 48, 48, .1)',
          borderRadius: '6px',
        }),
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.names,
        axisLabel: {
          color: this.axisLabelColor,
          // 切换的时候无法工作
          // interval: dataCount < 8 ? 0 : 'auto',
        },
        axisTick: false,
        axisLine: {
          lineStyle: {
            color: '#c2c6d8',
          }
        },
      },

      yAxis: {
        type: 'value',
        splitNumber: 4,
        axisTick: false,
        axisLabel: {
          formatter: `{value}`,
          color: this.axisLabelColor,
        },
        axisLine: {
          lineStyle: {
            color: '#c2c6d8',
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: 'rgba(48, 48, 48, .2)',
          }
        }
      },

      grid: {
        left: 0,
        right: 20,
        top: 10,
        bottom: 0,
        containLabel: true
      },

      series
    }
    return result
  }

  mounted() {
    const box = this.$refs.box as HTMLDivElement
    ['click', 'touchstart'].forEach(name => {
      box.addEventListener(name, ev => {
        const el = ev.target as HTMLDivElement
        const ename = el && el.dataset.tooltipEventName
        const events = this.events
        if (ename && ename in events) {
          ev.preventDefault()
          const event = events[ename]
          const click = event.click
          click && click({ id: event.id, name: event.name })
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.multi-line {
  position: relative;
  width: 100%;
  height: 388px;

  /deep/ .tooltip-box {
    position: relative;
    line-height: 1;
    font-size: 22px;
    padding: 18px 20px 26px;
  }

  /deep/ .tooltip-title {
    margin-bottom: 16px;
  }

  /deep/ .tooltip-item {
    display: flex;
    font-weight: 500;
    font-family: SanFranciscoDisplay-Semibold, SanFranciscoDisplay, serif;
  }

  /deep/ .tooltip-dot {
    position: relative;
    display: inline-block;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    margin-right: 10px;
  }

  /deep/ .tooltip-name {
    flex: 1;
    min-width: 8em;
  }

  // /deep/ .tooltip-value {
  // }

  /deep/ .tooltip-event {
    max-width: 300px;
    word-wrap: nowrap;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #88aaf6;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 22px;
  }

  /deep/ [style*=pointer-events] {
    pointer-events: all !important;
  }
}

.the-chart {
  width: 100%;
  height: 100%;
}
</style>
