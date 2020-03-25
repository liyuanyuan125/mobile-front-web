<template>
  <div class="page">
    <SentimentBar :title="title" :titleShow="true" />
    <div class="bubble">
      <BubbleLeft :data="bubbleData">
        <template>
          <!-- 示例 -->
          <div slot="right">
            <div class="content">
              <h5>{{bubbleTotal.overallHot}}</h5>
              <p>综合热度</p>
            </div>
            <div class="content">
              <h5>{{bubbleTotal.materials}}</h5>
              <p>累计媒体物料</p>
            </div>
            <div class="content">
              <h5>{{bubbleTotal.interact}}</h5>
              <p>累计互动数</p>
            </div>
          </div>
        </template>
      </BubbleLeft>
      <div class="curve">
        <div class="curvetop"></div>
        <div class="curvebot"></div>
      </div>
    </div>
    <TabNav :list="tabList" class="formattab" />
    <div class="hotanalysis">
      <ModuleHeader title="热度分析" class="heat" />
      <heatLineCom :overAllList="overAllHeat" :platformList="platformHeat" :params="params" />
    </div>
    <SpreadList :dataList="spreadList" :link="getApplink('eventSpreadPathList')" />
    <PraiseComment
      :favorable="publicPraise.favorable"
      :publicPraise="publicPraise"
      :link="getApplink('eventPraiseHotWordsList')"
      v-if="publicPraise.appraiseList"
      id="praise"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { eventDetail } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { BubbleLeft, BubbleItem } from '@/components/bubble'
import TabNav, { TabNavItem } from '@/components/tabNav'
import heatLineCom from '@/views/common/heatLineCom/index.vue'
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import ModuleHeader from '@/components/moduleHeader'
import SpreadList from '@/views/common/spreadList/index.vue' // 传播路径

@Component({
  components: {
    SentimentBar,
    ModuleHeader,
    BubbleLeft,
    TabNav,
    heatLineCom,
    SpreadList,
    PraiseComment
  }
})
export default class NetworkEventPage extends ViewBase {
  eventId: string = ''
  title: string = ''
  bubbleData: BubbleItem[] = [] // 概览数据左
  bubbleTotal: any = {} // 概览数据右
  // 二级导航
  tabList: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'boxoffice', label: '传播' },
    { name: 'praise', label: '口碑' }
  ]
  overAllHeat: any[] = [] // 热度分析趋势
  platformHeat: any[] = [] // 热度分析平台
  spreadList: any[] = []
  publicPraise: any = {} // 口碑
  // 热度分析传参
  get params() {
    return {
      type: 100, // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑 100=全网事件 101=营销事件
      id: this.$route.params.eventId, // 详情页id
      name: this.$route.query.title || '全网事件分析',
      startTime: 20200304, // this.startTime,
      endTime: 20200310 // this.endTime
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
    const res: any = await eventDetail(this.eventId)
    this.bubbleData = res.eventOverView.paltformList
    this.overAllHeat = res.overAllHeatList
    this.platformHeat = res.platformHeadList
    this.publicPraise = res.publicPraise
    this.spreadList = res.spreadList || []
    this.bubbleTotal = {
      overallHot: res.eventOverView.overallHot,
      materials: res.eventOverView.materials,
      interact: res.eventOverView.interact
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
          businessType: 100 // 100=全网事件 101=营销事件
        }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  color: #303030;
}
.bubble {
  background: #f2f3f6;
  position: relative;
  padding: 100px 30px 0;
  z-index: 12;
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
  }
}
nav.formattab {
  margin-top: 0;
  top: 88px;
  z-index: 11;
}
.hotanalysis {
  margin-top: 55px;

  .heat {
    padding: 0 30px;
    margin-bottom: 30px;
  }
}
</style>
