<template>
  <div class="content-wrap">
    <div class="chart-default" v-if="!dataOption"></div>
    <div ref="refChart" v-if="dataOption" class="chart-wrap"></div>
    <!-- <div class="color" v-if="this.dataOption != null">
      <span class="lf">男</span>
      <span class="rf">女</span>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import echarts from 'echarts'

@Component({
  components: {}
})
// 普通柱状图
export default class BarGraph extends ViewBase {
  @Prop({ type: Object }) dataOption!: any
  @Prop({ type: Array }) colorList: any

  mounted() {
    if (this.dataOption) {
      this.updateCharts()
    }
  }

  @Watch('dataOption', { deep: true })
  watchData() {
    this.updateCharts()
  }

  // 将canvas 转成图
  changeCanvas() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    const canvasEl = chartEl.getElementsByTagName('canvas')[0] as HTMLCanvasElement
    if (canvasEl) {
      const image = new Image()
      image.src = canvasEl.toDataURL('image/png')
      image.style.width = '100%'
      chartEl.innerHTML = `<img src="${image.src}" style="width:100%" />`
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
        data: this.dataOption.xData,
        axisLabel: {
          interval: 0,
          show: true,
          inside: false,
          // X轴上字的样式
          textStyle: {
            color: (param: any) => {
              return param.indexOf('男') > -1 ? '#7CA4FF' : '#FF6262'
            }
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            // color: '#D0D7E4'
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
          show: false,
          formatter: '{value}%',
          textStyle: {
            // color: '#8798AF',
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
          show: false,
          lineStyle: {
            // color: 'rgba(151,167,195,.45)',
            type: 'dashed'
          }
        }
      },

      grid: {
        left: 10,
        top: 25,
        bottom: 0,
        right: 10,
        containLabel: true,
        show: false,
        borderWidth: 0
      },

      series: [
        {
          data: this.dataOption.yData,
          type: 'bar',
          smooth: true,
          // legendHoverLink: true,
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                formatter: '{c}' + '%',
                textStyle: {
                  // 数值样式
                  fontSize: 14,
                  fontFamily: 'DIN Alternate'
                }
              },
              color: (params: any) => {
                const colorList: any = this.colorList
                return colorList[params.dataIndex]
              }
            }
          },
          barWidth: 23
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
  height: 300px;
}
.chart-default {
  background: url('../../assets/data-null.png') no-repeat center;
  background-size: 201px auto;
  width: 100%;
  height: 100%;
}
.chart-wrap {
  width: 100%;
  height: 300px;
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
.color {
  width: 100%;
  height: 20%;
  position: absolute;
  left: 0;
  bottom: 10%;
  // background: red;
  // opacity: 0.3;
  font-size: 28px;
  font-weight: 500;
  span {
    display: inline-block;
    width: 50%;
    padding-top: 8%;
  }
  .lf {
    padding-left: 22%;
    color: rgba(124, 164, 255, 1);
  }
  .rf {
    padding-left: 13%;
    color: rgba(255, 98, 98, 1);
  }
}
</style>