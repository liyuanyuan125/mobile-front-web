<template>
  <main
    class="main-page"
    :class="isAlbum ? 'main-page-album' : 'main-page-song'"
  >
    <SentimentBar
      :sidebar="{
        diggType: isAlbum ? 'album' : 'song',
        diggId: id,
      }"
      titleShow
    />

    <section class="header">
      <figure class="header-fig">
        <img :src="basic.cover">
        <div class="header-price">{{basic.price}}</div>
      </figure>
      <div class="header-main">
        <h1 class="header-title">{{basic.name}}</h1>
        <div class="header-singer">{{basic.singer}}</div>
        <div class="header-release" @click="popupShow = true">{{basic.release}}</div>
        <div class="header-ranking">{{basic.rankingNum}} <a>{{basic.rankingName}}</a></div>
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

    <section class="pane pane-hot" id="hot" v-if="!isAlbum">
      <ModuleHeader title="热度分析"/>
      <HeatLineCom
        :overAllList="overAllHeatList"
        :platformList="platformHeatList"
        :params="params"
      />
    </section>

    <section class="pane" id="play">
      <ModuleHeader :title="isAlbum ? '销量分析' : '播放量分析'"/>
      <PlayStats :fetch="playFetch" :isAlbum="isAlbum" class="play-stats"/>
    </section>

    <section class="pane" id="song" v-if="isAlbum">
      <ModuleHeader title="歌曲热度"/>
      <div class="song-wrap" ref="songWrap">
        <ul class="song-list" ref="songList">
          <li class="song-head">
            <span class="song-heat">热度值</span>
            <span class="song-comment">评论量</span>
          </li>
          <li
            v-for="song in songList"
            :key="song.id"
            class="song-item"
          >
            <router-link
              :to="{ name: 'sentiment-song', params: { id: song.id } }"
              class="song-name"
              v-html="song.name"
            >
            </router-link>
            <span class="song-heat">{{song.heatCount}}</span>
            <span class="song-comment">{{song.commentCount}}</span>
          </li>
        </ul>
      </div>
      <a
        class="song-more"
        @click="handleSongMore"
        v-if="songList.length > 5"
      >{{ songUnfold ? '收起更多' : '展开更多' }}</a>
    </section>

    <section class="pane" v-if="!isAlbum">
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
        :colorList="['#7ca4ff', '#ff6262']"
        :link="{
          name: isAlbum ? 'sentiment-album-user' : 'sentiment-song-user',
          params: { id }
        }"
        v-if="userAnalysis"
      />
    </section>

    <section class="pane event-pane" id="event">
      <EventList
        eventName="营销事件"
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
            <img :src="it.avatar" class="singer-avatar">
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

    <section class="pane" id="rival">
      <ModuleHeader title="相似歌曲"/>
      <ul class="rival-list">
        <li
          v-for="it in rivalList"
          :key="it.id"
          class="rival-item"
        >
          <router-link
            :to="it.link"
            class="rival-item-in"
          >
            <figure class="rival-fig">
              <img :src="it.cover">
            </figure>
            <div class="rival-main">
              <h4 class="rival-name">{{it.name}}</h4>
              <div class="rival-author">{{it.author}}</div>
              <ul class="rival-stats">
                <li
                  v-for="stats in it.statsList"
                  :key="stats.type"
                  class="rival-stats-item"
                >
                  <i class="rival-stats-type">{{stats.type}}</i>
                  <em class="rival-count">{{stats.count}}</em>
                  <span
                    class="rival-trend"
                    :class="{
                      'rival-up': stats.trend > 0,
                      'rival-down': stats.trend < 0,
                    }"
                  >
                    <i class="rival-symbol" v-if="stats.trend">{{stats.trend > 0 ? '高' : '低'}}</i>
                    <em>{{stats.trendText}}</em>
                  </span>
                </li>
              </ul>
              <div class="rival-event" v-if="it.eventName">
                <div class="rival-event-name">{{it.eventName}}</div>
                <div class="rival-event-date">{{it.eventDate}}</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>

      <div class="rival-more">
        <router-link
          :to="{
            name: isAlbum ? 'sentiment-album-rival' : 'sentiment-song-rival',
            query: { ids: rivalIds }
          }"
          class="rival-button"
        >查看详细报告</router-link>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import TabNav, { TabNavItem } from '@/components/tabNav'
