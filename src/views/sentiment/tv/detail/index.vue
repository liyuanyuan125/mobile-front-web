<template>
  <div class="page">
    <SentimentBar :title="tvInfo.tvName" :sidebar="sidebar" />
    <BaseInfoArea :baseInfo="tvInfo" :overView="tvOverView" />
    <TabNav :list="tabList" class="formattab" />
    <div class="hotanalysis" id="hot">
      <heatLineCom
        :overAllList="overAllHeat"
        :platformList="platformHeat"
        :params="platformParams"
      />
    </div>
    <PlayTrend
      :fetch="playTrendFetch"
      :query="tvId"
      v-if="tvId"
      :link="getApplink('tvPlayCountDetail')"
    />
    <PraiseComment
      :favorable="tvInfo.favorable"
      :publicPraise="publicPraise"
      :link="getApplink('praiseHotWordsList')"
      id="praise"
    />
    <UserPortrait
      :ageRangeList="userAnalysis.ageRangeList"
      :genderList="userAnalysis.genderList"
      id="user"
      :link="getApplink('userAnalysis')"
    />
    <EventList :eventList="eventList" id="event" :link="getApplink('eventMarketingList')" />
    <RivalAnalysis :rivalList="rivalAnalysis" id="rival" />
    <ActorList :actorList="actorList" id="actor" :link="getApplink('actorList')" />
    <ProduceList :produceList="produceList" :link="getApplink('produceDistribute')" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { getTvDetail, getEventList, getRivalList, getTvHeat, getTvPlay } from './data'
import moment from 'moment'
import { lastDays } from '@/util/timeSpan'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import BaseInfoArea from './components/tvInfo.vue' // 电视剧基本信息
import TabNav, { TabNavItem } from '@/components/tabNav'
import { selectTime } from '@/components/hotLine'
import heatLineCom from '@/views/common/heatLineCom/index.vue'
import PlayTrend from './components/playTrend.vue' // 播放量监控
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import UserPortrait from '@/views/common/user/userPortrait.vue'
import EventList from '@/views/common/eventList/event.vue' // 事件跟踪
import RivalAnalysis from './components/rivalAnalysis.vue' // 竞品分析
import ActorList from '@/views/common/actorList/index.vue' // 主创人员
import ProduceList from '@/views/common/produceList/index.vue' // 出品发行
// import hotLine from '@/components/hotLine'

@Component({
  components: {
    SentimentBar,
    BaseInfoArea,
    TabNav,
    selectTime,
    heatLineCom,
    PlayTrend,
    PraiseComment,
    UserPortrait,
    EventList,
    RivalAnalysis,
    ActorList,
    ProduceList
  }
})
export default class TVPage extends ViewBase {
  // 顶部 topbar 传参
  sidebar = {
    diggType: 4, // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
    diggId: '',
    rivalIds: {} // 竞争对手的 url
  }
  // 电视剧id
  tvId: string = ''
  // 电视剧详细信息
  tvInfo: any = {}
  // 电影数据概览
  tvOverView: any = {}
  // 热度分析
  overAllHeat: any = []
  platformHeat: any = []
  // 播放量监控
  playTrend: any = []
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
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    { name: 'rival', label: '竞品' },
    { name: 'actor', label: '资料' }
  ]
  // 热度分析+平台信息
  get platformParams() {
    const [startTime, endTime] = lastDays(90)
    return {
      type: 4, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.tvId, // 详情页id
      name: this.tvInfo.tvName,
      startTime,
      endTime
    }
  }

  async created() {
    this.tvId = this.$route.params.tvId
    this.sidebar.diggId = this.tvId
    // 无竞品的时候，跳设置竞品页
    this.sidebar.rivalIds = {
      businessType: '4',
      businessObjectIdList: String(this.tvId)
    }
    if (this.tvId) {
      await this.getTVInfo()
      await this.getHeat90()
      await this.getEventList()
      await this.getRivalList()
    }
  }
  // api获取电影详情页
  async getTVInfo() {
    const res: any = await getTvDetail(this.tvId)
    this.tvInfo = res.tvInfo
    this.tvOverView = res.tvOverView
    this.publicPraise = res.publicPraise
    this.userAnalysis = res.userAnalysis
    this.actorList = res.actorList ? res.actorList : []
    this.produceList = res.produceList ? res.produceList : []
    // document.title = res.tvInfo.tvName
  }

  // api获取最近90天的热度
  async getHeat90() {
    const [startTime, endTime] = lastDays(90)
    const res: any = await getTvHeat({
      tvId: this.tvId,
      startTime,
      endTime
    })
    this.overAllHeat = res.overAllHeat
    this.platformHeat = res.platformHeat
  }

  // api获取营销事件
  async getEventList() {
    const res: any = await getEventList({
      type: 4,
      objectId: this.tvId
    })
    this.eventList = res
  }

  // api获取竞品对手
  async getRivalList() {
    const res: any = await getRivalList(this.tvId)
    this.rivalAnalysis = res || []
    const ids = []
    if (res && this.rivalAnalysis) {
      for (const el of res) {
        ids.push(el.rivalId)
      }
      // 有竞品数据跳竞品报告页
      this.sidebar.rivalIds = {
        name: 'sentimenttvrivalanalysis',
        query: {
          ids: ids.slice(0, 3).join(',')
        }
      }
    }
  }

  // api获取播放量监控
  playTrendFetch = async (query: any) => {
    const res: any = await getTvPlay(query)
    return res
  }

  /**
   * 获取 applink
   * 业务类型 businessType 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
   * 业务Id businessObjectId
   * @page 页面标识
   */
  getApplink(page: string) {
    switch (page) {
      // 有户分析
      case 'userAnalysis':
        return {
          name: 'sentimenttvuseranalysis',
          params: {
            tvId: this.tvId
          }
        }
      case 'tvPlayCountDetail':
        // 播放量监控
        return {
          page,
          tvId: this.tvId
        }
      default:
        return {
          page,
          businessType: 4,
          businessObjectId: this.tvId
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
