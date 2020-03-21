<template>
  <div class="content-wrap">
    <div class="chart-default" v-if="!dataOption"></div>
    <div ref="refChart" v-if="dataOption" class="chart-wrap"></div>
    <div class="hidden"></div>
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

  // itemlist: any = {
  //   colorMain: '#7CA4FF', // 右边显示数据颜色
  //   borderRadius: [3, 3, 3, 3], // 柱形图圆角
  //   colorColumn: '#7CA4FF', // 柱子的颜色
  //   widthColumn: 10, // 柱子的宽度
  //   normalColor: [100 , 100 , 100 , 100 , 100 , 100 , 100 , 100 , 100 , 100 , ] // 默认的底层数据列表,跟展示数据的长度保持一致。默认为100
  //   bgColor: '#F0F0F0', // 柱状图条形图背景展示颜色
  // }

  mounted() {
    if (this.dataOption) {
      // console.log(this.dataOption.xData.length)
      // this.add(this.normalColor.length)
      this.updateCharts()
    }
  }

  @Watch('dataOption', { deep: true })
  watchData() {
    this.updateCharts()
  }

  // add(num: any) {
  //   console.log(111,num)
  //   if (num != this.dataOption.xData.length) {
  //       this.normalColor.push(100)
  //   }
  //   // this.add(this.normalColor.length)
  // }

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
        data: this.dataOption.yData,
        inverse: true,
        silent: true,
        axisLabel: {
          textStyle: {
            color: '#303030',
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
      },

      series: [
        {
          data: this.itemlist.normalColor,
          type: 'bar',
          barGap: '-100%',
          // barCategoryGap: '100%',
          smooth: true,
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => {
              const a: any = this.dataOption.xData
              return a[params.dataIndex] + '%'
            },
            color: this.itemlist.colorMain,
            fontWeight: 'bold',
            fontSize: 12
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
  height: 350px;
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