import ModuleHeader from '@/components/moduleHeader'
import { BubbleBottom } from '@/components/bubble'
import HeatLineCom from '@/views/common/heatLineCom/index.vue'
import PlayStats, { PlayQuery } from './components/playStats'
import PraiseComment from '@/views/common/praiseComment/index.vue'
import UserPortrait from '@/views/common/user/userPortrait.vue'
import EventList from '@/views/common/eventList/event.vue'
import AnnularChart from '@/components/cakeChart/annularChart.vue'
import { Swipe, SwipeItem, Popup, Cell, CellGroup } from 'vant'
import { lastDays } from '@/util/timeSpan'
import {
  basicEmpty,
  getBasic,
  getHeatAnalysis,
  getPlayAnalysis,
  getEventList,
  getRivalList,
} from './detailData'

@Component({
  components: {
    SentimentBar,
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

  @Prop({ type: Boolean, default: false }) isAlbum!: boolean

  get navList(): TabNavItem[] {
    const list = this.isAlbum
    ? [
      { name: 'play', label: '销量' },
      { name: 'song', label: '歌曲' },
      { name: 'praise', label: '口碑' },
      { name: 'user', label: '用户' },
      { name: 'event', label: '事件' },
      { name: 'rival', label: '竞品' },
    ]
    : [
      { name: 'hot', label: '热度' },
      { name: 'praise', label: '口碑' },
      { name: 'user', label: '用户' },
      { name: 'event', label: '事件' },
      { name: 'rival', label: '竞品' },
    ]
    return list
  }

  basic: any = basicEmpty()

  popupShow = false

  popupData: any = null

  bubbleData: any[] = []

  // 热度分析+平台信息
  overAllHeatList: any = []

  platformHeatList: any = []

  get params() {
    // 1 品牌 2 艺人 3 电影 4 音乐-单曲 5 音乐-专辑  6 剧集
    const type = this.isAlbum ? 5 : 4
    return {
      type,
      id: this.id, // 详情页id
      name: '奔驰',
      startTime: 20200304, // this.startTime,
      endTime: 20200310 // this.endTime
    }
  }

  songList: any[] = []

  songUnfold = false

  songInitHeight = 0

  rankAnalysis: any = null

  annularData: any = null

  praiseData: any = null

  userAnalysis: any = null

  eventData: any = null

  singerList: any = null

  rivalList: any = null

  get rivalIds() {
    if (this.rivalList == null) {
      return ''
    }
    const ids = (this.rivalList as any[]).map(it => it.id)
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
    try {
      this.getBasic()
      !this.isAlbum && this.getHeat()
      this.getEvent()
      this.getRival()
    } catch (ex) {
      this.handleError(ex)
    }
  }

  async getBasic() {
    const {
      // 基础信息
      basic,
      // 基础信息弹出窗
      popupData,
      // 气泡
      bubbleData,

      // 专辑：歌曲热度
      songList,

      // 单曲：榜单表现
      rankAnalysis,
      // 单曲：上榜数量分布
      annularData,

      // 口碑评论
      praiseData,

      // 用户分析
      userAnalysis,

      // 音乐人分析
      singerList,
    } = await getBasic(this.id, this.isAlbum) as any
    this.basic = basic
    this.popupData = popupData
    this.bubbleData = bubbleData
    this.songList = songList
    this.rankAnalysis = rankAnalysis
    this.annularData = annularData
    this.praiseData = praiseData
    this.userAnalysis = userAnalysis
    this.singerList = singerList
  }

  // 单曲：热度分析 TODO:
  async getHeat() {
    const [ startTime, endTime ] = lastDays(7)
    const {
      overAllHeatList = [],
      platformHeatList = []
    } = await getHeatAnalysis({
      songId: this.id,
      startTime,
      endTime
    })
    this.overAllHeatList = overAllHeatList
    this.platformHeatList = platformHeatList
  }

  async getEvent() {
    const eventData = await getEventList({}, this.isAlbum)
    this.eventData = eventData
  }

  async getRival() {
    const list = await getRivalList(this.id, this.isAlbum)
    this.rivalList = list
  }

  async playFetch(query: PlayQuery) {
    try {
      const data = await getPlayAnalysis(this.id, query, this.isAlbum)
      return data
    } catch (ex) {
      this.handleError(ex)
    }
  }

  handleSongMore() {
    const wrap = this.$refs.songWrap as HTMLDivElement
    if (this.songInitHeight == 0) {
      const height = this.songInitHeight = wrap.offsetHeight
      wrap.style.height = `${height}px`
    }
    this.$nextTick(() => {
      const list = this.$refs.songList as HTMLDivElement
      const listHeight = list.offsetHeight + 10
      const toHeight = this.songUnfold ? this.songInitHeight : listHeight
      wrap.style.height = `${toHeight}px`
      this.songUnfold = !this.songUnfold
    })
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
  padding: 88px 0 8px;
}

.main-page-album {
  /deep/ .tab-nav .van-tab {
    flex-basis: 16.666% !important;
  }

  .header-fig {
    top: 33px;
    width: 210px;
    height: 210px;
    border: 0;
    border-radius: 0;
    background-color: #fff;
    overflow: visible;

    &::before {
      content: '';
      position: absolute;
      top: -33px;
      width: 190px;
      height: 190px;
      border-radius: 100%;
      background-color: #000;
    }

    img {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      z-index: 8;
    }
  }

  .header-price {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding-right: 28px;
    text-align: right;
    color: #fff;
    font-size: 24px;
    background-color: rgba(0, 0, 0, .6);
    border-radius: 0 0 10px 10px;
    z-index: 18;
  }

  .rival-fig {
    top: 33px;
    overflow: visible;

    &::before {
      content: '';
      position: absolute;
      top: -33px;
      width: 190px;
      height: 190px;
      border-radius: 100%;
      background-color: #000;
    }

    img {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 8;
    }
  }
}

.header {
  display: flex;
  height: 480px;
  background-color: #f2f3f6;
  padding: 40px 0 40px 40px;
}

.header-fig {
  position: relative;
  display: flex;
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border: 15px solid #303030;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

.header-singer,
.header-release,
.header-ranking {
  font-size: 26px;
  font-weight: 300;
  height: 46px;
  line-height: 46px;
}

.header-release {
  &::after {
    content: '';
    display: inline-block;
    width: 38px;
    height: 100%;
    background: url(./assets/more.png) no-repeat center;
    background-size: 30px 30px;
    vertical-align: top;
  }
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
  top: 338px;
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
  top: 100px;
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

.song-wrap {
  margin-top: 45px;
  height: 390px;
  overflow: hidden;
  transition: height 300ms;
}

.song-list {
  color: #acacac;
  font-size: 26px;
}

.song-head {
  display: flex;
  padding-left: 360px;
  margin-bottom: 5px;
}

.song-item {
  display: flex;
  margin-bottom: 37px;
}

.song-name {
  width: 360px;
  padding-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #303030;
  /deep/ em {
    color: #88aaf6;
  }
}

.song-heat,
.song-comment {
  flex: 1;
}

.song-more {
  display: block;
  height: 48px;
  line-height: 48px;
  margin: 20px 0 8px;
  color: #88aaf6;
  font-size: 30px;
  text-align: center;
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

.rival-list {
  margin-top: -10px;
}

.rival-item {
  margin-top: 60px;
}

.rival-item-in {
  display: flex;
}

.rival-fig {
  position: relative;
  display: flex;
  top: 4px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.rival-main {
  flex: 1;
  margin-left: 40px;
  color: #303030;
}

.rival-name {
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC, serif;
  font-weight: 500;
}

.rival-author {
  font-size: 26px;
  font-family: SanFranciscoDisplay-Light, SanFranciscoDisplay, serif;
  font-weight: 300;
  margin-top: 2px;
  color: rgba(48, 48, 48, .7);
}

.rival-stats {
  display: flex;
  margin-top: 18px;
}

.rival-stats-item {
  flex: 1;
  margin-top: 2px;
}

.rival-stats-type,
.rival-count,
.rival-trend {
  display: block;
}

.rival-stats-type {
  height: 36px;
  line-height: 36px;
  font-size: 26px;
  font-family: PingFangSC-Light, PingFang SC, serif;
  font-weight: 300;
  color: rgba(48, 48, 48, .4);
}

.rival-count {
  height: 60px;
  line-height: 60px;
  font-size: 46px;
  font-family: DINAlternate-Bold, DINAlternate, serif;
  font-weight: bold;
}

.rival-trend {
  position: relative;
  top: -1px;
  left: 0;
  height: 36px;
  line-height: 36px;
  font-size: 26px;
  font-family: DINAlternate-Bold, DINAlternate, serif;
  font-weight: bold;
  vertical-align: top;
}

.rival-up {
  color: #ff6262;
}

.rival-down {
  color: #88aaf6;
}

.rival-event {
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

.rival-event-name {
  flex: 1;
}

.rival-event-date {
  font-size: 22px;
  font-family: SanFranciscoDisplay-Light, SanFranciscoDisplay, serif;
  font-weight: 300;
  color: rgba(48, 48, 48, .4);
}

.rival-more {
  text-align: center;
  margin: 60px 0 30px;
}

.rival-button {
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