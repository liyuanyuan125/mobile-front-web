<template>
  <div class="page">
    <SentimentBar :title="title" :titleShow="true" />
    <loadingCom v-if="!overLoading" />
    <div v-if="!basicCode && overLoading">
      <div v-if="eventStatus === 1 || !eventStatus" class="unevent">
        <span></span>
        <h6>暂无数据</h6>
        <p>
          该事件的分析报告将于分析周期开始的第二天展示，
          <br />分析周期内分析报告每日更新，请耐心等待！
        </p>
      </div>
      <div v-if="eventStatus === 2 || eventStatus === 3">
        <div class="bubble">
          <BubbleLeft :data="bubbleData">
            <template>
              <!-- 示例 -->
              <div slot="right">
                <div class="content">
                  <h5>{{bubbleTotal.overallHot? bubbleTotal.overallHot :'-'}}</h5>
                  <p>综合热度</p>
                </div>
                <div class="content">
                  <h5>{{bubbleTotal.materials ?bubbleTotal.materials : '-'}}</h5>
                  <p>累计媒体物料</p>
                </div>
                <div class="content">
                  <h5>{{bubbleTotal.interact ? bubbleTotal.interact :'-'}}</h5>
                  <p @click="showNote">
                    累计互动数
                    <Icon name="question-o" size="16" color="#303030" />
                  </p>
                </div>
              </div>
            </template>
          </BubbleLeft>
          <div class="curve">
            <div class="curvetop"></div>
            <div class="curvebot"></div>
          </div>
        </div>
        <TabNav :list="tabList" class="tab-nav-hide-header formattab" />
        <div class="hotanalysis" id="hot">
          <ModuleHeader title="热度分析" class="heat" />
          <heatLineCom :overAllList="overAllHeat" :platformList="platformHeat" :params="params" />
        </div>
        <SpreadList :dataList="spreadList" :link="getApplink('eventSpreadPathList')" id="spread" />
        <PraiseComment
          :favorable="publicPraise.favorable"
          :publicPraise="publicPraise"
          :link="getApplink('eventPraiseHotWordsList')"
        />
      </div>
      <div v-if="eventStatus === 4" class="eventclose">
        <span></span>
        <h6>该事件已在后台关闭</h6>
        <p>如有问题 请联系客服 400-605-0606</p>
      </div>
    </div>
    <DataEmpty
      :code="basicCode"
      :retry="getEventData"
      v-if="basicCode > 0 && overLoading"
      class="empty"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { eventDetail } from './data'
import { Icon } from 'vant'
import { lastDays } from '@/util/timeSpan'
import loadingCom from '@/components/loading/index.vue'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { BubbleLeft, BubbleItem } from '@/components/bubble'
import TabNav, { TabNavItem } from '@/components/tabNav'
import heatLineCom from '@/views/common/heatLineCom/index.vue'
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import ModuleHeader from '@/components/moduleHeader'
import SpreadList from '@/views/common/spreadList/index.vue' // 传播路径
import { alert } from '@/util/toast'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    DataEmpty,
    Icon,
    SentimentBar,
    ModuleHeader,
    BubbleLeft,
    TabNav,
    heatLineCom,
    SpreadList,
    loadingCom,
    PraiseComment
  }
})
export default class NetworkEventPage extends ViewBase {
  eventId: string = ''
  eventStatus: number = 0
  basicCode: number = 0
  overLoading: boolean = false
  title: string = ''
  bubbleData: BubbleItem[] = [] // 概览数据左
  bubbleTotal: any = {} // 概览数据右

  // 二级导航
  tabList: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'spread', label: '传播' },
    { name: 'praise', label: '口碑' }
  ]
  overAllHeat: any[] = [] // 热度分析趋势
  platformHeat: any[] = [] // 热度分析平台
  spreadList: any[] = [] // 传播路径
  publicPraise: any = {} // 口碑
  // 热度分析传参
  get params() {
    // 其实取的是事件监测的起始和结束时间，写90天是为了二级页好看一点
    const [startTime, endTime] = lastDays(90)
    return {
      type: 100, // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑 100=全网事件 101=营销事件
      id: this.$route.params.eventId, // 详情页id
      name: this.$route.query.title || '全网事件分析',
      startTime, // this.startTime,
      endTime // this.endTime
    }
  }

  created() {
    this.eventId = this.$route.params.eventId
    const tit: any = this.$route.query.title || '全网事件分析'
    this.title = decodeURIComponent(tit)
    document.title = this.title
    this.getEventData()
  }

  async getEventData() {
    try {
      const res: any = await eventDetail(this.eventId)
      this.eventStatus = res.eventStatus
      this.basicCode = 0
      this.overLoading = true
      if (!res.eventOverView) {
        this.eventStatus = 0
      } else {
        this.bubbleData = res.eventOverView.paltformList
        this.overAllHeat = res.overAllHeatList
        this.platformHeat = res.platformHeatList
        this.publicPraise = res.publicPraise
        this.spreadList = res.spreadList || []
        this.bubbleTotal = {
          overallHot: res.eventOverView.overallHot,
          materials: res.eventOverView.materials,
          interact: res.eventOverView.interact
        }
      }
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
      this.overLoading = true
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
      default:
        return {
          page,
          eventId: this.eventId,
          eventType: 100 // 100=全网事件 101=营销事件
        }
    }
  }

  // 显示说明
  showNote() {
    alert({
      // title: '提示',
      message: '互动数是各物料的点赞、评论、转发、阅读或播放的累计互动之和',
      showConfirmButton: true,
      className: 'alertwid'
    })
  }
}
</script>

<style lang="less" scoped>
.empty {
  margin-top: 150px;
}
.page {
  color: #303030;
}
.bubble {
  background: #f2f3f6;
  position: relative;
  padding: 100px 30px 0;
  z-index: 12;
}
/deep/ .bubble-warper {
  z-index: 3;
}
.curve {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 2;
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
.content {
  padding-bottom: 40px;
  h5 {
    font-size: 46px;
    line-height: 53px;
  }
  p {
    font-size: 26px;
    line-height: 37px;
    margin-top: 8px;
    .van-icon-question-o {
      vertical-align: middle;
      margin-top: -2px;
    }
  }
}
/deep/ nav.formattab {
  // margin-top: 0;
  padding-top: 0;
  top: 88px;
  z-index: 11 !important;
  &::before {
    display: none;
  }
}
/deep/ nav.formattab .van-tab {
  flex: none;
}
.hotanalysis {
  margin-top: 55px;

  .heat {
    padding: 0 30px;
    margin-bottom: 30px;
  }
}
// 事件未开始
.unevent,
.eventclose {
  text-align: center;
  padding: 200px 0 0;
  span {
    display: inline-block;
    background: url('../../../../assets/sentiment/event-null.png') no-repeat center;
    background-size: 100%;
    width: 268px;
    height: 220px;
  }
  h6 {
    font-weight: normal;
    font-size: 33px;
    line-height: 45px;
    margin-top: 15px;
    color: #88aaf6;
  }
  p {
    font-size: 25px;
    line-height: 40px;
    color: #8f8f8f;
    margin-top: 15px;
  }
}
// 事件被关闭
.eventclose {
  span {
    background-image: url('../../../../assets/sentiment/event-close.png');
  }
}
</style>
