<template>
  <div class="userportrait">
    <ModuleHeader title="用户分析" :link="ageRangeList.length || genderList.length ? link : null" />
    <van-row type="flex" class="raitwrap" v-if="ageRangeList.length || genderList.length">
      <van-col span="10">
        <BarGraph :dataOption="genderListData" :colorList="colorList" />
      </van-col>
      <van-col span="14">
        <barGraphRow :dataOption="ageRangeListData" :itemlist="itemlist" />
      </van-col>
    </van-row>
    <dataEmpty v-else />
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
  // 男女比例颜色信息
  @Prop({ type: Array, default: () => ['#88AAF6', '#F18F8F'] }) colorList!: string[]

  // ageRangeListData: any = null
  // genderListData: any = null

  arr: any = []
  raitList: any = []

  get itemlist() {
    const inx = this.ageRangeList ? this.ageRangeList.length : 0
    const anumber = inx > 0 ? new Array(inx).fill(100) : []
    return {
      colorMain: '#303030',
      borderRadius: [5, 5, 5, 5],
      colorColumn: '#7F7D7E',
      widthColumn: 5,
      normalColor: anumber,
      bgColor: '#F0F0F0'
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
    // const rait: any = []
    let gender: any = {}
    if (this.genderList && this.genderList[0].name == '女') {
      this.raitList = [this.genderList[1], this.genderList[0]]
    } else {
      this.raitList = this.genderList
    }
    if (this.raitList && this.raitList.length) {
      for (const item of this.raitList) {
        xData.push(item.name)
        yData.push((item.value / 100).toFixed(1))
      }
      gender = {
        xData,
        yData
      }
    }
    return gender
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
  padding: 30px;
}
</style>
