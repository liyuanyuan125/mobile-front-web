<template>
  <div class="content-wrap">
    <div class="line-echart" ref="refChart"></div>
  </div>
</template>

<script lang='tsx'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import { cssifyObject } from 'css-in-js-utils'
import moment from 'moment'
const format = 'YYYY-MM-DD'


@Component
export default class Main extends Vue {
  /** 处理x，y数据 */
  @Prop({ type: Object }) lineData!: any
  /** line color展示 */
  @Prop({ type: Array, default: () => []}) colors!: any
  /** tooltip hot */
  @Prop({ type: String, default: '#f7a345'}) dotColor!: string
  /** tooltip 文本色 */
  @Prop({ type: String, default: '#8f8f8f'}) textColor!: string


  mounted() {
    this.initChart()
  }
  initChart() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    echarts.dispose(chartEl)
    // chartEl.innerHTML = ''
    const myChart = echarts.init(chartEl)

    const seriesItems = (this.lineData.yDate || []).map((it: any) => {
      return {
        type: 'line',
        symbolSize: 6,
        smooth: true, // 平滑
        name: it.name,
        data: it.list
      }
    })

    const options: any = {
      title: {
        text: this.lineData.title,
        left: -5,
        textStyle: {
          fontSize: 14,
          color: '#303030',
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        confine: true, // 限制在图表的区域内
        axisPointer: { // 指示线
          lineStyle: {
            width: 2,
            opacity: 0.2,
            color: '#303030'
          }
        },
        textStyle: {
          color: '#303030',
          fontSize: 12,
          width: 2
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
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
        data: this.lineData.xDate,
        axisLabel: {
          color: '#8f8f8f',
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
          color: '#8f8f8f',
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
  @Watch('lineData', {deep: true})
  watchLineData() {
    this.initChart()
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
</style>
