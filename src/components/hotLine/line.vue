<template>
  <div class="content-wrap" ref="box">
    <div class="line-echart" ref="refChart" v-if="lineData.xDate.length" />
  </div>
</template>

<script lang='tsx'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import { cssifyObject } from 'css-in-js-utils'
import {readableNumber} from '@/util/dealData'
import moment from 'moment'
const format = 'YYYY-MM-DD'

@Component
export default class Main extends Vue {
  /** 处理x，y数据 */
  @Prop({ type: Object }) lineData!: any
  /** line color展示 */
  @Prop({ type: Array, default: () => ['#7ca4ff'] }) colors!: any
  /** tooltip hot */
  @Prop({ type: String, default: '#f7a345' }) dotColor!: string
  /** tooltip 文本色 */
  @Prop({ type: String, default: '#8f8f8f' }) textColor!: string
  /** tooltip 事件处理 */
  @Prop({ type: Object, default: () => ({}) }) events!: any
  /** 自定义 tooltip框 内容 */
  @Prop({ type: String, default: '' }) formatterHtml!: string

  get xAxisDate() {
    return (this.lineData.xDate || []).map((it: any) => moment(it).format('MM-DD'))
  }

  mounted() {
    this.initChart()
    const box = this.$refs.box as HTMLDivElement
    ['click', 'touchstart'].forEach(name => {
      box.addEventListener(name, ev => {
        const el = ev.target as HTMLDivElement
        const {
          tooltipEventTipname,
          tooltipEventName,
          tooltipEventId
        } = el && el.dataset

        const click = this.events.click
        if (tooltipEventTipname && tooltipEventTipname in this.events) {
          ev.preventDefault()
          click && click({ id: tooltipEventId, name: tooltipEventName })
        }
      })
    })
  }

  // tab切换 数据重新渲染
  @Watch('lineData', { deep: true })
  watchLineData() {
    this.initChart()
  }

  initChart() {
    const chartEl = this.$refs.refChart as any
    const myChart = echarts.init(chartEl)
    // myChart.on('click', (params: any) => {
    //   console.log(params)
    // })

    const linearGradient = {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#8BB2FF'
          },
          {
            offset: 1,
            color: 'rgba(255,255,255, 0)'
          }
        ])
      }
    }

    const seriesItems = (this.lineData.yDate || []).map((it: any) => {
      return {
        type: 'line',
        symbolSize: 7,
        smooth: true, // 平滑
        name: it.name,
        data: it.data,
      }
    })

    // 如果是单条数据加上渐变效果
    if (seriesItems.length == 1) {
      seriesItems[0].areaStyle = linearGradient
    }

    const options: any = {
      title: {
        text: this.lineData.title,
        left: 12,
        textStyle: {
          fontSize: 17,
          color: '#303030',
          fontWeight: 0
        }
      },
      legend: {
        bottom: 0,
        icon: 'circle', // 设置图例标记
        itemHeight: 8,
        itemWidth: 10,
        textStyle: {
          color: '#000',
          fontWeight: 100
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        snap: false,
        // enterable: true, // 如需详情内交互，添加链接，按钮，则设置为true
        confine: true, // 限制在图表的区域内
        axisPointer: {
          // 指示线
          lineStyle: {
            width: 2,
            opacity: 0.2,
            color: '#303030'
          }
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        // position: 'inside',

        formatter: (params: any) => {
          const {name, value, dataIndex, seriesName} = params[0]
          const boxStyle = cssifyObject({
            position: 'relative',
            paddingLeft: '16px',
            lineHeight: '22px'
          })
          const dotStyle = cssifyObject({
            position: 'absolute',
            left: '2px',
            top: '7px',
            width: '8px',
            height: '8px',
            borderRadius: '100%',
            backgroundColor: this.dotColor,
          })
          const nameStyle = cssifyObject({
            color: this.textColor,
            fontSize: '14px',
          })
          const events = this.events[name] || []
          const eventHtml = events.map(({eventName, eventId}: any) => {
            const eventListHTML = `
            <div style="${boxStyle}" class="tooltip-event"
             data-tooltip-event-tipname="${name}"
             data-tooltip-event-name="${eventName}"
             data-tooltip-event-id="${eventId}"
            >
            <i style="${dotStyle}"></i>
             ${eventName}
            </div>
            `
            return eventListHTML.trim()
          })
          const cloneData = moment(this.lineData.xDate[dataIndex]).format('YYYY-MM-DD')
          const html = `
           <div style="${nameStyle}" >
             <p>${cloneData} ${seriesName} ${readableNumber(value)}</p>
             <div>
             ${eventHtml.join('')}
             </div>
           </div>
          `
          return this.formatterHtml ? this.formatterHtml : html.trim()
        }
      },
      grid: {
        left: 15,
        right: 26,
        top: 50,
        bottom: 40,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        interval: 5,
        data: this.xAxisDate,
        axisLabel: {
          color: '#8F8F8F',
          fontSize: 11
        },
        axisTick: {
          // 隐藏刻度尺
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        }
      },
      yAxis: {
        axisLabel: {
          color: '#8F8F8F'
        },
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisTick: {
          show: false
        },
        // 分割线样式
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: 'rgba(48, 48, 48, .2)',
          }
        }
      },
      // 一条线/多条线处理是color，series
      color: this.colors,
      series: seriesItems
    }
    myChart.clear() // 清空画布内容，实例可用
    myChart.setOption(options)
  }

}
</script>

<style lang='less' scoped>
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
  font-size: 22px;
}
.content-wrap {
  position: relative;
  width: 100%;
  padding-bottom: 65px;
  z-index: 2;
}
.line-echart {
  width: 100%;
  height: 500px;
}
</style>
