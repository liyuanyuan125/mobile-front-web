<template>
  <div class="content-wrap">
    <div ref="refChart" class="chart-wrap"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import echarts from 'echarts'
import { find } from 'lodash'

@Component({
  components: {}
})
// 基础面积图
export default class UserAge extends ViewBase {
  @Prop({ type: Array }) ageOption!: any

  // chart数据
  chartData: any = {
    xData: [],
    yData: []
  }
  mounted() {
    this.formatChartData()
    this.updateCharts()
  }

  // 格式化数据
  formatChartData() {
    const xData = []
    const yData = []
    for (const item of this.ageOption) {
      this.chartData.xData.push(item.range)
      this.chartData.yData.push(item.value)
    }
  }

  // 画图
  updateCharts() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    echarts.dispose(chartEl)
    chartEl.innerHTML = ''
    const myChart = echarts.init(chartEl)
    const option: any = {
      xAxis: {
        type: 'category',
        data: this.chartData.xData,
        axisLabel: {
          textStyle: {
            color: '#8798AF',
            fontSize: '20px'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(151, 167, 195, 0.45)'
          }
        },
        axisTick: {
          show: false,
          alignWithLabel: true
        }
      },

      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%',
          textStyle: {
            color: '#8798AF',
            fontSize: '20px'
          }
        },
        axisLine: {
          show: false
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

      grid: {
        left: 0,
        top: '15px',
        bottom: 0,
        right: '15px',
        containLabel: true,
        show: false,
        borderWidth: 0
      },

      series: [
        {
          data: this.chartData.yData,
          type: 'bar',
          smooth: true,
          // legendHoverLink: true,
          label: {
            normal: {
              show: false,
              position: 'outside'
            }
          },
          itemStyle: {
            color: '#7AA0F5',
            opacity: 0.4
          },
          // 选中
          emphasis: {
            itemStyle: {
              color: '#7AA0F5',
              opacity: 1
            }
          },
          barWidth: 20
        }
      ]
    }
    // console.save(option, `${new Date()}.json`)
    myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.content-wrap {
  position: relative;
  width: 100%;
  height: 400px;
}
.chart-wrap {
  width: 100%;
  height: 400px;
}
.chart-wrap:empty {
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: '暂无数据';
    font-size: 18px;
    color: #999;
  }
}
.chart-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}
</style>