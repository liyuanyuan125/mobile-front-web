<template>
  <main class="main-page">
    <section class="header" @click="popupShow = true">
      <figure class="header-fig">
        <img :src="cover">
      </figure>
      <div class="header-main">
        <h1 class="header-title">{{name}}</h1>
        <div class="header-bar">{{singer}}</div>
        <div class="header-bar">单曲 / {{releaseDate}} / {{releasePlatform}}</div>
        <div class="header-bar">{{rankingNum}} <a>{{rankingName}}</a></div>
      </div>
    </section>

    <Popup
      v-model="popupShow"
      position="bottom"
      round
      closeable
      class="popup-props"
    >
      <div class="popup-wrap">
        <div class="popup-title">简介</div>
        <CellGroup class="popup-list" v-if="popupData">
          <Cell
            v-for="{ name, value } in popupData"
            :key="name"
            :title="name"
            :value="value"
            class="popup-cell"
          />
        </CellGroup>
      </div>
    </Popup>

    <div class="bubble-wrap">
      <BubbleBottom :data="bubbleData" class="bubble-bottom"/>
    </div>

    <TabNav
      :list="navList"
      class="tab-nav"
    />

    <section class="pane pane-hot" id="hot">
      <ModuleHeader title="热度分析"/>
      <HeatLineCom
        :overAllList="overAllHeatList"
        :platformList="platformHeatList"
        :params="params"
      />
    </section>

    <section class="pane">
      <ModuleHeader title="播放量分析"/>
      <PlayStats :view="playStatsList" class="play-stats"/>
    </section>

    <section class="pane">
      <ModuleHeader
        title="榜单表现"
        :link="{ page: 'songRankPerformance', songId: id }"
      />
      <ul class="rank-list" v-if="rankAnalysis">
        <li class="rank-item">
          <em>{{rankAnalysis.rankCount}}</em>
          <i>上榜数量</i>
        </li>
        <li class="rank-item rank-item-best">
          <em>{{rankAnalysis.rankBest}}</em>
          <i>最佳排名</i>
        </li>
        <li class="rank-item">
          <em>{{rankAnalysis.rankType}}</em>
          <i>榜单类型</i>
        </li>
      </ul>

      <ModuleHeader title="上榜数量分布" tag="h4" class="rank-header"/>

      <AnnularChart
        :data="annularData"
        :width="345"
        class="rank-chart"
        v-if="annularData"
      />
    </section>

    <section class="pane praise-pane" id="praise">
      <PraiseComment
        :favorable="praiseData.favorable"
        :publicPraise="praiseData.publicPraise"
        :link="businessPage('praiseHotWordsList')"
        v-if="praiseData"
      />
    </section>

    <section class="pane user-pane" id="user">
      <UserPortrait
        :ageRangeList="userAnalysis.ageRangeList"
        :genderList="userAnalysis.genderList"
        :colorList="['#7CA4FF', '#FF6262']"
        :link="{ name: 'sentiment-song-user', params: { id } }"
        v-if="userAnalysis"
      />
    </section>

    <section class="pane event-pane" id="event">
      <EventList
        eventName='营销事件'
        :eventList="eventData"
        :params="{}"
        :link="businessPage('eventMarketingList')"
      />
    </section>

    <section class="pane">
      <ModuleHeader title="音乐人分析"/>
      <Swipe class="singer-swipe" v-if="singerList">
        <SwipeItem
          v-for="it in singerList"
          :key="it.singerId"
        >
          <div class="singer-card">
            <img :src="it.singerCover.url" class="singer-avatar">
            <div class="singer-main">
              <h4 class="singer-name">{{it.singerName}}</h4>
              <div class="singer-bar">
                <span class="singer-count">昨日热度 <em>{{it.heatCount}}</em></span>
                <span
                  class="singer-trend"
                  :class="it.heatTrend < 0 ? 'singer-down' : ''"
                  v-if="it.heatTrend"
                >
                  <i class="singer-symbol">{{it.heatTrend > 0 ? '↑' : '↓'}}</i>
                  <em>{{it.heatTrend}}</em>
                </span>
              </div>
            </div>
          </div>
        </SwipeItem>
      </Swipe>
    </section>

    <section class="pane" id="part">
      <ModuleHeader title="相似歌曲"/>
      <ul class="similar-list">
        <li
          v-for="it in similarList"
          :key="it.rivalId"
          class="similar-item"
        >
          <router-link
            :to="{ name: $route.name, params: { id: it.rivalId } }"
            class="similar-item-in"
          >
            <img :src="it.rivalCover.url" class="similar-cover">
            <div class="similar-main">
              <h4 class="similar-name">{{it.rivalName}}</h4>
              <div class="similar-author">{{it.rivalDesc}}</div>
              <ul class="similar-stats">
                <li class="similar-stats-item">
                  <i class="similar-stats-type">累计播放量</i>
                  <em class="similar-count">{{it.playingCount}}</em>
                  <span
                    class="similar-trend"
                    :class="it.playingTrend < 0 ? 'similar-down' : ''"
                    v-if="it.playingTrend"
                  >
                    <i class="similar-symbol">{{it.playingTrend > 0 ? '高' : '低'}}</i>
                    <em>{{it.playingTrendText}}</em>
                  </span>
                </li>
                <li class="similar-stats-item">
                  <i class="similar-stats-type">累计互动量</i>
                  <em class="similar-count">{{it.interactCount}}</em>
                  <span
                    class="similar-trend"
                    :class="it.interactTrend < 0 ? 'similar-down' : ''"
                    v-if="it.interactTrend"
                  >
                    <i class="similar-symbol">{{it.interactTrend > 0 ? '高' : '低'}}</i>
                    <em>{{it.interactTrendText}}</em>
                  </span>
                </li>
              </ul>
              <div class="similar-event" v-if="it.eventName">
                <div class="similar-event-name">{{it.eventName}}</div>
                <div class="similar-event-date">{{it.eventDate}}</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>

      <div class="similar-more">
        <router-link
          :to="{ name: 'sentiment-song-rival', params: { ids: similarIds } }"
          class="similar-button"
        >查看详细报告</router-link>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import TabNav, { TabNavItem } from '@/components/tabNav'
