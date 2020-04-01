<template>
  <div class="content-wrap">
    <div class="line-echart" ref="refChart" v-if="lineData.xDate.length" />
  </div>
</template>

<script lang='tsx'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import { cssifyObject } from 'css-in-js-utils'
import moment from 'moment'
const format = 'YYYY-MM-DD'

@Component
export default class LineGrap extends Vue {
  /** 处理x，y数据 */
  @Prop({ type: Object }) lineData!: any
  /** line color展示 */
  @Prop({ type: Array, default: () => ['#7ca4ff'] }) colors!: any
  /** tooltip hot */
  @Prop({ type: String, default: '#f7a345' }) dotColor!: string
  /** tooltip 文本色 */
  @Prop({ type: String, default: '#8f8f8f' }) textColor!: string
  /** 自定义 tooltip框 内容 */
  @Prop({ type: Function }) formatterHtml!: (params: any, query: any) => Promise<string>

  maxData: any = 0

  get xAxisDate() {
    const ydate = this.lineData.yDate[0].data
    const max = Math.max(...ydate)
    this.maxData = ydate.indexOf(max)
    return (this.lineData.xDate || []).map((it: any) => moment(it).format('MM-DD'))
  }

  mounted() {
    this.initChart()
    // 判断最大值那天进行默认显示
  }

  // tab切换 数据重新渲染
  @Watch('lineData', { deep: true })
  watchLineData() {
    this.initChart()
  }

  initChart() {
    const chartEl = this.$refs.refChart as any
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
          color: '#303030'
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
        backgroundColor: 'transparent',
        enterable: true, // 如需详情内交互，添加链接，按钮，则设置为true
        confine: true, // 限制在图表的区域内
        axisPointer: {
          // 指示线
          lineStyle: {
            width: 2,
            opacity: 0.2,
            color: '#303030'
          }
        },
        // 跳转链接事件详情页url暂定处理
        formatter: (params: any) => {
          return this.formatterHtml(params[0], this.lineData.xDate[params[0].dataIndex])
        }
      },
      grid: {
        left: 10,
        right: 16,
        top: 30,
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
          color: '#47403B'
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
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0, // 显示第几个series
      dataIndex: this.maxData // 显示第几个数据
    })
  }
}
</script>

<style lang='less' scoped>
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
