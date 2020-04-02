<template>
  <div class='pages'>
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList 
      type="2" 
      :rivalList="rivalList" 
      v-if="rivalList.length"
      class="movierival"
      @setRival="changeIds"
    />
    <TabNav
      :list ="list"
      class="tab-nav"
      normal
    />
    <section class="pane" id="hot" style='padding-bottom: 30px;border-top: 0px;'>
      <selectTime v-model="day" class="select-time"  ref="reftimes"/>
      <heatContrast 
        style='padding-top: 33px; background: #FFF;'
        :overAllHeat="combinedHeat.overAllHeat"
        :interactList="combinedHeat.interactList"
        :materialList="combinedHeat.materialList"
        :tabs="combinedHeat.tabs"
        />
    </section>

    <section v-if='showpraise' class="pane" id="praise" style='padding-top: 20px;padding-right:15px;'>
      <!-- 口碑评论 -->
      <div class='public'>
        <MarketContrast :fetch="publicPraise.fetch" :query="publicPraise.query" />
      </div>
    </section>

    <section class="pane" id="user">
      <!-- 用户分析 -->
      <div class='userpk'>
        <div class='usertitle'>用户对比</div>
        <!-- 平台分布 -->
        <Table :title='publicObj.title' :tabList='publicObj.tabList' :tableTitle='publicObj.tableTitle' :tableItem='publicObj.tableItem'/>
        <!-- </div> -->
        <div class='hr' style='margin-top: 50px'>
          <p></p>
        </div>
        <!-- 年龄分布 -->
        <Age :ageRangeList='ageRangeList' />
        <div class='hr' style='margin-bottom: 40px'>
          <p></p>
        </div>
        <!-- 性别分布 -->
        <div class='title'>性别分布</div>
        <div class='main-show'>
          <VsList
            :data="sexdata"
            class="chart"
          />
        </div>
        <div class='hr' style='margin-bottom: 40px'>
          <p></p>
        </div>
        <!-- 用户地域分布对比 -->
        <Table :title='regionObj.title' :tabList='regionObj.tabList' :tableTitle='regionObj.tableTitle' :tableItem='regionObj.tableItem' @chgregionPk='chgregionPk'/>
      </div>
    </section>     
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import RivalList from '@/views/common/rivalList/index.vue' // 竞品列表
 import { lastDays } from '@/util/timeSpan'
import { selectTime } from '@/components/hotLine' // 日期选择
import heatContrast from '@/views/common/heatContrast/index.vue' // 热度分析对比
import MarketContrast from '@/views/common/marketContrast/index.vue' // 口碑评论对比
import Age from '@/views/common/ageDistribution/index.vue'
import VsList, { VsItem } from '@/components/vsList'
import Table from '@/views/common/table/table.vue'
import TabNav, { TabNavItem } from '@/components/tabNav'
import { rivalPraise , rivalanaly , rivalHeatAnalysis } from '@/api/kol'

import { toast } from '@/util/toast'
import { Tab, Tabs } from 'vant'

@Component({
  components: {
    Tab,
    Tabs,
    selectTime,
    heatContrast,
    MarketContrast,
    Age,
    VsList,
    Table,
    TabNav,
    SentimentBar,
    RivalList
  }
})
export default class KolPage extends ViewBase {

  sidebar = {
    diggType: 'actor',
    diggId: '100038',
    rivalIds: '1,2,4'
  }

  ids: any = null

  show: any = false
  showpraise: any = false

  item: any = null

  rivalList: any = []

  // active: any = 0
  day = 7
  // 热度分析数据
  combinedHeat: any = {
    // 综合对比数据值
    overAllHeat: [],
    // 新增互动
    interactList: [],
    // 新增物料
    materialList: [],
    tabs: [
      {key: 0, text: '粉丝数'},
      {key: 1, text: '新增互动数'}
    ]
  }
  // 口碑评论
  publicPraise: any = {
    // fetch: async () => { const data = awiat rivalPraise{id: 123 }）return data }
  }
  // 平台分布
  publicObj: any = {
    title: '平台分布',
    tabList: [],
    tableTitle: [
      {
        key: 'yiren',
        value: '艺人'
      },
      {
        key: 'top1',
        value: 'TOP1'
      },
      {
        key: 'top2',
        value: 'TOP2'
      },
      {
        key: 'top3',
        value: 'TOP3'
      },
      {
        key: 'top4',
        value: 'TOP4'
      },
      {
        key: 'top5',
        value: 'TOP5'
      },
    ],
    tableItem: []
  }
  // 性别分布
  sexdata: VsItem[] = []
  // 地域数据
  userRegion: any = {}
  // 年龄分布数据
  ageRangeList = []

