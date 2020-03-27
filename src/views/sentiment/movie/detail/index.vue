<template>
  <div class="page">
    <SentimentBar :title="movieInfo.movieNameCn" :sidebar="sidebar" />
    <BaseInfoArea :baseInfo="movieInfo" :overView="movieOverView" />
    <TabNav :list="tabList" class="formattab" />
    <div class="hotanalysis" id="hot">
      <selectTime ref="refsTime" class="heat" />
      <heatLineCom :overAllList="overAllHeat" :platformList="platformHeat" :params="params" />
    </div>
    <WantSeeTrend :dataTrend="wantSeeTrend" />
    <BoxOffice :boxoffice="boxOffice" :link="getApplink('movieBoxOffice')" id="boxoffice" />
    <PraiseComment
      :favorable="movieInfo.favorable"
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
import { getMovieDetail, getEventList, getRivalList, getMovieHeat } from './data'
import moment from 'moment'
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
// import hotLine from '@/components/hotLine'

@Component({
  components: {
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
  // 电影id
  movieId: string = ''
  // 电影详细信息
  movieInfo: any = {}
  // 电影数据概览
  movieOverView: any = {}
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
    { name: 'rival', label: '竞品' },
    { name: 'actor', label: '资料' }
  ]
  // 热度分析传参
  get params() {
    return {
      type: 3, // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
      id: 1, // 详情页id
      name: '奔驰',
      startTime: 20200304, // this.startTime,
      endTime: 20200310 // this.endTime
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
  wantSeeTrend = {
    dailyGainList: [
      {
        date: 1584622361149,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 1300
      },
      {
        date: 1584622361149,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 32132
      },
      {
        date: 1584622361149,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 323132
      },
      {
        date: 1584622361149,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 12313
      },
      {
        date: 1584622361149,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 320
      }
    ],
    totalGainList: [
      {
        date: 1583979088061,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      }
    ]
  }

  async created() {
    console.log('refsTime', this.$refs.refsTime)
    this.movieId = this.$route.params.movieId
    this.sidebar.diggId = this.movieId
    if (this.movieId) {
      await this.getMovieInfo()
      await this.getEventList()
      await this.getRivalList()
      await this.getHeatAnalysis()
    }
  }
  // api获取电影详情页
  async getMovieInfo() {
    const res: any = await getMovieDetail(this.movieId)
    this.movieInfo = res.movieInfo
    this.movieOverView = res.movieOverView
    this.boxOffice = res.boxOffice
    this.publicPraise = res.publicPraise
    this.userAnalysis = res.userAnalysis
    this.actorList = res.actorList ? res.actorList : []
    this.produceList = res.produceList ? res.produceList : []
    document.title = res.movieInfo.movieNameCn
  }
  // api获取热度分析
  async getHeatAnalysis() {
    const res: any = await getMovieHeat(this.params)
    console.log('params', res)
  }
  // api获取营销事件
  async getEventList() {
    const res: any = await getEventList({
      type: 3,
      objectId: this.movieId
    })
    this.eventList = res
  }
  // api获取竞品对手
  async getRivalList() {
    const res: any = await getRivalList(this.movieId)
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
          name: 'sentimentmovieuseranalysis',
          params: {
            movieId: this.movieId
          }
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
</style>
