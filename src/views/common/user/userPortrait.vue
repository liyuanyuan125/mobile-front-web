<template>
  <div class="userportrait">
    <!-- <h4>性别年龄占比</h4> -->
    <ModuleHeader title="用户分析" :link="link" />
    <van-row type="flex" class="raitwrap" gutter="20">
      <van-col span="10">
        <BarGraph :dataOption="genderListData" :colorList="colorList" />
      </van-col>
      <van-col span="14">
        <barGraphRow :dataOption="ageRangeListData" :itemlist="itemlist" />
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Col, Row } from 'vant'
import BarGraph from '@/components/kol/barGraph.vue'
import barGraphRow from '@/components/kol/barGraphRow.vue'
import ModuleHeader from '@/components/moduleHeader'

@Component({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    BarGraph,
    barGraphRow,
    ModuleHeader
  }
})
export default class UserPortrait extends ViewBase {
  @Prop({ type: Array }) ageRangeList!: any
  @Prop({ type: Array }) genderList!: any
  @Prop({ type: Object }) link!: any

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
  formatsexData() {
    const xData = []
    const yData = []
    const rait = this.ageRangeList
    if (rait && rait.length) {
      for (const item of this.ageRangeList) {
        xData.push(item.value / 100)
        yData.push(item.name)
      }
      this.ageRangeListData = {
        xData,
        yData
      }
    }
  }

  formatAgesData() {
    const xData = []
    const yData = []
    const rait = this.genderList
    if (rait && rait.length) {
      for (const item of this.genderList) {
        xData.push(item.name)
        yData.push(item.value / 100)
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
  padding: 50px 0;
  background: #fff;
  border-top: 20px solid #f7f6f9;
}
.module-header {
  padding: 0 30px;
}
.raitwrap {
  margin-top: 30px;
}
</style>
