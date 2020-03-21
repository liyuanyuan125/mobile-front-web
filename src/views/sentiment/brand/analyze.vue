<template>
  <div>
    <heatContrast 
     :overAllHeat="heatLineDate"
     :colors="colors"
     :interactList="interactList"
     :materialList="materialList"
     :tabs="tabs"
    />
    <!-- <AgeDistribution :ageRangeList='ageRangeList' :href="href" /> -->
 </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import TabNav, { TabNavItem } from '@/components/tabNav'
// 口碑评论对比
import MarketContrast from '@/views/common/marketContrast/index.vue'
// 年龄分布
import AgeDistribution from '@/views/common/ageDistribution/index.vue'
import heatContrast from '@/views/common/heatContrast/index.vue'
import { toast } from '@/util/toast'
import { rivalHeatAnalysis } from '@/api/brand'


@Component({
  components: {
    TabNav,
    heatContrast,
    MarketContrast,
    AgeDistribution
  }
})
export default class Main extends Vue {
  colors = ['#88AAF6', '#4CC8D0', '#C965DD']
  // 综合对比数据值
  overAllHeat = []

  // 新增互动
  interactList = [
    {
      platformName: '新浪',
      dataList: [
        {
          rivalName: '奔驰',
          data: [
            { date: 1583251200000, value: 12333},
            { date: 1583337600000, value: 2333},
            { date: 1583424000000, value: 333},
            { date: 1583510400000, value: 4233},
            { date: 1583683200000, value: 533},
            { date: 1583769600000, value: 623},
            { date: 1583856000000, value: 723},
          ]
        },
        {
          rivalName: '宝马',
          data: [
            { date: 1583251200000, value: 813},
            { date: 1583337600000, value: 7223},
            { date: 1583424000000, value: 5323},
            { date: 1583510400000, value: 4433},
            { date: 1583683200000, value: 353},
            { date: 1583769600000, value: 263},
            { date: 1583856000000, value: 333},
          ]
        },
        {
          rivalName: '林肯',
          data: [
            { date: 1583251200000, value: 133},
            { date: 1583337600000, value: 233},
            { date: 1583424000000, value: 323},
            { date: 1583510400000, value: 4333},
            { date: 1583683200000, value: 5233},
            { date: 1583769600000, value: 6233},
            { date: 1583856000000, value: 333},
          ]
        }
      ]
    },
    {
      platformName: '网易新闻',
      dataList: [
        {
          rivalName: '奔驰1',
          data: [
            { date: 1583251200000, value: 12333},
            { date: 1583337600000, value: 2333},
            { date: 1583424000000, value: 333},
            { date: 1583510400000, value: 4233},
            { date: 1583683200000, value: 533},
            { date: 1583769600000, value: 623},
            { date: 1583856000000, value: 723},
          ]
        },
        {
          rivalName: '宝马1',
          data: [
            { date: 1583251200000, value: 813},
            { date: 1583337600000, value: 7223},
            { date: 1583424000000, value: 5323},
            { date: 1583510400000, value: 4433},
            { date: 1583683200000, value: 353},
            { date: 1583769600000, value: 263},
            { date: 1583856000000, value: 333},
          ]
        },
        {
          rivalName: '林肯1',
          data: [
            { date: 1583251200000, value: 133},
            { date: 1583337600000, value: 233},
            { date: 1583424000000, value: 323},
            { date: 1583510400000, value: 4333},
            { date: 1583683200000, value: 5233},
            { date: 1583769600000, value: 6233},
            { date: 1583856000000, value: 333},
          ]
        }
      ]
    },
  ]
  // 新增物料
  materialList = [
    {
      platformName: '新浪新闻',
      dataList: [
        {
          rivalName: '奔驰',
          data: [
            { date: 1583251200000, value: 12333},
            { date: 1583337600000, value: 2333},
            { date: 1583424000000, value: 333},
            { date: 1583510400000, value: 4233},
            { date: 1583683200000, value: 533},
            { date: 1583769600000, value: 623},
            { date: 1583856000000, value: 723},
          ]
        },
        {
          rivalName: '宝马',
          data: [
            { date: 1583251200000, value: 813},
            { date: 1583337600000, value: 7223},
            { date: 1583424000000, value: 5323},
            { date: 1583510400000, value: 4433},
            { date: 1583683200000, value: 353},
            { date: 1583769600000, value: 263},
            { date: 1583856000000, value: 333},
          ]
        },
        {
          rivalName: '林肯',
          data: [
            { date: 1583251200000, value: 133},
            { date: 1583337600000, value: 233},
            { date: 1583424000000, value: 323},
            { date: 1583510400000, value: 4333},
            { date: 1583683200000, value: 5233},
            { date: 1583769600000, value: 6233},
            { date: 1583856000000, value: 333},
          ]
        }
      ]
    },
    {
      platformName: '腾讯新闻',
      dataList: [
        {
          rivalName: '奔驰',
          data: [
            { date: 1583251200000, value: 12333},
            { date: 1583337600000, value: 2333},
            { date: 1583424000000, value: 333},
            { date: 1583510400000, value: 4233},
            { date: 1583683200000, value: 533},
            { date: 1583769600000, value: 623},
            { date: 1583856000000, value: 723},
          ]
        },
        {
          rivalName: '宝马',
          data: [
            { date: 1583251200000, value: 813},
            { date: 1583337600000, value: 7223},
            { date: 1583424000000, value: 5323},
            { date: 1583510400000, value: 4433},
            { date: 1583683200000, value: 353},
            { date: 1583769600000, value: 263},
            { date: 1583856000000, value: 333},
          ]
        },
        {
          rivalName: '林肯',
          data: [
            { date: 1583251200000, value: 133},
            { date: 1583337600000, value: 233},
            { date: 1583424000000, value: 323},
            { date: 1583510400000, value: 4333},
            { date: 1583683200000, value: 5233},
            { date: 1583769600000, value: 6233},
            { date: 1583856000000, value: 333},
          ]
        }
      ]
    },
  ]

  tabs: any = [
    {key: 0, text: '新增物料数'},
    {key: 1, text: '新增互动数'}
  ]

  get heatLineDate() {
    return {
      title: '综合热度分析',
      dateList: [ // this.overAllHeat
        {
          rivalName: '奔驰',
          data: [
            { date: 1583251200000, value: 12333},
            { date: 1583337600000, value: 2333},
            { date: 1583424000000, value: 333},
            { date: 1583510400000, value: 4233},
            { date: 1583683200000, value: 533},
            { date: 1583769600000, value: 623},
            { date: 1583856000000, value: 723},
          ]
        },
        {
          rivalName: '宝马',
          data: [
            { date: 1583251200000, value: 813},
            { date: 1583337600000, value: 7223},
            { date: 1583424000000, value: 5323},
            { date: 1583510400000, value: 4433},
            { date: 1583683200000, value: 353},
            { date: 1583769600000, value: 263},
            { date: 1583856000000, value: 333},
          ]
        },
        {
          rivalName: '林肯',
          data: [
            { date: 1583251200000, value: 133},
            { date: 1583337600000, value: 233},
            { date: 1583424000000, value: 323},
            { date: 1583510400000, value: 4333},
            { date: 1583683200000, value: 5233},
            { date: 1583769600000, value: 6233},
            { date: 1583856000000, value: 333},
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
      }} = await rivalHeatAnalysis({
        brandIdList: '1,2',
        startTime: 20200304,
        endTime: 20200311
      })
    } catch (ex) {
      toast(ex)
    }
  }
}

</script>

<style lang='less' scoped>

</style>
