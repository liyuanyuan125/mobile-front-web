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
// 横向柱状图
export default class BarGraphRow extends ViewBase {
  @Prop({ type: Array }) dataOption!: any

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
    for (const item of this.dataOption) {
      this.chartData.xData.push(item.value)
      this.chartData.yData.push(item.cityName)
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
        type: 'value',
        show: false
      },

      yAxis: {
        type: 'category',
        data: this.chartData.yData,
        inverse: true, // 是否反向 有点搞不明白,false就是从小到大排序
        silent: true,
        axisLabel: {
          textStyle: {
            color: '#8798AF',
            fontSize: 12
          }
        },
        // 是否显示刻度线
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        // 是否显示线
        axisLine: {
          show: false
        }
      },

      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: '50px',
        containLabel: true,
        show: false,
        borderWidth: 0
        // height: '400px'
      },

      series: [
        {
          data: this.chartData.xData,
          type: 'bar',
          barGap: '50%',
          barCategoryGap: '50%',
          smooth: true,
          // legendHoverLink: true,
          label: {
            show: true,
            position: 'right',
            distance: 10,
            formatter: '{c}%',
            color: '#2E2F5A',
            fontWeight: 'bold',
            fontSize: 14
          },
          itemStyle: {
            color: (params: any) => {
              const colorList: any = [
                '#FF8080',
                '#FFCB84',
                '#9FDECF',
                '#D9E0E9',
                '#D9E0E9',
                '#D9E0E9',
                '#D9E0E9',
                '#D9E0E9',
                '#D9E0E9',
                '#D9E0E9'
              ]
              return colorList[params.dataIndex]
            }
            // opacity: 0.4
          },
          // 选中
          emphasis: {
            label: {
              show: false
            }
          },
          barWidth: 15
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
  height: 600px;
}
.chart-wrap {
  width: 100%;
  height: 600px;
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