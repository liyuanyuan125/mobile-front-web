<template>
  <div class="content">
    <SentimentBar :title="actorInfo.actorName" :sidebar="sidebar" />
    <section class="info">
      <div class="header" v-if="show && basicCode == 0">
        <div class="left">
          <div>
            <img :src="coverImg" class="img" />
          </div>
        </div>
        <div class="right">
          <p class="kol-name">{{actorInfo.actorName}}</p>
          <p v-if="actorInfo.rankingName && !actorInfo.rankingId " class="event-name">
            <span style="    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              <i class="hid">{{actorInfo.rankingNum}}&nbsp;</i>
              <i class="bor">#{{actorInfo.rankingName}}</i>
            </span>
          </p>
          <p v-if="actorInfo.rankingName && actorInfo.rankingId">
            <router-link
              :to="{name: 'sentimenteventmarketing', params: {eventId: actorInfo.rankingId} , query: {title: actorInfo.rankingName}}"
              class="event-name flex-box"
            >
              <span style="    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <i class="hid">{{actorInfo.rankingNum}}&nbsp;</i>
                <i class="bor">#{{actorInfo.rankingName}}</i>
              </span>
              <Icon name="arrow" size="13" class="icon-arrow" />
            </router-link>
          </p>
        </div>
      </div>
      <DataEmpty :code="basicCode" :retry="getActorDetail" v-if="basicCode > 0" />
      <div class="dubble">
        <BubbleBottom :data="bubbleData" />
      </div>
      <div class="curve">
        <div class="curvetop"></div>
        <div class="curvebot"></div>
      </div>
    </section>

    <TabNav :list="list" class="formattab" />
    <section class="pane" id="hot">
      <!-- 热度分析 -->
      <selectTime ref="refsTime" v-model="day" class="select-time" />
      <heatLineCom
        :overAllList="overAllHeatList"
        :platformList="platformHeatList"
        :params="platformParams(actorInfo.actorName)"
        v-if="heatCode == 0"
      />
      <DataEmpty :code="heatCode" :retry="getHotList" v-if="heatCode > 0" />
    </section>

    <section class="pane" id="praise">
      <!-- 口碑评论 -->
      <PraiseComment
        v-if="show"
        :favorable="actorInfo.favorable"
        :publicPraise="publicPraise"
        :link="getApplink('praiseHotWordsList')"
      />
    </section>

    <section class="pane" id="user">
      <!-- 用户分析 -->
      <UserPortrait
        v-if="show"
        :genderList="userAnalysis.genderList"
        :ageRangeList="userAnalysis.ageRangeList"
        :link="getApplink('userAnalysis')"
      />
    </section>

    <section v-if="showevent" class="pane" id="event">
      <!-- 营销事件 -->
      <Event 
        :eventList="eventList" 
        :link="getApplink('eventMarketingList')"
        v-if="eventCode == 0"
      />
      <DataEmpty :code="eventCode" :retry="getEventList" v-if="eventCode > 0" />
    </section>

    <section v-if="showuser" class="pane" id="part">
      <!-- 相似艺人 -->
      <ModuleHeader 
        title="相似艺人"
        style='padding: 40px 15px 0 15px;'
      />
      <Competing :pkUserList="pkUserList" :pkIdList="pkIdList" v-if="rivalCode == 0" />
      <DataEmpty :code="rivalCode" :retry="getPkUser" v-if="rivalCode > 0" />

    </section>

    <section
      v-if="show"
      class="pane"
      id="work"
    >
      <!-- 作品分析 -->
      <Works :worksAnalysis="worksAnalysis" :link="getApplink('actorWorksAnalysis')" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Tab, Tabs, Icon } from 'vant'
import TabNav, { TabNavItem } from '@/components/tabNav'
import { lastDays } from '@/util/timeSpan'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { selectTime } from '@/components/hotLine'
import heatLineCom from '@/views/common/heatLineCom/index.vue' // 热度分析
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import UserPortrait from '@/views/common/user/userPortrait.vue'
import Event from '@/views/common/eventList/event.vue' // 事件跟踪
import Competing from './components/competing.vue'
import Works from './components/works.vue'
import { toast } from '@/util/toast'
import { BubbleLeft, BubbleBottom, BubbleItem, Title } from '@/components/bubble'
import { getList, getActorDetail, getPkUser, getEventList } from '@/api/kol'
import { alert } from '@/util/toast'
import { imgFixed } from '@/fn/imgProxy'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import ModuleHeader from '@/components/moduleHeader'

