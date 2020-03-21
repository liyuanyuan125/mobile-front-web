<template>
  <div>
    <section>
      <heatContrast 
        :overAllHeat="heatLineDate"
        :colors="colors"
        :interactList="interactList"
        :materialList="materialList"
        :tabs="tabs"
        v-if="interactList.length"
        />
    </section>
    <section>
      <MarketContrast :fetch="fetch" :query="query" />
    </section>
    <section>
      <ModuleHeader title="用户对比" tag="h5" class="sex-rate"/>
      <AgeDistribution :ageRangeList='ageRangeList' />
      <VsList :data="sexRateList" class="chart" />
    </section>
    <section class="items">
      <ModuleHeader title="性别占比" tag="h5" class="sex-rate"/>
    </section>
    
 </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import ModuleHeader from '@/components/moduleHeader'
import VsList, { VsItem } from '@/components/vsList' // 性别分布
import MarketContrast from '@/views/common/marketContrast/index.vue' // 口碑评论对比
import AgeDistribution from '@/views/common/ageDistribution/index.vue' // 年龄分布
import heatContrast from '@/views/common/heatContrast/index.vue' // 热度分析对比
import { toast } from '@/util/toast'
import { rivalHeatAnalysis } from '@/api/brand'


@Component({
  components: {
    ModuleHeader,
    VsList,
    heatContrast,
    MarketContrast,
    AgeDistribution
  }
})
export default class Main extends Vue {
  colors = ['#88AAF6', '#4CC8D0', '#C965DD']
  // 综合对比数据值
  heatLineDate: any = {
    title: '综合热度分析',
    dateList: []
  }
  // 新增互动
  interactList = []
  // 新增物料
  materialList = []
  tabs: any = [
    {key: 0, text: '新增物料数'},
    {key: 1, text: '新增互动数'}
  ]

  // 性别分布
  sexRateList: VsItem[] = [
    { name: '奔驰', rate1: 63.6, rate2: 44.4 },
    { name: '兰博基尼', rate1: 39.6, rate2: 60.4 },
    { name: '林肯', rate1: 20.2, rate2: 79.8 },
    { name: '雪佛兰', rate1: 2.2, rate2: 97.8 },
    { name: '玛莎拉蒂名字很长', rate1: 98.8, rate2: 1.2 },
  ]

  // 口碑评论补充数据
  query = {
        movieIdList: 12345
    }
    // 口碑评论 查询
  fetch = async (query: any) => { // query: 查询参数
        return {
            code: '',
            msg: '',
            data: {
                goodList: [
                    {
                        rivalName: query.startTime,
                        percent: 12.35,
                        hotWordList: [
                            '你好'
                        ]
                    }
                ]
            }
        }
    }
  // 年龄分布数据
  ageRangeList = [
    {
        ageType: '20-30',
        brandList: [
            {
                brandName: '奔驰',
                brandPercent: 32,
            },
            {
                brandName: '奔驰',
                brandPercent: 30,
            }
        ]
    },
    {
        ageType: '20-30',
        brandList: [
        ]
    }
  ]

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
      this.heatLineDate.dateList = overAllHeat || []
      this.interactList = interactList || []
      this.materialList = materialList || []
    } catch (ex) {
      toast(ex)
    }
  }
}

</script>

<style lang='less' scoped>
.items {
  padding: 0 30px;
}
</style>
