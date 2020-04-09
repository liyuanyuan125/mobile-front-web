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
import { toThousands, readableNumber } from '@/util/dealData'


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
    const myChart = echarts.init(chartEl)

    const seriesItems = (this.lineData.yDate || []).map((it: any) => {
      return {
        type: 'line',
        symbolSize: 6,
        smooth: true, // 平滑
        name: it.name,
        data: it.list,
        connectNulls: true,
      }
    })

    const options: any = {
      title: {
        text: this.lineData.title,
        left: -5,
        textStyle: {
          fontSize: 17,
          fontWeight: 0,
          color: '#303030',
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        padding: [5, 10, 5, 10],
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
        // 分为两个模块来展示html
        formatter: (params: any) => {
          const dataIndex = (params[0].dataIndex)
          const titleDate = this.lineData.xDate[dataIndex]
          const listHtml = (params || []).map(({seriesName, name, value, color }: any) => {
            const itemHtml = `
              <p class="tooltip-item">
                <i class="tooltip-dot" style="background-color: ${color}"></i>
                <span class="tooltip-name" >${seriesName}</span>
                <span class="tooltip-value">${readableNumber(value)}</span>
              </p>
            `
            return itemHtml.trim()
          })

          const html = `
            <div class="tooltip-box">
              <div class="tooltip-title">${titleDate}</div>
              ${listHtml.join('')}
            </div>
          `
          return html.trim()
        }
      },
      grid: {
        left: 10,
        right: 16,
        top: 50,
        bottom: 40,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: (this.lineData.xDate || []).map((t: any) => moment(t).format('MM-DD')),
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
            type: 'dotted'
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
/deep/ .tooltip-item {
  display: flex;
  font-weight: 500;
  font-family: SanFranciscoDisplay-Semibold, SanFranciscoDisplay, serif;
}

/deep/ .tooltip-dot {
  position: relative;
  display: inline-block;
  top: 10px;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  margin-right: 10px;
}
/deep/ .tooltip-name {
  font-size: 22px;
  color: #303030;
  display: block;
  margin-right: 15px;
  min-width: 70px;
}
/deep/ .tooltip-value {
  color: #303030;
  font-size: 25px;
}
/deep/ .tooltip-title {
  font-size: 26px;
  color: #b8b8b8;
  padding-bottom: 5px;
}

</style>
