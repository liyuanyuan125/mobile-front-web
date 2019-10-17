<template>
  <div class="content-wrap">
    <div class="chart-default" v-if="!dataOption"></div>
    <div ref="refChart" v-if="dataOption" class="chart-wrap"></div>
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

  mounted() {
    if (this.dataOption) {
      this.updateCharts()
    }
  }

  // 画图
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
          type: 'none'
        },
        backgroundColor: '#fff',
        padding: [6, 15],
        formatter:
          // tslint:disable-next-line:max-line-length
          '<p style="font-size:26px;line-height:1.1"><span style="display:inline-block;margin-right:6px;border-radius:10px;width:10px;height:10px;background-color:#7AA0F5; vertical-align:middle"></span>{c}%</p><p style="color:#8798AF;font-size:14px; margin-left:16px;">{b}</p>',
        textStyle: {
          fontSize: '14px',
          color: '#2E2F5A'
        },
        extraCssText:
          'box-shadow: 0 2px 10px rgba(212, 212, 212, 0.5);border-radius:8px'
      },

      xAxis: {
        type: 'category',
        data: this.dataOption.xData,
        axisLabel: {
          interval: 0,
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
          data: this.dataOption.yData,
          type: 'bar',
          smooth: true,
          // legendHoverLink: true,
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