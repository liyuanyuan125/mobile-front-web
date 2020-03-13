<template>
  <div class="userportrait">
    <!-- <h4>性别年龄占比</h4> -->
    <div style="margin-top:15px;width: 40%;float: left;">
      <BarGraph :dataOption="userAgesData" :colorList="colorList" />
    </div>
    <div style="margin-top:15px;width: 60%;float: left;height: 162px;">
      <barGraphRow :dataOption="userGenderData" :itemlist="itemlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraph from '@/components/kol/barGraph.vue'
import barGraphRow from '@/components/kol/barGraphRow.vue'

@Component({
  components: {
    BarGraph,
    barGraphRow
  }
})
export default class UserPortrait extends ViewBase {
  @Prop({ type: Array }) userAges!: any
  @Prop({ type: Array }) userGender!: any

  userAgesData: any = null
  userGenderData: any = null

  colorList: any = ['#88AAF6', '#F18F8F'] // 男女比例颜色信息

  itemlist: any = {
    colorMain: '#303030',
    borderRadius: [5, 5, 5, 5],
    colorColumn: '#7F7D7E',
    widthColumn: 5,
    normalColor: [100 , 100 , 100 , 100 , 100 , 100 ],
    bgColor: '#F0F0F0'
  }


  created() {
    this.formatsexData()
    this.formatAgesData()
  }

  // 处理年龄数据
  formatsexData() {
    const xData = []
    const yData = []
    const rait = this.userAges
    if (rait && rait.length) {
      for (const item of this.userAges) {
        xData.push(item.type)
        yData.push(item.value)
      }
      this.userAgesData = {
        xData,
        yData
      }
    }
  }

  formatAgesData() {
    const xData = []
    const yData = []
    const rait = this.userGender
    if (rait && rait.length) {
      for (const item of this.userGender) {
        xData.push(item.value)
        yData.push(item.type)
      }
      this.userGenderData = {
        xData,
        yData
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
h4 {
  font-size: 40px;
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 40px;
  margin-left: 5%;
}
.userportrait {
  height: 350px;
}
</style>
