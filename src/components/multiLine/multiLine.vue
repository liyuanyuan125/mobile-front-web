<template>
  <div class="multi-line" ref="box">
    <div class="chart-wrap">
      <ECharts
        :options="chartData"
        autoresize
        class="the-chart"
        ref="chart"
      />
    </div>

    <div class="legend-box" v-if="showLegend">
      <ul class="legend-list">
        <li
          v-for="{ name, color } in data"
          :key="name"
          class="legend-item"
          :class="{ 'legend-item-off': !!legendDisabledMap[name] }"
          @click="toggleLegend(name)"
        >
          <i :style="{ backgroundColor: color || '#ccc' }"></i>
          <em class="van-ellipsis">{{name}}</em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

import { MultiLineItem, MultiLineTooltipFormatTitle, MultiLineEvents } from './types'
import { cssifyObject } from 'css-in-js-utils'
import { readableNumber } from '@/util/dealData'
import { MapType } from '@/util/types'
import { toast } from '@/util/toast'

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

  /** 是否显示图例 */
  @Prop({ type: Boolean, default: false }) showLegend!: boolean

  get chart() {
    const chart = this.$refs.chart as any
    return chart
  }

  legendDisabledMap: MapType<boolean> = {}

  get legendEnabledCount() {
    const list = this.data.filter(({ name }) => this.legendIsEnable(name))
    return list.length
  }

  legendIsEnable(name: string) {
    const disabledMap = this.legendDisabledMap
    return !disabledMap[name]
  }

  toggleLegend(name: string) {
    const enable = this.legendIsEnable(name)
    const type = enable ? 'legendUnSelect' : 'legendSelect'
    // 保持最后一个图例，不能被「取消选择」
    if (type == 'legendSelect' || this.legendEnabledCount > 1) {
      this.chart.dispatchAction({ type, name })
      this.$set(this.legendDisabledMap, name, enable)
    } else {
      toast('最后一个了哦，不能反选')
    }
  }

  get chartData() {
    const series = this.data.map(({ name, data, color }) => {
      const line: any = {
        name,
        type: 'line',
        smooth: this.smooth,
        data,
        connectNulls: true,
      }
      color && (line.itemStyle = { color })
      return line
    })

    const result: any = {
      // 必须设置为 false，才能使 legendSelect、legendUnSelect 等 dispatchAction 起作用
      legend: {
        show: false
      },

      tooltip: {
        trigger: 'axis',
        enterable: true,
        confine: true,
        axisPointer: {
          lineStyle: {
            width: 2,
            opacity: .2,
            color: '#303030'
          }
        },
        formatter: (list: any[]) => {
          const title = this.tooltipFormatTitle({ list })
          const titleColor = this.tooltipTitleColor
          const nameColor = this.tooltipNameColor
          const listHtml = list.sort((a, b) => b.value - a.value)
          .map(({ seriesName, name, value, color }) => {
            const valueColor = color || nameColor
            const valueShow = value != null ? readableNumber(value) : '-'
            const itemHtml = `
              <div class="tooltip-item">
                <i class="tooltip-dot" style="background-color: ${color}"></i>
                <span class="tooltip-name van-ellipsis" style="color: ${nameColor}">${seriesName}</span>
                <span class="tooltip-value" style="color: ${valueColor}">${valueShow}</span>
              </div>
            `
            return itemHtml.trim()
          })
          .join('')
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
          maxWidth: '55%',
        }),
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.names,
        axisLabel: {
          color: this.axisLabelColor,
          fontSize: 10,
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
          color: this.axisLabelColor,
          fontSize: 10,
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
        left: 5,
        right: 20,
        top: 10,
        bottom: 10,
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
  z-index: 2;

  /deep/ .tooltip-box {
    position: relative;
    line-height: 1.5;
    font-size: 22px;
    padding: 18px 20px 22px;
  }

  /deep/ .tooltip-title {
    margin-bottom: 5px;
  }

  /deep/ .tooltip-item {
    display: flex;
    font-weight: 500;
    font-family: SanFranciscoDisplay-Semibold, SanFranciscoDisplay, serif;
  }

  /deep/ .tooltip-dot {
    position: relative;
    display: inline-block;
    top: 12px;
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
    margin-top: 12px;
  }

  /deep/ [style*=pointer-events] {
    pointer-events: all !important;
  }
}

.chart-wrap {
  position: relative;
  width: 100%;
  height: 400px;
}

.the-chart {
  width: 100%;
  height: 100%;
}

.legend-box {
  overflow: hidden;
}

.legend-list {
  margin: 15px -28px 8px 0;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  font-size: 26px;
  padding: 10px 20px;
  background-color: #f2f3f6;
  border-radius: 30px;
  margin: 20px 20px 0 0;
  i {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 100%;
  }
  em {
    margin-left: 10px;
    max-width: 6em;
  }
}

.legend-item-off {
  opacity: .3;
}
</style>
