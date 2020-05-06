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
// 横向柱状图
export default class BarGraphRow extends ViewBase {
  @Prop({ type: Object }) dataOption!: any
  @Prop({ type: Object }) itemlist: any

  mounted() {
    if (this.dataOption) {
      this.updateCharts()
    }
  }

  @Watch('dataOption', { deep: true })
  watchData() {
    this.updateCharts()
  }

  // 画图
  updateCharts() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    echarts.dispose(chartEl)
    chartEl.innerHTML = ''
    const len = this.dataOption.yData.length
    chartEl.style.height = len > 3 ? len * 35 + 'px' : len * 45 + 'px'
    const myChart = echarts.init(chartEl)
    const option: any = {
      xAxis: {
        type: 'value',
        show: false
      },

      yAxis: {
        type: 'category',
        data: this.dataOption.yData,
        inverse: true,
        silent: true,
        axisLabel: {
          textStyle: {
            color: '#303030',
            fontSize: 12,
            fontFamily: 'DIN Alternate'
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
        left: 5,
        top: 15,
        bottom: 5,
        right: 50,
        containLabel: true,
        show: false,
        borderWidth: 0
      },

      series: [
        {
          data: this.itemlist.normalColor,
          type: 'bar',
          barGap: '-100%',
          // barCategoryGap: '100%',
          smooth: true,
          silent: true,
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => {
              const a: any = this.dataOption.xData
              return a[params.dataIndex] + '%'
            },
            color: this.itemlist.colorMain,
            fontWeight: 'bold',
            fontSize: 12,
            fontFamily: 'DIN Alternate'
          },
          itemStyle: {
            color: this.itemlist.bgColor,
            barBorderRadius: this.itemlist.borderRadius
          },
          emphasis: {
            label: {
              show: false
            }
          },
          barWidth: this.itemlist.widthColumn
        },
        {
          data: this.dataOption.xData,
          type: 'bar',
          smooth: true,
          silent: true,
          label: {
            show: true,
            position: 'right',
            formatter: '',
            color: this.itemlist.colorMain,
            fontWeight: 'bold',
            fontSize: 12,
            fontFamily: 'DIN Alternate'
          },
          itemStyle: {
            color: this.itemlist.colorColumn,
            barBorderRadius: this.itemlist.borderRadius
          },
          // 选中
          emphasis: {
            label: {
              show: false
            }
          },
          barWidth: this.itemlist.widthColumn
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
  // height: 350px;
  position: relative;
  width: 100%;
  // height: 100%;
}
.chart-default {
  background: url('../../assets/data-null.png') no-repeat center;
  background-size: 201px auto;
  width: 100%;
  height: 100%;
}
.chart-wrap {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
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
.hidden {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: auto;
  opacity: 0;
}
</style>