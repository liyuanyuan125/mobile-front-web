<template>
  <div class="userportrait">
    <ModuleHeader title="用户分析" :link="link" />
    <van-row type="flex" class="raitwrap">
      <van-col span="10">
        <BarGraph :dataOption="genderListData" :colorList="colorList" />
      </van-col>
      <van-col span="13">
        <barGraphRow :dataOption="ageRangeListData" :itemlist="itemlist" />
      </van-col>
    </van-row>
    <!-- <dataEmpty /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Col, Row } from 'vant'
import BarGraph from '@/components/kol/barGraph.vue'
import barGraphRow from '@/components/kol/barGraphRow.vue'
import ModuleHeader from '@/components/moduleHeader'
import dataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    BarGraph,
    barGraphRow,
    ModuleHeader,
    dataEmpty
  }
})
export default class UserPortrait extends ViewBase {
  @Prop({ type: Array }) ageRangeList!: any
  @Prop({ type: Array }) genderList!: any
  @Prop({ type: Object }) link!: any

  // ageRangeListData: any = null
  // genderListData: any = null

  colorList: any = ['#88AAF6', '#F18F8F'] // 男女比例颜色信息

  arr: any = []

  get itemlist() {
    // this.add()
    return {
      colorMain: '#303030',
      borderRadius: [5, 5, 5, 5],
      colorColumn: '#7F7D7E',
      widthColumn: 5,
      normalColor: this.add(),
      bgColor: '#F0F0F0'
    }
  }
  created() {
    this.add()
  }

  add() {
    if (this.arr.length != this.ageRangeList.length) {
      this.arr.push(100)
      this.add()
    }
    if (this.arr.length == this.ageRangeList.length) {
      return this.arr
    }
  }

  // 处理年龄数据
  get ageRangeListData() {
    const xData: any[] = []
    const yData: any[] = []
    let ageList: any = {}
    const rait = this.ageRangeList
    if (rait && rait.length) {
      for (const item of this.ageRangeList) {
        xData.push((item.value / 100).toFixed(1))
        yData.push(item.name)
      }
      ageList = {
        xData,
        yData
      }
    }
    return ageList
  }

  get genderListData() {
    const xData: any[] = []
    const yData: any[] = []
    let genderList: any = {}
    const rait = this.genderList
    if (rait && rait.length) {
      for (const item of this.genderList) {
        xData.push(item.name)
        yData.push((item.value / 100).toFixed(1))
      }
      genderList = {
        xData,
        yData
      }
    }
    return genderList
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
