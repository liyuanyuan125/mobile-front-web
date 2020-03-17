<template>
  <div class="userportrait">
    <!-- <h4>性别年龄占比</h4> -->
    <ModuleTitle title="用户分析" />
    <div style="margin-top:15px;width: 40%;float: left;">
      <BarGraph :dataOption="genderListData" :colorList="colorList" />
    </div>
    <div style="margin-top:15px;width: 60%;float: left;height: 162px;">
      <barGraphRow :dataOption="ageRangeListData" :itemlist="itemlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraph from '@/components/kol/barGraph.vue'
import barGraphRow from '@/components/kol/barGraphRow.vue'
import ModuleTitle from '@/components/sentimentTitle'

@Component({
  components: {
    BarGraph,
    barGraphRow,
    ModuleTitle
  }
})
export default class UserPortrait extends ViewBase {
  @Prop({ type: Array }) ageRangeList!: any
  @Prop({ type: Array }) genderList!: any

  ageRangeListData: any = null
  genderListData: any = null

  colorList: any = ['#88AAF6', '#F18F8F'] // 男女比例颜色信息

  arr: any = []

  itemlist: any = {
    colorMain: '#303030',
    borderRadius: [5, 5, 5, 5],
    colorColumn: '#7F7D7E',
    widthColumn: 5,
    normalColor: [],
    bgColor: '#F0F0F0'
  }


  created() {
    this.add()
    this.formatsexData()
    this.formatAgesData()
  }

  add() {
    if (this.arr.length != this.ageRangeList.length) {
      this.arr.push(100)
      this.add()
    }
    if (this.arr.length == this.ageRangeList.length) {
      this.itemlist.normalColor = this.arr
    }
  }

  // 处理年龄数据
  formatAgesData() {
    const xData = []
    const yData = []
    const rait = this.ageRangeList
    if (rait && rait.length) {
      for (const item of this.ageRangeList) {
        xData.push((item.value / 100).toFixed(1))
        yData.push(item.name)
      }
      this.ageRangeListData = {
        xData,
        yData
      }
    }
  }

  formatsexData() {
    const xData = []
    const yData = []
    const rait = this.genderList
    if (rait && rait.length) {
      for (const item of this.genderList) {
        xData.push(item.name)
        yData.push((item.value / 100).toFixed(1))
      }
      this.genderListData = {
        xData,
        yData
      }
    }
  }
}
</script>

<style lang="less" scoped>
h4 {
  font-size: 40px;
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 40px;
  margin-left: 5%;
}
.userportrait {
  height: 500px;
  padding-top: 52px;
  background: #fff;
  // border-top: 20px solid #f7f6f9;
}
</style>
