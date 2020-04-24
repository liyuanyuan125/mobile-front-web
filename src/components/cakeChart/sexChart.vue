<template>
  <div >
    <div v-if="data.data && data.data.length > 0&&(this.data.data[0].value || this.data.data[1].value)" class="china-map">
        <div ref="annular" :style="{width:sizeWidth+'px',height:sizeWidth+'px'}" class="chart-wrap"></div>
    </div> 
    <DataEmpty v-if="!data.data || (data.data&&data.data.length == 0) || (!this.data.data[0].value && !this.data.data[1].value)" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import {DataItem , ObjData} from './types'
import {getSexOption , getRingOption} from './data'
import eCharts from 'echarts'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
@Component({
  components: {
    DataEmpty
  }
})

export default class ChinaMap extends Vue {
  /** 数据 */
  @Prop({ type: Object, default: () => [] }) data!: DataItem
  /** 长宽 */
  @Prop({ type: Number, default: 0 }) width!: number

 // 组件宽度
  sizeWidth: number = this.getSize(this.width)
  mounted() {
    this.getcherts()
  }
  getcherts() {
    if (!this.data.data || this.data.data.length == 0 ) {
      return
    }
    if (!this.data.data[0].value && !this.data.data[1].value) {
      return
    }
  const myEcharts = this.$refs.annular as HTMLDivElement
  const eChart = eCharts.init(myEcharts)
  let sexData: ObjData[] = []
  let man: ObjData = {
    name: '',
    value: 0
  }
  let woman: ObjData = {
      name: '',
      value: 0
  }

  if (this.data.data[0].value) {
    if (!this.data.data[1].value) {
      this.data.data[1].value = 0
    }
    if ((this.data.data[0].value + this.data.data[1].value) / 100 != 100) {
      if (this.data.data[0].value / 100 < 100) {
          this.data.data[1].value = 10000 - this.data.data[0].value
          } else {
            this.data.data[0].value = 10000
            this.data.data[1].value = 0
          }
    }
  } else {
    if (this.data.data[1].value > 10000) {
      this.data.data[1].value = 10000
    }
    this.data.data[0].value = 10000 - this.data.data[1].value


  }
  this.data.data.forEach((it: any) => {
      if ( RegExp(/男/).test(it.name)) {
        man = {
          name: it.name,
          value: it.value
        }
      }
      if (RegExp(/女/).test(it.name)) {
        woman = {
          name: it.name,
          value: it.value
        }
      }
  })

  sexData = [man, woman]
  const data: any = {
      optionName: [],
      optionData: [],
      data: sexData,
      title: this.data.title || '', // title 名称
      emphasisShow: this.data.emphasisShow ||  true, // 是否显示中间的文字
      color: this.data.color || [  '#7CA4FF' , '#FF6262'], // 修改颜色
      titleShow: this.data.titleShow || false, // 是否显示标题
      titleMargin: this.data.titleMargin || 20, // 标题部分padding[20,20,20,20]||20
      titleLeft: this.data.titleLeft || 'left', // 标题位置 left center right
      titleSize: this.data.titleSize || 18, // 标题字体大小
      titleWeight: this.data.titleWeight || 'bold', // 标题字体粗细
      legendtoFixed : this.data.legendtoFixed || 1 // legend显示几位小数
  }
  let max: number = 0
  sexData.forEach((it: any) => {
    max += Number(it.value + '')
  })
  sexData.forEach((it: any) => {
    data.optionName.unshift(it.name)
    const obj = {
      name: it.name,
      value: Number((Number(it.value + '') / 100).toFixed(1))
    }
    data.optionData.unshift(obj)
  })
  const option: object = getSexOption(data)
  eChart.setOption(option)
  }

  getSize(width: number) {
    const w = document.documentElement.clientWidth
        if (width >= w || width < 300) {
            this.sizeWidth = w
        } else {
            this.sizeWidth = width
        }
        return this.sizeWidth
  }
}
</script>

<style lang="less" scoped>
  .chart-wrap {
    width: 400px;
    height: 400px;
  }
</style>