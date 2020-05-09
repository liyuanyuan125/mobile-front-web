<template>
  <div class="content">
    <SentimentBar :title="brandInfo.brandName" :sidebar="sidebar" />

    <div class="brand-wrap">
      <brandInfoArea :brandInfo="brandInfo" :bubbleData="bubbleData" v-if="basicCode == 0" />
      <DataEmpty class="data-empty" :code="basicCode" :retry="brandDetail" v-if="basicCode > 0" />
    </div>

    <TabNav :list="navList" :top="87" hideHeader />

    <section class="brand-hot bg_fff" id="hot">
      <selectTime v-model="day" class="select-time" @click.native="talkingData" />
      <heatLineCom
        :overAllList="overAllHeatList"
        :platformList="platformHeatList"
        :params="platformParams"
        v-if="heatCode == 0"
        :overLoading="overLoading"
      />
      <DataEmpty :code="heatCode" :retry="getHotList" v-if="heatCode > 0" />
    </section>

    <section id="praise">
      <PraiseComment
        :favorable="brandInfo.favorable"
        :publicPraise="publicPraise"
        :link="getApplink('praiseHotWordsList')"
        class="praise"
      />
    </section>

    <section id="user">
      <UserPortrait
        :ageRangeList="userAnalysis.ageRangeList"
        :genderList="userAnalysis.genderList"
        type="1"
        :link="getApplink('userAnalysis')"
      />
    </section>

    <section id="event">
      <eventList
        :eventList="brandEventList"
        :params="eventParams"
        :link="getApplink('eventMarketingList')"
        class="bg_fff"
        v-if="eventCode == 0"
      />
      <DataEmpty :code="eventCode" :retry="eventAnalysis" v-if="eventCode > 0" />
    </section>

    <!-- <section id="part">
      <Competing :rivalList="rivalList" v-if="rivalCode == 0" />
      <DataEmpty :code="rivalCode" :retry="analysisList" v-if="rivalCode > 0" />
    </section>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { lastDays } from '@/util/timeSpan'
import TabNav, { TabNavItem } from '@/components/tabNav'
import { getList, brandList, eventAnalysisList, brandAnalysisList } from '@/api/brand'
import { selectTime } from '@/components/hotLine'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // 头部bar
import brandInfoArea from './components/brandInfo.vue' // 气泡+基础信息
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import UserPortrait from '@/views/common/user/userPortrait.vue' // 用户分析
import eventList from '@/views/common/eventList/event.vue' // 事件分析
import heatLineCom from '@/views/common/heatLineCom/index.vue' // 热度分析
import Competing from './components/competing.vue' // 竞品分析
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import { talkingdataHandle } from '@/util/TDEvent'

@Component({
  components: {
    SentimentBar,
    brandInfoArea,
    selectTime,
    heatLineCom,
    PraiseComment,
    UserPortrait,
    eventList,
    Competing,
    TabNav,
    DataEmpty
  }
})
export default class BrandPage extends ViewBase {
  @Prop({ type: Number, default: 0 }) id!: number

  navList: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' }
    // { name: 'part', label: '竞品' }
  ]

  basicCode = 0

  // 气泡
  bubbleData: any = {}
  brandInfo: any = {}

  // 热度分析+平台信息
  overLoading = false
  heatCode = 0
  day = 7
  overAllHeatList: any = []
  platformHeatList: any = []

  get platformParams() {
    const [startTime, endTime] = lastDays(this.day)
    return {
      type: 1, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.id, // 详情页id
      name: this.brandInfo.brandName,
      startTime,
      endTime
    }
  }

  // 口碑评论 数据
  publicPraise = {}

  // 用户分析
  userAnalysis = {}

  // 事件
  eventCode = 0
  eventParams = {}
  brandEventList: any = {}

  // 竞品分析
  // rivalCode = 0
  // rivalList = []
  rivalIds = []

  // 头部
  get sidebar() {
    let rivalObj = {}
    // 有竞品数据跳竞品报告页
    if (this.rivalIds.length) {
      rivalObj = {
        name: 'sentimentbrand-analyze',
        query: {
          ids: this.rivalIds.join(',')
        }
      }
    } else {
      // 无竞品的时候，跳设置竞品页
      rivalObj = {
        businessType: '1',
        businessObjectIdList: String(this.id)
      }
    }
    return {
      diggType: 1, // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
      diggId: this.id,
      rivalIds: rivalObj
    }
  }

  init() {
    this.brandDetail() // 品牌详情页
    this.getHotList() // 热度分析数据
    this.eventAnalysis() // 事件分析
    // this.analysisList() // 竞品分析
  }

  mounted() {
    this.init()
  }

  @Watch('$route', { deep: true })
  watchRoute() {
    this.init()
  }

  async brandDetail() {
    const brandId = this.id
    try {
      const {
        data: { brandInfo, brandOverView, publicPraise, userAnalysis }
      } = await brandList({ brandId })

      this.brandInfo = brandInfo || {} // 头部基础信息
      this.bubbleData = brandOverView || {} // 气泡数据
      this.publicPraise = publicPraise || {} // 口碑
      this.userAnalysis = userAnalysis || {} // 用户分析
      this.basicCode = 0
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
    }
  }

  async getHotList() {
    const [startTime, endTime] = lastDays(this.day)
    try {
      const {
        data: { overAllHeatList, platformHeatList }
      } = await getList({
        brandId: this.id,
        startTime,
        endTime
      })
      this.overAllHeatList = overAllHeatList || []
      this.platformHeatList = platformHeatList || []
      this.overLoading = true
      this.heatCode = 0
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.heatCode = code
      this.overLoading = true
    }
  }

  async eventAnalysis() {
    try {
      const { data } = await eventAnalysisList({
        type: 1,
        objectId: this.id
      })
      this.brandEventList = data
      this.eventCode = 0
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.eventCode = code
    }
  }

  // async analysisList() {
  //   try {
  //     const { data } = await brandAnalysisList({
  //       brandId: this.id
  //     })
  //     this.rivalList = data || []
  //     this.rivalIds = (data || []).map((it: any) => it.rivalId)
  //     this.rivalCode = 0
  //   } catch (ex) {
  //     const { code } = this.handleModuleError(ex)
  //     this.rivalCode = code
  //   }
  // }

  /**
   * 获取 applink
   * 业务类型 businessType 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
   * 业务Id businessObjectId
   * @page 页面标识
   */
  getApplink(page: string) {
    switch (page) {
      case 'userAnalysis':
        return {
          name: 'sentimentbrand-user',
          params: {
            brandId: this.id
          }
        }
      default:
        return {
          page,
          businessType: 1,
          businessObjectId: this.id
        }
    }
  }

  @Watch('day', { deep: true })
  watchDay() {
    this.getHotList()
  }

  talkingData() {
    talkingdataHandle('品牌详情页', '热度分析_日期筛选')
  }
}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import './less/com.less';
.content {
  background: #f2f3f6;
}
.select-time {
  padding: 60px 30px 30px;
}
.praise {
  overflow: hidden;
}
.bg_fff {
  background: #fff;
}
/deep/ .data-empty {
  padding-bottom: 200px;
}
</style>
