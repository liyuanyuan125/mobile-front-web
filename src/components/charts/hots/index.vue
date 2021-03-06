<template>
  <div class="content-wrap">
    <div class="line-echart" ref="refChart"></div>
  </div>
</template>

<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import echarts from 'echarts'
import { cssifyObject } from 'css-in-js-utils'
import moment from 'moment'
const format = 'YYYY-MM-DD'


@Component
export default class Main extends Vue {
  /** 处理x，y数据 */
  @Prop({ type: Object }) lineData!: any
  /** line color展示 */
  @Prop({ type: Array, default: () => ['#88AAF6']}) colors!: any
  /** tooltip hot */
  @Prop({ type: String, default: '#f7a345'}) dotColor!: string
  /** tooltip 文本色 */
  @Prop({ type: String, default: '#8f8f8f'}) textColor!: string

  get xAxisDate() {
    return (this.lineData.xDate || []).map((it: any) => moment(it).format('MM-DD'))
  }

  mounted() {
    this.initChart()
  }
  initChart() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    const myChart = echarts.init(chartEl)

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
        data: it.data
      }
    })

    // 如果是单条数据加上渐变效果
    if (seriesItems.length == 1) {
      seriesItems[0].areaStyle = linearGradient
    }

    const options: any = {
      title: {
        text: this.lineData.title,
        left: -5,
        textStyle: {
          fontSize: 14,
          color: '#303030',
        },
      },
      legend: {
        bottom: 0,
        icon: 'circle', // 设置图例标记
        itemHeight: 8,
        itemWidth: 10,
        textStyle: {
          color: '#000',
          fontWeight: 100,
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        // enterable: true, // 如需详情内交互，添加链接，按钮，则设置为true
        confine: true, // 限制在图表的区域内
        axisPointer: { // 指示线
          lineStyle: {
            width: 2,
            opacity: 0.2,
            color: '#303030'
          }
        },
        formatter: (params: any) => {
          const {name, value, dataIndex, seriesName} = params[0]
          const eventList = this.lineData.eventList[dataIndex]
          const boxStyle = cssifyObject({
            position: 'relative',
            lineHeight: '16px',
            paddingLeft: '12px'
          })
          const dotStyle = cssifyObject({
            position: 'absolute',
            left: '2px',
            top: '5px',
            width: '6px',
            height: '6px',
            borderRadius: '100%',
            backgroundColor: this.dotColor,
          })
          const nameStyle = cssifyObject({
            color: this.textColor,
            fontSize: '11px',
          })

          const a = eventList.map((it: any) => {
            return `<p style="${boxStyle}"><i style="${dotStyle}"></i> ${it.eventName}</p>`
          })

          const html = `
           <div style="${nameStyle}" >
             <p>${moment(name).format(format)} ${seriesName} ${value}</p>
             <div>
               ${a.join('')}
             </div>
           </div>
          `
          return html.trim()
        }
      },
      grid: {
        left: 0,
        right: 16,
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
          color: '#47403B',
          fontSize: 11
        },
        axisTick: { // 隐藏刻度尺
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#e8e8e8',
          }
        }
      },
      yAxis: {
        axisLabel: {
          color: '#47403B',
        },
        axisLine: {
          lineStyle: {
            color: '#e8e8e8',
          }
        },
        axisTick: {
          show: false
        },
        // 分割线样式
        splitLine: {
          lineStyle: {
            color: 'rgba(151,167,195,.45)',
            type: 'dashed'
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
.content-wrap {
  position: relative;
  width: 100%;
}
.line-echart {
  width: 100%;
  height: 500px;
}
.line-title {
  display: flex;
  justify-items: center;
  justify-content: space-between;
}
</style>