  // 用户地域分布
  regionObj: any = {
    title: '用户地域分布对比',
    tabList: [
      {
        name: '城市分布',
        key: 'city'
      },
      {
        name: '省份分布',
        key: 'province'
      }
    ],
    tableTitle: [
      {
        key: 'yiren',
        value: '艺人'
      },
      {
        key: 'top1',
        value: 'TOP1'
      },
      {
        key: 'top2',
        value: 'TOP2'
      },
      {
        key: 'top3',
        value: 'TOP3'
      },
      {
        key: 'top4',
        value: 'TOP4'
      },
      {
        key: 'top5',
        value: 'TOP5'
      },
    ],
    tableItem: []
  }
  list: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
  ]

  created() {
    this.ids = this.$route.query.ids
    this.getLineData()
    this.getDetail()
    this.getPublicPraise()
  }

  async getLineData() {
    const [ startTime, endTime ] = lastDays(this.day)
    try {
      const { data: {
        overAllHeat,
        platform: {
          interactList,
          fansCountList
        }
      }} = await rivalHeatAnalysis({
        actorIdList: this.ids,
        startTime,
        endTime
      })
      this.combinedHeat.overAllHeat = overAllHeat || []
      this.combinedHeat.interactList = fansCountList || []
      this.combinedHeat.materialList = interactList || []
    } catch (ex) {
      toast(ex)
    }
  }

  async getPublicPraise() {
    try {
      const  data = await rivalPraise({
        actorIdList: this.ids,
        startTime: 20200304,
        endTime: 20200311
      })
      this.publicPraise.query = {
        actorIdList: this.ids,
      }
      // const as = this.publicPraise.query
      this.publicPraise.fetch = async (query: any) => { // query: 查询参数
        const datas = await rivalPraise(query)
        return datas
      }
    } catch (ex) {
      toast(ex)
    } finally {
      this.showpraise = true
    }
  }

  async getDetail() {
    try {
       const {
         data: {
           rivalList,
           platformList,
           ageRangeList,
           genderList,
           userRegion,
         }
       } = await rivalanaly({actorIdList: this.ids})
       this.rivalList = rivalList
       this.publicObj.tableItem = platformList
       this.ageRangeList = ageRangeList
       this.sexdata = (genderList || []).map((it: any) => {
         return {
           name: it.rivalName,
           rate1: 98.8,
           rate2: 1.2
         }
       })
       this.userRegion = userRegion
       this.regionObj.tableItem = userRegion.cityList
    } catch (ex) {
      toast(ex)
    }
  }
  // 用户地域分布对比
  chgregionPk(num: any) {
    if (num == 'province') {
      this.regionObj.tableItem = this.userRegion.provinceList
    } else if (num == 'city') {
      this.regionObj.tableItem = this.userRegion.cityList
    }
  }

  // 设置竞品对手
  changeIds(ids: string) {
    this.ids = ids
    // this.init()
    this.getLineData()
    this.getDetail()
    this.getPublicPraise()
  }

  @Watch('day')
  watchDay() {
    this.getLineData()
  }
}
</script>

<style lang="less" scoped>
.pages {
  width: 100%;
  background: #f2f3f6;
}
.userpk {
  background: #fff;
  margin-top: 20px;
  .usertitle {
    padding: 50px 30px;
    height: 60px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 60px;
  }
  .title {
    padding-left: 30px;
    height: 34px;
    font-size: 34px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 34px;
    margin-top: 30px;
    // margin-bottom: 40px;
  }
}
.public {
  background: #fff;
  margin-top: 20px;
}

// /deep/ .van-tab {
//   font-weight: 500;
//   color: rgba(48, 48, 48, 1);
//   // line-height: 100px;
//   font-size: 30px;
// }
// /deep/ .van-tab--active, /deep/ .van-tabs__line {
//   color: #88aaf6;
// }
// /deep/ .van-tabs__line {
//   background-color: #88aaf6;
// }
.pane {
  // padding: 15px;
  min-height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
  border-top: 20px solid #f2f3f6;
}

.pane-head {
  font-size: 40px;
  font-weight: 500;
}

.sub-pane {
  min-height: 88px;
  border-top: 1px solid #d8d8d8;
  padding-top: 30px;
  &:first-child {
    border-top: 0;
  }
}

.sub-pane-head {
  font-size: 34px;
  font-weight: 500;
}

.sub-pane-body {
  min-height: 188px;
}
.main-show {
  padding: 30px;
}
/deep/ .options-page {
  padding-left: 30px;
}
/deep/ .module-title, /deep/ h3 {
  height: 34px;
  font-weight: 500;
  font-size: 34px !important;
  color: rgba(48, 48, 48, 1);
  line-height: 34px;
  margin-top: 48px;
  // margin-bottom: 40px;
}
/deep/ h3 {
  margin-bottom: 40px;
}
.hr {
  width: 100%;
  padding: 0 30px;
  height: 1px;
  p {
    display: block;
    width: 100%;
    height: 1px;
    background: rgba(216, 216, 216, 1);
    opacity: 0.5;
  }
}
.select-time {
  padding: 69px 30px 15px;
}
// /deep/ .van-tabs__line {
//   width: 60px!important;
// }
// /deep/ .tab-nav {
//   margin-top: 0;
//   top: 88px;
//   z-index: 11;
//   // &::before {
//   //   display: none;
//   // }
//   /deep/ .van-tab {
//     flex-basis: auto !important;
//   }

// }
.tab-nav {
  margin-top: 0;
  top: 88px;
  z-index: 11;
  /deep/ .van-tabs__nav {
    padding-left: 190px;
    padding-right: 190px;
  }
  /deep/ .van-tab {
    flex-basis: auto !important;
  }
}
// /deep/ nav.formattab .van-tab {
//   flex-basis: auto !important;
// }
</style>
