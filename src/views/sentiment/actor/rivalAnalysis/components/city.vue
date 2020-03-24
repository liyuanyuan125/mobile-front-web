<template>
  <div class="userportrait">
    <div style="margin-top:15px;height: 370px;">
      <barGraphRow :dataOption="cityListData" :itemlist="itemlist" />
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
  @Prop({ type: Array }) cityList!: any

  cityListData: any = null

  itemlist: any = {
    colorMain: '#7CA4FF', // 右边显示数据颜色
    borderRadius: [3, 3, 3, 3], // 柱形图圆角
    colorColumn: '#7CA4FF', // 柱子的颜色
    widthColumn: 10, // 柱子的宽度
    normalColor: [100 , 100 , 100 , 100 , 100 , 100 , 100 , 100 , 100 , 100 , ], // 默认的底层数据列表,跟展示数据的长度保持一致。默认为100
    bgColor: 'rgba(251, 251, 251)'
  }


  created() {
    this.formatAgesData()
  }

  formatAgesData() {
    const xData = []
    const yData = []
    const rait = this.cityList
    if (rait && rait.length) {
      for (const item of this.cityList) {
        xData.push(item.value)
        yData.push(item.type)
      }
      this.cityListData = {
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

</style>