<template>
  <div>
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList 
       :rivalList="rivalList" 
       v-if="rivalList.length" 
       class="movierival" 
       @setRival="changeIds"
    />
    <section>
      <selectTime v-model="day" class="select-time"  ref="reftimes"/>
      <heatContrast 
        :overAllHeat="overAllHeat"
        :interactList="interactList"
        :materialList="materialList"
        :tabs="tabs"
      />
    </section>
    <section>
      <MarketContrast :fetch="fetch" :query="query" />
    </section>
    <section>
      <ModuleHeader title="用户对比" tag="h5" class="sex-rate"/>
      <AgeDistribution :ageRangeList='ageRangeList' v-if="ageRangeList.length" />
    </section>
    <section class="items">
      <SexVs :data="genderList" v-if="genderList.length" class="genderbox" />
    </section>
    
 </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import { toast } from '@/util/toast'
import { lastDays } from '@/util/timeSpan'
import ModuleHeader from '@/components/moduleHeader'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import RivalList from '@/views/common/rivalList/index.vue' // 竞品列表
import SexVs, { VsItem } from '@/views/common/sexVs' // 性别分布
import MarketContrast from '@/views/common/marketContrast/index.vue' // 口碑评论对比
import AgeDistribution from '@/views/common/ageDistribution/index.vue' // 年龄分布
import heatContrast from '@/views/common/heatContrast/index.vue' // 热度分析对比
import { selectTime } from '@/components/hotLine' // 日期选择
import {rivalHeatAnalysis, rivalPraise } from '@/api/brand'
import {reportDetail} from '../data'

@Component({
  components: {
    ModuleHeader,
    SexVs,
    selectTime,
    heatContrast,
    MarketContrast,
    AgeDistribution,
    RivalList,
    SentimentBar
  }
})
export default class Main extends Vue {
  brandIdList = ''
  // 综合对比数据值, 新增互动, 新增物料
  day = 7
  overAllHeat = []
  interactList = []
  materialList = []
  tabs: any = [
    {key: 0, text: '新增物料数'},
    {key: 1, text: '新增互动数'}
  ]

  // 口碑评论补充数据
  get query() {
    return {
      brandIdList: this.$route.params.ids,
    }
  }
  fetch = rivalPraise

  // 竞品分析, 年龄分布, 性别分布
  rivalList = []
  ageRangeList = []
  genderList = []

  mounted() {
    this.brandIdList = this.$route.params.ids
    this.init()
  }

  init() {
    this.portDetail()
    this.getLineData()
  }

  async portDetail() {
    // console.log(await reportDetail({
    //     brandIdList: this.$route.params.ids
    //   }))
    try {
      const {data: {
        rivalList,
        ageRangeList,
        sexData,
        sensitivity, // 用户敏感度
        userRegion, //  用户地域分布
        hightConsume // 高消费用户地域分布
      }} = await reportDetail({
        brandIdList: this.brandIdList
      })
      this.rivalList = rivalList || []
      this.ageRangeList = ageRangeList || []
      this.genderList = sexData || []
    } catch (ex) {
      toast(ex)
    }
  }

  async getLineData() {
    const [ startTime, endTime ] = lastDays(this.day)
    try {
      const { data: {
        overAllHeat,
        platform: {
          interactList,
          materialList
        }
      }} = await rivalHeatAnalysis({
        brandIdList: this.brandIdList,
        startTime, // 20200304,
        endTime, // 20200311
      })
      this.overAllHeat = overAllHeat || []
      this.interactList = interactList || []
      this.materialList = materialList || []
    } catch (ex) {
      toast(ex)
    }
  }

  changeIds(ids: any) {
    this.brandIdList = ids
    this.init()
  }

  @Watch('day')
  watchDay() {
    this.getLineData()
  }
}

</script>

<style lang='less' scoped>
.items {
  padding: 0 30px;
}
.select-time {
  padding: 69px 30px 15px;
}
.movierival {
  padding-bottom: 60px;
  background: #f2f3f6;
}
</style>