@Component({
  components: {
    Tab,
    Tabs,
    Icon,
    BubbleBottom,
    selectTime,
    heatLineCom,
    SentimentBar,
    PraiseComment,
    UserPortrait,
    Event,
    Competing,
    Works,
    TabNav,
    DataEmpty,
    ModuleHeader
  }
})
export default class KolPage extends ViewBase {
  show: any = false
  showuser: any = false
  showevent: any = false

  title: any = '用户分析'

  // 详情
  basicCode = 0
  // 热度
  heatCode = 0
  // 事件
  eventCode = 0
  // 对比
  rivalCode = 0

  sidebar = {
    diggType: '2',
    diggId: '',
    rivalIds: {}
  }
  // 艺人基本信息
  actorInfo = {}
  coverImg: any = ''
  // 气泡数据概览
  bubbleData: any = []
  // tab导航
  list: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    { name: 'part', label: '竞品' },
    { name: 'work', label: '作品' }
  ]

  // 热度分析+平台信息
  day = 7
  overAllHeatList: any = []
  platformHeatList: any = []
  platformParams(name: any) {
    const [startTime, endTime] = lastDays(this.day)
    return {
      type: 2, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.$route.params.actorId, // 详情页id
      name,
      startTime,
      endTime
    }
  }
  // 用户分析
  userAnalysis: any = {}
  // 口碑评论 数据
  publicPraise = {}
  // 事件跟踪
  eventList: any = {}
  // 作品分析
  worksAnalysis: any = {}

  pkUserList: any = []

  pkIdList: any = []

  created() {
    this.sidebar.diggId = this.$route.params.actorId
    // 无竞品的时候，跳设置竞品页
    this.sidebar.rivalIds = {
      businessType: '2',
      businessObjectIdList: String(this.$route.params.actorId)
    }
    this.getActorDetail()
    this.getHotList()
    this.getPkUser()
    this.getEventList()
    // document.body.style.background = '#FBFBFB'
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
          name: 'sentimentactoruser',
          params: {
            actorId: this.$route.params.actorId
          },
          query: {
            title: this.title
          }
        }
      case 'actorWorksAnalysis':
        return {
          page,
          // businessType: 2,
          actorId: this.$route.params.actorId
        }
      default:
        return {
          page,
          businessType: 2,
          businessObjectId: this.$route.params.actorId
        }
    }
  }

  async getHotList() {
    const [startTime, endTime] = lastDays(this.day)
    try {
      const {
        data: { overAllHeatList, platformHeatList }
      } = await getList({
        actorId: this.$route.params.actorId,
        startTime,
        endTime
      })
      this.overAllHeatList = overAllHeatList || []
      this.platformHeatList = platformHeatList || []
      this.heatCode = 0
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.heatCode = code
    }
  }

  async getActorDetail() {
    this.show = false
    try {
      const {
        data: {
          actorInfo, // 艺人基本信息
          actorOverView, // 气泡数字概览
          publicPraise, // 口碑
          userAnalysis, // 用户分析
          worksAnalysis // 作品分析
        }
      } = await getActorDetail({ actorId: this.$route.params.actorId })
      this.actorInfo = actorInfo
      this.title = actorInfo.actorName
      this.coverImg = imgFixed(actorInfo.coverUrl, 172, 172, 4)
      this.bubbleData = [
        {
          type: '1',
          value: actorOverView == null ? ' ' : actorOverView.interactCount,
          trend: actorOverView == null ? 0 : actorOverView.interactTrend,
          renderTitle: (h: any) => {
            return h(Title, {
              props: {
                title: `近90日新增互动`
              },
              on: {
                click: this.showNote
              }
            })
          }
        },
        {
          type: '2',
          title: '全网粉丝数',
          value: actorOverView == null ? ' ' : actorOverView.fansCount,
          trend: actorOverView == null ? 0 : actorOverView.fansTrend,
          showdown: true
        },
        {
          type: '3',
          title: '实时热度',
          value: actorOverView == null ? ' ' : actorOverView.heatCount,
          trend: actorOverView == null ? 0 : actorOverView.heatTrend,
          showdown: true
        },
        {
          type: '4',
          title: '好感度',
          value: actorOverView == null ? '-' : (actorInfo.favorable == null ? '-' : actorInfo.favorable)
        }
      ]
      this.publicPraise = publicPraise
      this.userAnalysis = userAnalysis || {}
      this.worksAnalysis = worksAnalysis || {}
      this.basicCode = 0
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
      // this.songEmpty = true
      // this.rankAnnularEmpty = true
    } finally {
      this.show = true
    }
  }

  async getPkUser() {
    this.showuser = false
    this.pkIdList = []
    try {
      const pkUser = await getPkUser({ actorId: this.$route.params.actorId })
      this.pkUserList = pkUser.data || []
      this.pkIdList = (pkUser.data || [])
        .map((it: any) => {
          return it.rivalId
        })
        .slice(0, 3)
      if (this.pkIdList.length) {
        // 有竞品数据跳竞品报告页
        this.sidebar.rivalIds = {
          name: 'sentimentkolproducts',
          query: {
            ids: this.pkIdList.join(',')
          }
        }
      }
      this.rivalCode = 0
      this.showuser = true
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.rivalCode = code
    } finally {
      this.showuser = true
    }
  }

  async getEventList() {
    this.showevent = false
    try {
      const event = await getEventList({
        objectId: this.$route.params.actorId,
        type: 2
      })
      this.eventList = event.data
      this.eventCode = 0
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.eventCode = code
    } finally {
      this.showevent = true
    }
  }

  // 显示说明
  showNote() {
    alert({
      title: '提示',
      message: '互动数为物料的点赞、转发、阅读及播放数之和',
      showConfirmButton: true,
      className: 'alertwid'
    })
  }

  @Watch('day', { deep: true })
  watchDay() {
    this.getHotList()
  }

  @Watch('$route', { deep: true })
  watchRoute() {
    this.sidebar.diggId = this.$route.params.actorId
    // 无竞品的时候，跳设置竞品页
    this.sidebar.rivalIds = {
      businessType: '2',
      businessObjectIdList: String(this.$route.params.actorId)
    }
    this.day = 7
    this.getHotList()
    this.getActorDetail()
    this.getPkUser()
    this.getEventList()
  }
}
</script>

