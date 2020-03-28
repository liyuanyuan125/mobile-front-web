<template>
  <div class="page">
    <SentimentBar :title="tvInfo.tvName" :sidebar="sidebar" />
    <BaseInfoArea :baseInfo="tvInfo" :overView="tvOverView" />
    <TabNav :list="tabList" class="formattab" />
    <div class="hotanalysis" id="hot">
      <selectTime ref="refsTime" v-model="day" class="select-time" />
      <heatLineCom
        :overAllList="overAllHeat"
        :platformList="platformHeat"
        :params="platformParams"
      />
    </div>
    <PlayTrend :dataTrend="playTrend" :link="getApplink('tvPlayCountDetail')" />
    <PraiseComment
      :favorable="tvInfo.favorable"
      :publicPraise="publicPraise"
      :link="getApplink('praiseHotWordsList')"
      v-if="publicPraise.appraiseList"
      id="praise"
    />
    <UserPortrait
      :ageRangeList="userAnalysis.ageRangeList"
      :genderList="userAnalysis.genderList"
      id="user"
      :link="getApplink('userAnalysis')"
      :title="tvInfo.tvName"
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
import { getTvDetail, getEventList, getRivalList } from './data'
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
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    { name: 'rival', label: '竞品' },
    { name: 'actor', label: '资料' }
  ]
  // 热度分析+平台信息
  day = 7
  overAllHeatList: any = []
  platformHeatList: any = []
  get platformParams() {
    const [startTime, endTime] = lastDays(this.day)
    return {
      type: 4, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.tvId, // 详情页id
      name: this.tvInfo.tvName,
      startTime,
      endTime
    }
  }
  overAllHeat = [
    {
      date: 1583978358078,
      value: 123,
      eventList: [
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        },
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        },
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        },
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        },
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        }
      ]
    },
    {
      date: 1583978358078,
      value: 323,
      eventList: [
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        },
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        },
        {
          eventName: '意大利紧急求助中国',
          eventId: '123232'
        }
      ]
    }
  ]
  platformHeat = [
    {
      platformName: '新浪',
      platformValueList: [
        {
          name: '微博数',
          value: '9,876'
        },
        {
          name: '互动量',
          value: '9,876.5万'
        }
      ],
      platformLogo: {
        source: 'jydata',
        url:
          'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
      },
      platformId: '1',
      platformNotice: '媒体一 媒体二 媒体三'
    },
    {
      platformName: '新浪',
      platformValueList: [
        {
          name: '微博数',
          value: '9,876'
        },
        {
          name: '互动量',
          value: '9,876.5万'
        }
      ],
      platformLogo: {
        source: 'jydata',
        url:
          'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
      },
      platformId: '2',
      platformNotice: '媒体一 媒体二 媒体三'
    },
    {
      platformName: '新浪',
      platformValueList: [
        {
          name: '微博数',
          value: '9,876'
        },
        {
          name: '互动量',
          value: '9,876.5万'
        }
      ],
      platformLogo: {
        source: 'jydata',
        url:
          'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
      },
      platformId: '3',
      platformNotice: '媒体一 媒体二 媒体三'
    },
    {
      platformName: '新浪',
      platformValueList: [
        {
          name: '微博数',
          value: '9,876'
        },
        {
          name: '互动量',
          value: '9,876.5万'
        }
      ],
      platformLogo: {
        source: 'jydata',
        url:
          'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
      },
      platformId: '4',
      platformNotice: '媒体一 媒体二 媒体三'
    }
  ]
  playTrend = {
    dailyFormList: [
      {
        date: 1583979099061,
        platformList: [
          {
            platformName: '爱奇艺',
            platformValue: '1,321.5万'
          }
        ],
        markName: '上线首日'
      },
      {
        date: 1583970088061,
        platformList: [
          {
            platformName: '爱奇艺',
            platformValue: '1,321'
          }
        ],
        markName: ''
      },
      {
        date: 1583109088061,
        platformList: [
          {
            platformName: '爱奇艺',
            platformValue: '321.5万'
          }
        ],
        markName: ''
      }
    ],
    playDataList: [
      {
        platformName: '腾讯视频',
        dataList: [
          {
            date: 1583979088061,
            value: 12
          },
          {
            date: 1583979088061,
            value: 323
          },
          {
            date: 1583979088061,
            value: 1323
          },
          {
            date: 1583979088061,
            value: 12323
          }
        ]
      }
    ]
  }

  async created() {
    this.tvId = this.$route.params.tvId
    this.sidebar.diggId = this.tvId
    if (this.tvId) {
      await this.getTVInfo()
      await this.getEventList()
      await this.getRivalList()
    }
  }
  // api获取电影详情页
  async getTVInfo() {
    const res: any = await getTvDetail(this.tvId)
    this.tvInfo = res.tvInfo
    this.tvOverView = res.tvOverView
    this.boxOffice = res.boxOffice
    this.publicPraise = res.publicPraise
    this.userAnalysis = res.userAnalysis
    this.actorList = res.actorList ? res.actorList : []
    this.produceList = res.produceList ? res.produceList : []
    document.title = res.tvInfo.tvName
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
    this.rivalAnalysis = res
    const ids = []
    if (res && res.length) {
      for (const el of res) {
        ids.push(el.rivalId)
      }
    }
    this.sidebar.rivalIds = {
      name: 'sentimentmovierivalanalysis',
      query: {
        ids: ids.join(',')
      }
    }
  }

  // 监测热度分析的日期选择
  @Watch('day', { deep: true })
  watchDay() {
    this.platformParams
    // this.getHeatAnalysis()
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