import { getDetail, getHotAnalysis, getPlayAnalysis, getEventList, getSimilarList } from './data'
import ModuleHeader from '@/components/moduleHeader'
import { BubbleBottom } from '@/components/bubble'
import HeatLineCom from '@/views/common/heatLineCom/index.vue'
import PlayStats, { PlayItem } from '@/views/common/playStats'
import PraiseComment from '@/views/common/praiseComment/index.vue'
import UserPortrait from '@/views/common/user/userPortrait.vue'
import EventList from '@/views/common/eventList/event.vue'
import { lastDays } from '@/util/timeSpan'
import AnnularChart from '@/components/cakeChart/annularChart.vue'
import { dot } from '@jydata/fe-util'
import { Swipe, SwipeItem, Popup, Cell, CellGroup } from 'vant'
import { toThousands, formatValidDate } from '@/util/dealData'

@Component({
  components: {
    TabNav,
    ModuleHeader,
    BubbleBottom,
    HeatLineCom,
    PlayStats,
    AnnularChart,
    PraiseComment,
    UserPortrait,
    EventList,
    Swipe,
    SwipeItem,
    Popup,
    Cell,
    CellGroup,
  }
})
export default class extends ViewBase {
  @Prop({ type: Number }) id!: number

  navList: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    { name: 'part', label: '竞品' },
  ]

  cover = ''

  name = ''

  singer = ''

  releaseDate = ''

  releasePlatform = ''

  rankingNum = ''

  rankingName = ''

  popupShow = false

  popupData: any = null

  bubbleData: any[] = []

  // 热度分析+平台信息
  overAllHeatList: any = []

  platformHeatList: any = []

  playStatsList: PlayItem[] = []

  get params() {
    return {
      type: 4, // 1 品牌 2 艺人 3 电影 4 音乐-单曲 5 音乐-专辑  6 剧集
      id: 1, // 详情页id
      name: '奔驰',
      startTime: 20200304, // this.startTime,
      endTime: 20200310 // this.endTime
    }
  }

  rankAnalysis: any = null

  annularData: any = null

  praiseData: any = null

  userAnalysis: any = null

  eventData: any = null

  singerList: any = null

  similarList: any = null

  get similarIds() {
    if (this.similarList == null) {
      return ''
    }
    const ids = (this.similarList as any[]).map(it => it.rivalId)
    return ids.join(',')
  }

  businessPage(page: string) {
    return {
      page,
      businessType: 5,
      businessObjectId: this.id
    }
  }

  created() {
    this.init()
  }

  init() {
    this.getBasic()
    this.getHot()
    this.getPlay()
    this.getEvent()
    this.getSimilar()
  }

  async getBasic() {
    try {
      const {
        songInfo = {},
        basisDataList = [],
        songOverView = {},
        rankAnalysis = {},
        publicPraise = {},
        userAnalysis = {},
        singerAnalysisList = {},
      } = await getDetail(this.id)
      this.cover = dot(songInfo, 'songCover.url')
      this.name = songInfo.songName || ''
      this.singer = songInfo.songSinger || ''
      this.releaseDate = songInfo.releaseDate || ''
      this.releasePlatform = songInfo.releasePlatform || ''
      this.rankingNum = songInfo.rankingNum || ''
      this.rankingName = songInfo.rankingName || ''
      this.popupData = basisDataList || []
      this.bubbleData = [
        {
          type: 1,
          title: '累计播放量',
          value: songOverView.playCount,
          trend: songOverView.playTrend,
        },
        {
          type: 2,
          title: '累计互动量',
          value: songOverView.interactCount,
          trend: songOverView.interactTrend,
        },
        {
          type: 3,
          title: '综合热度',
          value: songOverView.heatCount,
          trend: songOverView.heatTrend,
        },
        { type: 4, title: '好感度', value: songInfo.favorable },
      ]
      this.rankAnalysis = rankAnalysis
      this.annularData = {
        data: rankAnalysis.platformList || []
      }
      this.praiseData = {
        favorable: songInfo.favorable,
        publicPraise,
      }
      this.userAnalysis = userAnalysis
      this.singerList = singerAnalysisList
    } catch (ex) {
      this.handleError(ex)
    }
  }

  async getHot() {
    try {
      const [ startTime, endTime ] = lastDays(7)
      const {
        overAllHeatList = [],
        platformHeatList = []
      } = await getHotAnalysis({
        songId: this.id,
        startTime,
        endTime
      })
      this.overAllHeatList = overAllHeatList
      this.platformHeatList = platformHeatList
    } catch (ex) {
      this.handleError(ex)
    }
  }

  async getPlay() {
    try {
      const [ startTime, endTime ] = lastDays(7)
      const {
        songMusicView,
        videoView
      } = await getPlayAnalysis({
        songId: this.id,
        startTime,
        endTime
      })
      const playStatsList = []
      songMusicView && playStatsList.push({ label: '单曲', view: songMusicView })
      videoView && playStatsList.push({ label: '视频', view: videoView })
      this.playStatsList = playStatsList
    } catch (ex) {
      this.handleError(ex)
    }
  }

  async getEvent() {
    try {
      const eventData = await getEventList({})
      this.eventData = eventData
    } catch (ex) {
      this.handleError(ex)
    }
  }

  async getSimilar() {
    try {
      const list = await getSimilarList({
        songId: this.id
      })
      this.similarList = list.map(item => ({
        ...item,
        playingTrendText: toThousands(item.playingTrend),
        interactTrendText: toThousands(item.interactTrend),
        eventDate: formatValidDate(item.eventCreateTime)
      }))
    } catch (ex) {
      this.handleError(ex)
    }
  }

  @Watch('id')
  watchId() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.main-page {
  background-color: #f2f3f6;
  padding-bottom: 8px;
}

