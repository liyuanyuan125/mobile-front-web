<template>
  <div class="content-wrap">
    <div class="chart-default" v-if="!dataOption"></div>
    <div class="chart-wrap" v-if="dataOption" ref="refChart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import echarts from 'echarts'
import { find } from 'lodash'
import { tooltipStyles } from '@/util/echarts'

@Component({
  components: {}
})
// 基础面积图
export default class LineGraph extends ViewBase {
  @Prop({ type: Object }) dataOption!: any

  chartData: any = {
    xData: [],
    yData: []
  }
  dataUnit: string = '(元)'

  mounted() {
    if (this.dataOption) {
      this.updateCharts()
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
        confine: true, // 限制在图表的区域内
        // 去掉指示线
        axisPointer: {
          lineStyle: {
            width: 3,
            opacity: 0.2,
            color: '#8DB0FF'
          }
        },
        backgroundColor: '#fff',
        padding: [6, 15],
        formatter: (param: any) => {
          const marker =
            // tslint:disable-next-line:max-line-length
            '<span style="display:inline-block;margin-right:3px;border-radius:12px;width:9px;height:9px;background-color:#7AA0F5;"></span>'
          let val = ` ${param[0].value}${this.dataOption.unit}`
          switch (this.dataOption.type) {
            case 1:
              val = ` ￥${param[0].value}${this.dataOption.unit}`
              break
            case 2:
              val = ` ${param[0].value}${this.dataOption.unit}`
              break
            case 3:
              val = ` ${param[0].value}${this.dataOption.unit}`
              break
          }
          return marker + ' ' + param[0].name + ' ' + param[0].seriesName + val
        },
        textStyle: {
          fontSize: 12,
          color: '#2E2F5A'
        },
        extraCssText:
          'box-shadow: 0 2px 10px rgba(212, 212, 212, 0.5);border-radius:8px'
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.dataOption.xData,
        axisLabel: {
          textStyle: {
            color: '#8798AF',
            fontSize: '20px'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#D0D7E4'
          }
        },
        axisTick: {
          show: false
        }
      },

      yAxis: {
        type: 'value',
        name: this.dataOption.unit,
        nameGap: -18,
        nameTextStyle: {
          color: '#8798AF',
          fontSize: '20px',
          padding: [0, 10, 0, 0],
          align: 'right'
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
        // gridIndex: 1,
        // 分割线样式
        splitLine: {
          lineStyle: {
            color: 'rgba(151,167,195,.45)',
            type: 'dashed'
          }
        }
      },

      grid: {
        left: 10,
        top: 10,
        right: 20,
        bottom: 5,
        containLabel: true
        // show: true
        // borderWidth: 0
      },

      series: [
        {
          name: this.dataOption.title,
          data: this.dataOption.yData,
          type: 'line',
          smooth: true, // 平滑曲线
          lineStyle: {
            width: 3,
            color: '#7AA0F5'
          },
          showSymbol: false,
          // markPoint: {
          //   symbol: 'rect',
          //   itemStyle: {
          //     color: '#ffffff',
          //     borderColor: '#7AA0F5',
          //     borderWidth: 3
          //   }
          // },
          itemStyle: {
            color: '#000',
            borderColor: '#7AA0F5',
            borderWidth: 3,
            z: 10
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
.chart-default {
  background: url('../../assets/data-null.png') no-repeat center;
  background-size: 201px auto;
  width: 100%;
  height: 100%;
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