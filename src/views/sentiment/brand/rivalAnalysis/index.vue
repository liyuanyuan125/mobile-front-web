<template>
  <div class="page">
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList 
       :rivalList="rivalList" 
       v-if="rivalList.length" 
       class="movierival"
       type="1"
       @setRival="changeIds"
    />

    <TabNav :list ="list" class="tab-nav" normal/>

    <section id="hot" class="item-hots">
      <selectTime v-model="day" class="select-time"  ref="reftimes"/>
      <heatContrast 
        :overAllHeat="overAllHeat"
        :interactList="interactList"
        :materialList="materialList"
        :tabs="tabs"
      />
    </section>
    <section class="market-model" id="praise">
      <MarketContrast class="items-market" :fetch="fetch" :query="query" />
    </section>
    <section class="user-model" id="user">
      <ModuleHeader title="用户对比" class="items"/>
      <AgeDistribution :ageRangeList='ageRangeList' v-if="ageRangeList.length" />
      <div class="van-hairline--top item-hairline"></div>
      <SexVs :data="genderList" v-if="genderList.length" class="genderbox" />
      <div class="van-hairline--top item-hairline"></div>
      <!-- <Table 
        class="item-high"
        :title='sensTitle' 
        :tabList='sensTabList' 
        :tableTitle='sensTableTitle' 
        :tableItem='sensTableItem'
        @chgregionPk='changeTabs'
      />
      <div class="van-hairline--top item-hairline"></div> -->
      <Table 
        class="item-user"
        :title='userTitle' 
        :tabList='userTabList' 
        :tableTitle='userTableTitle' 
        :tableItem='userTableItem'
        @chgregionPk='userTabs'
      />
      <!-- <div class="van-hairline--top item-hairline"></div>
      <Table
        class="item-high"
        :title='highTitle' 
        :tabList='highTabList' 
        :tableTitle='highTableTitle' 
        :tableItem='highTableItem'
        @chgregionPk='highTabs'
      /> -->
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
import Table from '@/views/common/table/table.vue' // table 分布图
import { selectTime } from '@/components/hotLine' // 日期选择
import TabNav, { TabNavItem } from '@/components/tabNav'
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
    SentimentBar,
    Table,
    TabNav
  }
})
export default class Main extends Vue {
  list: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
  ]

  brandIdList: any = ''
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
      brandIdList: this.$route.query.ids,
    }
  }

  // 竞品分析, 年龄分布, 性别分布
  rivalList = []
  ageRangeList = []
  genderList = []
  // 用户敏感度
  promotionList = []
  commentList = []
  // 用户地域分布
  userCityList = []
  userProvinceList = []
  // 高消费用户地域分布
  highCityList = []
  highProvinceList = []

  // 用户敏感度
  // sensTitle = '用户敏感度'
  // sensTabList = [
  //   { name: '促销敏感度', key: 'sales'},
  //   { name: '评论敏感度', key: 'comment'}
  // ]
  // sensTableTitle = [
  //   {key: 'brand', value: '品牌'},
  //   {key: 'extreme', value: '极度敏感'},
  //   {key: 'high', value: '高度敏感'},
  //   {key: 'medium', value: '中度敏感'},
  //   {key: 'mild', value: '轻度敏感'},
  //   {key: 'no', value: '不敏感'},
  // ]
  // sensTableItem = []

  // 用户地域分布
  userTitle = '用户地域分布'
  userTabList = [
    { name: '城市分布', key: 'city'},
    { name: '省份分布', key: 'province'}
  ]
  userTableTitle = [
    {key: 'brand', value: '品牌'},
    {key: 'top1', value: 'TOP1'},
    {key: 'top2', value: 'TOP2'},
    {key: 'top3', value: 'TOP3'},
    {key: 'top4', value: 'TOP4'},
    {key: 'top5', value: 'TOP5'},
  ]
  userTableItem = []

  // 高消费用户地域分布
  // highTitle = '高消费用户地域分布'
  // highTabList = [
  //   { name: '城市分布', key: 'city'},
  //   { name: '省份分布', key: 'province'}
  // ]
  // highTableTitle = [
  //   {key: 'brand', value: '品牌'},
  //   {key: 'top1', value: 'TOP1'},
  //   {key: 'top2', value: 'TOP2'},
  //   {key: 'top3', value: 'TOP3'},
  //   {key: 'top4', value: 'TOP4'},
  //   {key: 'top5', value: 'TOP5'},
  // ]
  // highTableItem = []

  mounted() {
    this.brandIdList = this.$route.query.ids
    this.init()
  }

  init() {
    this.portDetail()
    this.getLineData()
  }

  async fetch(query: any) {
    // {goodList, badList, neutralList}
    const {code, data, msg} = await rivalPraise(query)
    const goodList = (data.goodList || []).map((it: any) => {
      return {
        ...it,
        percent: (it.percent / 100).toFixed(1)
      }
    })
    const badList = (data.badList || []).map((it: any) => {
      return {
        ...it,
        percent: (it.percent / 100).toFixed(1)
      }
    })
    const neutralList = (data.neutralList || []).map((it: any) => {
      return {
        ...it,
        percent: (it.percent / 100).toFixed(1)
      }
    })

    return {
      code,
      data: {
        goodList,
        badList,
        neutralList
      },
      msg,
    }
  }

  async portDetail() {
    try {
      const {data: {
        rivalList,
        ageRangeList,
        sexData,
        sensitivity: {promotionList, commentList}, // 用户敏感度
        userRegion: {cityList, provinceList}, //  用户地域分布
        hightConsume, // 高消费用户地域分布
      }} = await reportDetail({
        brandIdList: this.brandIdList
      })
      this.rivalList = rivalList || []
      this.ageRangeList = ageRangeList || []
      this.genderList = sexData || []

      // this.promotionList = promotionList || []
      // this.sensTableItem = promotionList || []
      // this.commentList = commentList || []

      this.userTableItem = cityList || []
      this.userCityList = cityList || []
      this.userProvinceList = provinceList || []

      // this.highTableItem = hightConsume.cityList ? hightConsume.cityList : []
      // this.highCityList = hightConsume.cityList ? hightConsume.cityList : []
      // this.highProvinceList = hightConsume.provinceList ? hightConsume.provinceList : []

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

  // changeTabs(key: string) {
  //   if (key == 'sales') {
  //     this.sensTableItem = this.promotionList
  //   } else {
  //     this.sensTableItem = this.commentList
  //   }
  // }

  userTabs(key: string) {
    if (key == 'city') {
      this.userTableItem = this.userCityList
    } else {
      this.userTableItem = this.userProvinceList
    }
  }
  // highTabs(key: string) {
  //   if (key == 'city') {
  //     this.highTableItem = this.highCityList
  //   } else {
  //     this.highTableItem = this.highProvinceList
  //   }
  // }

  @Watch('day')
  watchDay() {
    this.getLineData()
  }
}

</script>

<style lang='less' scoped>
.page {
  background-color: #f2f3f6;
}
.item-hots {
  padding-bottom: 57px;
  background: #fff;
}

.tab-nav {
  margin-top: 0;
  top: 88px;
  z-index: 11;
  /deep/ .van-tabs__nav {
    padding-left: 90px;
    padding-right: 90px;
  }
  /deep/ .van-tab {
    flex-basis: auto !important;
  }
}
.user-model {
  padding-bottom: 10px;
  border-bottom: solid 20px #f2f3f6;
  padding-top: 60px;
  background: #fff;
}
.items-market {
  border-top: solid 20px #f2f3f6;
  // border-bottom: solid 20px #f2f3f6;
  /deep/ .title {
    padding-top: 20px;
  }
}

.item-hairline {
  margin: 0 30px;
}

// .item-high {
//   margin-top: 60px;
// }
.item-user {
  padding-bottom: 60px;
}
.items {
  padding: 0 30px;
  background: #fff;
}
.select-time {
  padding: 69px 30px 15px;
}
// .movierival {
//   padding-bottom: 30px;
//   background: #f2f3f6;
// }
/deep/ .options-page {
  padding: 40px 30px 50px;
}
</style>
