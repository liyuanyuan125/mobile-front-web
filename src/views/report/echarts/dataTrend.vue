<template>
  <div ref="refChart" class="chart-wrap"></div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import echarts from 'echarts'
import { find } from 'lodash'
import { tooltipStyles } from '@/util/echarts'

const tooltipsDefault = tooltipStyles({
  trigger: 'item',
  formatter: '{b} <br/> {c}'
})

@Component({
  components: {}
})
// 基础面积图
export default class AreaBasic extends ViewBase {
  @Prop({ type: Object }) dataOption!: any

  chartData: any = {
    xData: [],
    yData: []
  }
  dataUnit: string = '元'

  mounted() {
    // this.dataUnit = this.dataOption.dateUnit
    this.formatChartData()
    this.updateCharts()
  }

  // 格式化数据
  formatChartData() {
    const formatData = this.dataOption.data
    const xData = []
    const yData = []
    for (const item of formatData) {
      this.chartData.xData.push(item.date)
      this.chartData.yData.push(item.value)
    }
  }

  // 接口没调
  updateCharts() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    echarts.dispose(chartEl)
    chartEl.innerHTML = ''
    const myChart = echarts.init(chartEl)
    const option: any = {
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: '#fff',
        padding: [6, 15],
        formatter: (param: any) => {
          const marker =
            // tslint:disable-next-line:max-line-length
            '<span style="display:inline-block;margin-right:3px;border-radius:12px;width:12px;height:12px;background-color:#7AA0F5;"></span>'
          return marker + ' ' + param[0].name + ' ' + param[0].value
        },
        textStyle: {
          fontSize: '18px',
          color: '#2E2F5A'
        },
        extraCssText:
          'box-shadow: 0 2px 10px rgba(212, 212, 212, 0.5);border-radius:8px'
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
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
          show: false
        }
      },

      yAxis: {
        type: 'value',
        name: this.dataUnit,
        nameLocation: 'end',
        nameTextStyle: {
          color: '#000',
          fontSize: '20px',
          padding: 5
        },
        axisLabel: {
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
        left: '15px',
        top: '15px',
        right: '15px',
        bottom: 0,
        containLabel: true,
        show: false,
        borderWidth: 0
      },

      series: [
        {
          data: this.chartData.yData,
          type: 'line',
          smooth: true, // 平滑曲线
          lineStyle: {
            width: 3,
            color: '#7AA0F5'
          },
          showSymbol: false,
          markPoint: {
            symbol: 'circle'
          },
          itemStyle: {
            color: '#fff',
            borderColor: '#7AA0F5',
            borderWidth: 3
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(141,176,255, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255, 0)'
                }
              ])
            }
          }
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