<style lang="less" scoped>
// @import '~@/views/sentiment/brand/less/lib.less';
// @import './less/com.less';

.info {
  padding-bottom: 30px;
  position: relative;
}
.content {
  background: #f2f3f6;
}
.header {
  display: flex;
  padding: 88px 40px 0;
  // position: relative;
  .left {
    width: 33%;
    div {
      width: 172px;
      height: 172px;
      border-radius: 50%;
      overflow: hidden;
      background: url('../../../../assets/actordefault.png') no-repeat center center;
      background-size: cover;
      border: 1px solid #d4d4d4;
      img {
        // width: 172px;
        height: 172px;
        border-radius: 50%;
        // background-color: #fff;
      }
    }
  }
  .right {
    width: 65%;
  }
  .kol-name {
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    margin-top: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .event-name {
    margin-top: 12px;
    font-size: 26px;
    font-weight: 300;
    color: rgba(136, 170, 246, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      .hid {
        color: rgba(48, 48, 48, 1);
      }
      .bor {
        text-decoration: underline;
      }
    }
    .icon-arrow {
      padding-left: 10px;
      padding-top: 6px;
    }
  }
}
.dubble {
  padding: 0 4vw;
  margin-top: -4.73333vw;
  position: relative;
  z-index: 12;
  height: 49.33333vw;
  overflow: hidden;
}
/deep/ .bubble-warper-bottom {
  .mask {
    opacity: 0;
  }
}
.bg-header {
  width: 100%;
  height: 120px;
}
.line-height {
  height: 50px;
  width: 100%;
  background: #fff;
}
.pane {
  min-height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
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
/deep/ .event-content {
  border-top: 0;
}
/deep/ .options-page {
  border-top: 0;
}
/deep/ .userportrait {
  border-top: 0;
}
.alertwid {
  width: 90%;
}
.select-time {
  padding: 30px 30px 15px;
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
  flex-basis: 16.6% !important;
}

.curve {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}
.curvetop {
  background: #fff;
  &::before {
    content: '';
    display: block;
    background-color: #f2f3f6;
    height: 60px;
    border-radius: 0 0 60px 0;
  }
}
.curvebot {
  background: #f2f3f6;
  &::before {
    content: '';
    display: block;
    background-color: #fff;
    height: 60px;
    border-radius: 60px 0 0 0;
  }
}
</style>