.header {
  display: flex;
  height: 480px;
  background-color: #f2f3f6;
  padding: 40px;
}

.header-fig {
  display: flex;
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 100%;
  border: 15px solid #303030;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.header-main {
  margin-left: 30px;
}

.header-title {
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 10px;
}

.header-bar {
  font-size: 26px;
  font-weight: 300;
  line-height: 1.7;
}

.popup-props {
  top: 20%;
  left: 20px;
  right: 20px;
  width: calc(100% - 40px);
  overflow: hidden;
  /deep/ .van-popup__close-icon {
    top: 28px;
    right: 25px;
    color: #303030;
    font-size: 36px;
  }
}

.popup-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}

.popup-title {
  font-size: 34px;
  margin-top: 40px;
  text-align: center;
}

.popup-list {
  padding: 10px 55px 88px;

  &::after {
    display: none;
  }

  /deep/ .van-cell__title,
  /deep/ .van-cell__value {
    flex: auto;
    font-size: 30px;
  }

  /deep/ .van-cell__title {
    font-weight: 300;
    color: rgba(48, 48, 48, .5);
  }

  /deep/ .van-cell__value {
    min-width: 380px;
    max-width: 380px;
    text-align: left;
    color: #303030;
  }
}

.popup-cell {
  line-height: 1.33333;
  padding: 25px 20px 25px 5px;
}

