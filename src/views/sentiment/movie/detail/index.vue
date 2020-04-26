<template>
  <div class="page">
    <SentimentBar :title="movieInfo ? movieInfo.movieNameCn : '电影详情'" :sidebar="sidebar" />
    <BaseInfoArea :baseInfo="movieInfo" :overView="movieOverView" v-if="!basicCode" />
    <DataEmpty :code="basicCode" :retry="getMovieInfo" v-if="basicCode > 0" />
    <TabNav :list="tabList" class="formattab" />
    <div class="hotanalysis" id="hot">
      <heatLineCom
        :overAllList="overAllHeat"
        :platformList="platformHeat"
        :params="platformParams"
        v-if="!heatCode"
      />
      <DataEmpty :code="heatCode" :retry="getHeatAnalysis" v-if="heatCode > 0" />
    </div>
    <WantSeeTrend :fetch="wantSeeTrendFetch" :query="movieId" />
    <BoxOffice :boxoffice="boxOffice" :link="getApplink('movieBoxOffice')" id="boxoffice" />
    <PraiseComment
      :favorable="movieInfo ? movieInfo.favorable : null"
      :publicPraise="publicPraise"
      :link="getApplink('praiseHotWordsList')"
      id="praise"
    />
    <UserPortrait
      :ageRangeList="userAnalysis && userAnalysis.ageRangeList"
      :genderList="userAnalysis && userAnalysis.genderList"
      id="user"
      :link="getApplink('userAnalysis')"
    />
    <EventList
      :eventList="eventList"
      id="event"
      :link="getApplink('eventMarketingList')"
      v-if="!eventCode"
    />
    <DataEmpty :code="eventCode" :retry="getEventList" v-if="eventCode > 0" />
    <!-- <RivalAnalysis :rivalList="rivalAnalysis" id="rival" v-if="!rivalCode" />
    <DataEmpty :code="rivalCode" :retry="getRivalList" v-if="rivalCode > 0" />-->
    <ActorList :actorList="actorList" id="actor" :link="getApplink('actorList')" />
    <ProduceList :produceList="produceList" :link="getApplink('produceDistribute')" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import {
  getMovieDetail,
  getEventList,
  getRivalList,
  getMovieHeat,
  getMovieWantSeeTrend
} from './data'
import moment from 'moment'
import { lastDays } from '@/util/timeSpan'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import BaseInfoArea from './components/movieInfo.vue' // 影片基本信息
import TabNav, { TabNavItem } from '@/components/tabNav'
import { selectTime } from '@/components/hotLine'
import heatLineCom from '@/views/common/heatLineCom/index.vue'
import WantSeeTrend from './components/wantSeeTrend.vue' // 想看趋势
import BoxOffice from './components/boxOffice.vue' // 影片票房
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import UserPortrait from '@/views/common/user/userPortrait.vue'
import EventList from '@/views/common/eventList/event.vue' // 事件跟踪
import RivalAnalysis from './components/rivalAnalysis.vue' // 竞品分析
import ActorList from '@/views/common/actorList/index.vue' // 主创人员
import ProduceList from '@/views/common/produceList/index.vue' // 出品发行
import { talkingdataHandle } from '@/util/TDEvent'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    DataEmpty,
    SentimentBar,
    BaseInfoArea,
    TabNav,
    selectTime,
    heatLineCom,
    WantSeeTrend,
    BoxOffice,
    PraiseComment,
    UserPortrait,
    EventList,
    RivalAnalysis,
    ActorList,
    ProduceList
  }
})
export default class MoviePage extends ViewBase {
  // 顶部 topbar 传参
  sidebar = {
    diggType: 3, // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
    diggId: '',
    rivalIds: {} // 竞争对手的 url
  }
  // 错误码
  basicCode: number = 0 // 基本信息
  heatCode: number = 0 // 热度分析
  eventCode: number = 0 // 营销事件
  rivalCode: number = 0 // 竞品分析
  wantSeeCode: number = 0 // 想看
  // 电影id
  movieId: string = ''
  // 电影详细信息
  movieInfo: any = {}
  // 电影数据概览
  movieOverView: any = {}
  // 综合热度
  overAllHeat = []
  // 平台热度
  platformHeat = []
  // 电影票房
  boxOffice: any = {}
  // 口碑
  publicPraise: any = {}
  // 用户名称
  userAnalysis: any = {}
  // 营销事件
  eventList: any = {}
  // 竞品分析
  rivalAnalysis: any = []
  // 主创人员
  actorList: any = []
  // 出品发行
  produceList: any = []
  // 二级导航
  tabList: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'boxoffice', label: '票房' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    // { name: 'rival', label: '竞品' },
    { name: 'actor', label: '资料' }
  ]
  // 热度分析+平台信息
  get platformParams() {
    const [startTime, endTime] = lastDays(90)
    return {
      type: 3, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.movieId, // 详情页id
      name: this.movieInfo ? this.movieInfo.movieNameCn : '电影详情',
      startTime,
      endTime
    }
  }

  created() {
    this.init()
  }

  @Watch('$route')
  watchRouter() {
    this.init()
  }

  async init() {
    this.movieId = this.$route.params.movieId
    this.sidebar.diggId = this.movieId
    // 无竞品的时候，跳设置竞品页
    this.sidebar.rivalIds = {
      businessType: '3',
      businessObjectIdList: String(this.movieId)
    }
    await this.getMovieInfo()
    await this.getHeatAnalysis()
    await this.getEventList()
    // await this.getRivalList()
  }

  // api获取电影详情页
  async getMovieInfo() {
    try {
      const res: any = await getMovieDetail(this.movieId)
      this.movieInfo = res.movieInfo
      this.movieOverView = res.movieOverView
      this.boxOffice = res.boxOffice
      this.publicPraise = res.publicPraise
      this.userAnalysis = res.userAnalysis
      this.actorList = res.actorList ? res.actorList : []
      this.produceList = res.produceList ? res.produceList : []
      this.basicCode = 0
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
    }
  }

  // api获取热度分析
  async getHeatAnalysis() {
    try {
      const [startTime, endTime] = lastDays(90)
      const res: any = await getMovieHeat({
        movieId: this.movieId,
        startTime,
        endTime
      })
      this.overAllHeat = res.overAllHeatList || []
      this.platformHeat = res.platformHeatList || []
      this.heatCode = 0
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.heatCode = code
    }
  }

  // api获取想看趋势
  wantSeeTrendFetch = async (query: any) => {
    const res: any = await getMovieWantSeeTrend(query)
    return res
  }

  // api获取营销事件
  async getEventList() {
    try {
      const res: any = await getEventList({
        type: 3,
        objectId: this.movieId
      })
      this.eventList = res
      this.eventCode = 0
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.eventCode = code
    }
  }

  // api获取竞品对手
  async getRivalList() {
    try {
      const res: any = await getRivalList(this.movieId)
      this.rivalAnalysis = res
      this.rivalCode = 0
      const ids = []
      if (res && res.length > 1) {
        for (const el of res) {
          ids.push(el.rivalId)
        }
        // 有竞品数据跳竞品报告页
        this.sidebar.rivalIds = {
          name: 'sentimentmovierivalanalysis',
          query: {
            ids: ids.slice(0, 3).join(',')
          }
        }
      }
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.rivalCode = code
    }
  }

  /**
   * 获取 applink
   * 业务类型 businessType 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
   * 业务Id businessObjectId
   * @page 页面标识
   */
  getApplink(page: string) {
    switch (page) {
      // 用户分析
      case 'userAnalysis':
        return {
          name: 'sentimentmovieuseranalysis',
          params: {
            movieId: this.movieId
          }
        }
      case 'movieBoxOffice':
        // 票房
        return {
          page,
          boxOfficeType: 1,
          movieId: this.movieId
        }
      default:
        return {
          page,
          businessType: 3,
          businessObjectId: this.movieId
        }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  color: #303030;
}
/deep/ nav.formattab {
  margin-top: 0;
  top: 88px;
  z-index: 11;
  &::before {
    display: none;
  }
}
/deep/ nav.formattab .van-tab {
  flex-basis: 14.2% !important;
}
.hotanalysis {
  margin-top: 40px;
  .heat {
    padding: 0 30px 30px;
  }
}
.select-time {
  padding: 0 30px 30px;
}
</style>
