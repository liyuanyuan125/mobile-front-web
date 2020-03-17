<template>
  <div>
    <heatContrast 
     :lineData="lineData"
     :overAllHeat="heatLineDate"
    />
 </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import TabNav, { TabNavItem } from '@/components/tabNav'
import heatContrast from '@/views/common/heatContrast/index.vue'
import { toast } from '@/util/toast'
import { ivalHeatAnalysis } from '@/api/brand'


@Component({
  components: {
    TabNav,
    heatContrast
  }
})
export default class Main extends Vue {
  // colors = ['#88AAF6', '#4CC8D0', '#C965DD']
  // 综合对比数据值
  overAllHeat = []

  get lineData() {
    return {
      title: '综合热度分析',
      xDate: ['20201211', '20121112', '20121123', '20121124', '20121125', '20121126', '20121127'],
      yDate: [
        {
          data: [1222, 333, 444, 2222, 3444, 222, 23],
          name: '欧阳娜娜',
        },
        {
          data: [1222, 3433, 4944, 222, 2344, 2322, 1243],
          name: '孙艺珍'
        },
        {
          data: [1152, 3113, 4241, 23222, 2644, 2272, 231],
          name: '刘诗诗',
        }
      ]
   }
  }

  get heatLineDate() {
    return {
      title: '综合热度分析',
      dateList: [ // this.overAllHeat
        {
          rivalName: '奔驰',
          data: [
            { date: 1514441477797, value: 12333},
            { date: 1524441477797, value: 2233333},
            { date: 1524441477797, value: 323333},
            { date: 1534441477797, value: 4233333},
            { date: 1544441477797, value: 523333},
            { date: 1554441477797, value: 623333},
            { date: 1564441477797, value: 7233333},
            { date: 1574441477797, value: 823333},
          ]
        },
        {
          rivalName: '宝马',
          data: [
            { date: 1514441477797, value: 133},
            { date: 1524441477797, value: 22333},
            { date: 1524441477797, value: 3233},
            { date: 1534441477797, value: 4233},
            { date: 1544441477797, value: 5233},
            { date: 1554441477797, value: 6233},
            { date: 1564441477797, value: 72333},
            { date: 1574441477797, value: 8233},
          ]
        },
      ]
    }
  }

  mounted() {
    this.getLineData()
  }
  async getLineData() {
    try {
      const { data: {
        overAllHeat,
        platform: {
          interactList,
          materialList
        }
      }} = await ivalHeatAnalysis({
        brandIdList: '1,2',
        startTime: 20200304,
        endTime: 20200311
      })
      // 处理不同意接口的名字比如brandName等 统一为name
      // this.overAllHeat = (overAllHeat || []).map((it: any) => {
      //   return {
      //     ...it,
      //     name: it.brandName
      //   }
      // })
    } catch (ex) {
      toast(ex)
    }
  }
}

</script>

<style lang='less' scoped>

</style>