.bubble-wrap {
  position: absolute;
  top: 250px;
  width: 100%;
  z-index: 999;
  pointer-events: none;
  overflow: hidden;
}

.bubble-bottom {
  position: relative;
  left: 32px;
}

.tab-nav {
  /deep/ .van-tab {
    flex-basis: 20% !important;
  }
}

.pane {
  padding: 50px 30px 30px;
  min-height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
}

.pane-hot {
  padding-left: 0;
  padding-right: 0;
  /deep/ .module-header {
    padding: 0 0 20px 30px;
  }
}

.play-stats {
  margin-top: -52px;
}

.rank-list {
  display: flex;
  height: 130px;
  background-color: rgba(242, 243, 246, .5);
  border-radius: 10px;
  align-items: center;
  margin-top: 36px;
}

.rank-item {
  position: relative;
  flex: 1;
  text-align: center;

  em, i {
    display: block;
  }
  em {
    font-size: 40px;
    font-family: DINAlternate-Bold, DINAlternate, serif;
    font-weight: 600;
    line-height: 50px;
  }
  i {
    font-size: 24px;
    font-family: PingFangSC-Light, PingFang SC, serif;
    font-weight: 300;
    color: rgba(48, 48, 48, .6);
    line-height: 26px;
  }

  &:last-child {
    em {
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC, serif;
    }
  }
}

.rank-item-best {
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 16px;
    width: 1px;
    height: 50px;
    background-color: rgba(216, 216, 216, .5);
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
}

.rank-header {
  margin-top: 32px;
  z-index: 88;
}

.rank-chart {
  margin: -50px 0 -55px;
}

.praise-pane {
  /deep/ .options-page {
    padding: 0;
    border-top: 0;
  }
  /deep/ .module-header {
    padding: 0;
  }
  /deep/ .options-top {
    padding: 30px 40px 0 40px;
  }
  /deep/ .options-bottom {
    margin: 5px 0 20px;
  }
}

.user-pane {
  /deep/ .userportrait {
    height: 400px;
    border-top: 0;
    padding: 0;
  }

  /deep/ .module-header {
    padding: 0;
  }
}

.event-pane {
  /deep/ .event-content {
    border-top: 0;
    padding: 0;
  }

  /deep/ .module-header {
    padding: 0;
  }

  /deep/ .eventlist {
    padding: 30px 0 20px;
  }
}

