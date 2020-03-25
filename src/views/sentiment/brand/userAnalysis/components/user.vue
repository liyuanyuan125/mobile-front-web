<template>
  <div>
    <div class="tabs flex-box">
      <span 
        v-for="item in tabBut" 
        :key="item.type"
        :class="{active: item.type == tabInd}"
        @click="changeTab(item.type)"
      >{{item.name}}</span>
    </div>
    <BarGraphRow :dataOption="areaData" v-if="canvasHei" :canvasHei="canvasHei" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { BarGraphRow } from '@/components/barGraphRow'

@Component({
  components: {
    BarGraphRow
  }
})
export default class Main extends Vue {
  @Prop({ type: Object}) consumRegion: any

  tabBut = [
    { type: 1, name: '城市'},
    { type: 2, name: '省份'},
  ]

  tabInd = 1
  canvasHei = ''
  areaData: any = null


  formatData() {
    const xData = []
    const yData = []
    const dataList = this.tabInd == 1 ? (this.consumRegion.cityList || [])
    : (this.consumRegion.provinceList || [])
    for (const item of dataList) {
      yData.push(item.name)
      xData.push((item.value / 100).toFixed(1))
    }
    this.canvasHei = dataList.length * 35 + 'px'
    this.areaData = {
      xData, // X轴数据
      yData, // Y轴name
      labelFormatter: '{c}%', // 最右侧的数值
      size: 10 // 条形的高度
    }
  }

  changeTab(index: number) {
    this.tabInd = index
  }

  @Watch('tabInd', {immediate: true})
  watchTabs() {
    this.formatData()
  }
}

</script>

<style lang='less' scoped>
.tabs {
  font-size: 26px;
  color: #2e2f5a;
  padding: 50px 0;
  span {
    width: 120px;
    line-height: 60px;
    background: #fff;
    border-radius: 30px;
    border: 2px solid rgba(180, 193, 211, .4);
    text-align: center;
    margin-right: 20px;
    &.active {
      background: #7ca4ff;
      color: #fff;
    }
  }
}
</style>
