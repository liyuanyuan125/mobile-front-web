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
import { thousand, roleNumber } from '@/fn/validateRules'

@Component
export default class TrendLine extends Vue {
  /** 处理x，y数据 */
  @Prop({ type: Object }) lineData!: any
  /** line color展示 */
  @Prop({ type: Array, default: () => [] }) colors!: any
  /** tooltip hot */
  @Prop({ type: String, default: '#f7a345' }) dotColor!: string
  /** tooltip 文本色 */
  @Prop({ type: String, default: '#8f8f8f' }) textColor!: string
  // 曲线上是有否有渐变
  @Prop({ type: Boolean, default: false }) isGrad!: boolean

  unit: string = '' // Y轴单位

  mounted() {
    this.initChart()
  }

  initChart() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    echarts.dispose(chartEl)
    const myChart = echarts.init(chartEl)
    let index = -1
    const seriesItems = (this.lineData.yDate || []).map((it: any) => {
      index += 1
      const maxVal = String(Math.max(...it.list))
      const len = maxVal.length
      if (len >= 5 && len < 9) {
        this.unit = '万'
      } else if (len >= 9) {
        this.unit = '亿'
      }
      return {
        type: 'line',
        symbolSize: 6,
        smooth: true, // 平滑
        name: it.name,
        data: it.list,
        connectNulls: true, // 是否连接空数据。
        areaStyle: this.isGrad
          ? {
              // 渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.colors[index]
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255, 0)'
                }
              ])
            }
          : null
      }
    })
    // 处理 x 轴日期显示
    const xDates = this.lineData.xDate.map((ite: any) => moment(ite).format('MM-DD'))

    const options: any = {
      title: {
        text: this.lineData.title,
        left: -5,
        textStyle: {
          fontSize: 17,
          fontWeight: 0,
          color: '#303030'
        }
      },
      legend: {
        data: this.lineData.yDate.rivalName,
        bottom: 0,
        padding: [100, 0, 0, 0],
        height: '200px',
        itemHeight: 6,
        itemWidth: 6,
        icon: 'circle'
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderWidth: 1.2,
        borderColor: 'rgba(48,48,48,.1)',
        padding: [5, 10, 5, 10],
        confine: true, // 限制在图表的区域内
        axisPointer: {
          zIndex: 100,
          // 指示线
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
        formatter: (params: any) => {
          const time = this.lineData.xDate[params[0].dataIndex]
          const weekDays = ['日', '一', '二', '三', '四', '五', '六']
          const day = weekDays[moment(time).day()]
          const date = moment(time).format('YYYY-MM-DD')
          const htmlArr: any[] = []
          for (const it of params) {
            const itemHtml = `
              <p class="tooltip-item">
                <i class="tooltip-dot" style="background-color: ${it.color}"></i>
                <span class="tooltip-name">${it.seriesName}</span>
                <span class="tooltip-value" style="color: ${it.color}">${roleNumber(
              it.value
            )}</span>
              </p>
            `
            htmlArr.push(itemHtml)
          }
          const html = `<div>
              <p>${date} 周${day}</p>
              ${htmlArr.join('')}
            </div>`

          return html
        }
      },
      grid: {
        left: 10,
        right: 20,
        top: 30,
        bottom: 50,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xDates,
        axisLabel: {
          color: '#8f8f8f',
          fontSize: 11
        },
        axisTick: {
          // 隐藏刻度尺
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#f2f2f2'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => {
            switch (this.unit) {
              case '亿':
                const yiVal = thousand(value / 100000000)
                return yiVal + this.unit
              case '万':
                const wanVal = thousand(value / 10000)
                return wanVal + this.unit
              default:
                return thousand(value)
            }
          },
          textStyle: {
            color: '#8f8f8f',
            fontSize: '20px'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#f2f2f2'
          }
        },
        axisTick: {
          show: false
        },
        // 分割线样式
        splitLine: {
          lineStyle: {
            color: '#d7d7d7',
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
  @Watch('lineData', { deep: true })
  watchLineData() {
    this.initChart()
  }
}
</script>

<style lang='less' scoped>
.content-wrap {
  position: relative;
  width: 100%;
  z-index: 1;
}
.line-echart {
  width: 100%;
  height: 550px;
}

/deep/ .tooltip-item {
  display: flex;
  font-weight: 500;
  margin-top: 6px;
}

/deep/ .tooltip-dot {
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  margin-right: 10px;
  vertical-align: middle;
  top: 10px;
}

/deep/ .tooltip-name {
  flex: 1;
  width: 8em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 10px;
}
/deep/ .tooltip-value {
  font-family: SanFranciscoDisplay-Semibold, SanFranciscoDisplay, sans-serif;
}
</style>