.singer-swipe {
  margin: 46px 0 20px;
  padding-bottom: 46px;
  /deep/ .van-swipe__indicators {
    bottom: 0;
  }
  /deep/ .van-swipe__indicator {
    width: 14px;
    height: 14px;
    background-color: rgba(172, 172, 172, .4);
    &:not(:last-child) {
      margin-right: 30px;
    }
  }
  /deep/ .van-swipe__indicator--active {
    background-color: #88aaf6;
  }
}

.singer-card {
  display: flex;
}

.singer-avatar {
  width: 130px;
  height: 130px;
  border-radius: 100%;
  border: 1px solid #d8d8d8;
  object-fit: contain;
}

.singer-main {
  flex: 1;
  margin-left: 46px;
  color: #47403b;
}

.singer-name {
  font-size: 32px;
  font-family: PingFangSC-Semibold, PingFang SC, serif;
  font-weight: 600;
  margin-top: 10px;
}

.singer-bar {
  font-size: 30px;
  font-family: PingFangSC-Regular, PingFang SC, serif;
  margin-top: 20px;
}

.singer-trend {
  position: relative;
  top: -3px;
  left: 12px;
  font-size: 26px;
  font-family: DINAlternate-Bold, DINAlternate, serif;
  font-weight: bold;
  color: #ff6262;
  vertical-align: top;
}

.singer-down {
  color: #88aaf6;
}

.similar-list {
  margin-top: -10px;
}

.similar-item {
  margin-top: 60px;
}

.similar-item-in {
  display: flex;
}

.similar-cover {
  position: relative;
  top: 4px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  object-fit: contain;
}

.similar-main {
  flex: 1;
  margin-left: 40px;
  color: #303030;
}

.similar-name {
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC, serif;
  font-weight: 500;
}

.similar-author {
  font-size: 26px;
  font-family: SanFranciscoDisplay-Light, SanFranciscoDisplay, serif;
  font-weight: 300;
  margin-top: 2px;
  color: rgba(48, 48, 48, .7);
}

.similar-stats {
  display: flex;
  margin-top: 18px;
}

.similar-stats-item {
  flex: 1;
  margin-top: 2px;
}

.similar-stats-type,
.similar-count,
.similar-trend {
  display: block;
}

.similar-stats-type {
  height: 36px;
  line-height: 36px;
  font-size: 26px;
  font-family: PingFangSC-Light, PingFang SC, serif;
  font-weight: 300;
  color: rgba(48, 48, 48, .4);
}

.similar-count {
  height: 60px;
  line-height: 60px;
  font-size: 46px;
  font-family: DINAlternate-Bold, DINAlternate, serif;
  font-weight: bold;
}

.similar-trend {
  position: relative;
  top: -1px;
  left: 0;
  height: 36px;
  line-height: 36px;
  font-size: 26px;
  font-family: DINAlternate-Bold, DINAlternate, serif;
  font-weight: bold;
  color: #ff6262;
  vertical-align: top;
}

.similar-down {
  color: #88aaf6;
}

.similar-event {
  display: flex;
  line-height: 60px;
  margin-top: 16px;
  padding: 0 20px;
  background-color: rgba(242, 243, 246, .5);
  font-size: 26px;
  font-family: PingFangSC-Light, PingFang SC, serif;
  font-weight: 300;
  color: rgba(48, 48, 48, .8);
}

.similar-event-name {
  flex: 1;
}

.similar-event-date {
  font-size: 22px;
  font-family: SanFranciscoDisplay-Light, SanFranciscoDisplay, serif;
  font-weight: 300;
  color: rgba(48, 48, 48, .4);
}

.similar-more {
  text-align: center;
  margin: 60px 0 30px;
}

.similar-button {
  display: inline-block;
  width: 400px;
  height: 90px;
  line-height: 90px;
  border-radius: 55px;
  border: 2px solid #88aaf6;
  color: #88aaf6;
  letter-spacing: 1px;
}
</style>
