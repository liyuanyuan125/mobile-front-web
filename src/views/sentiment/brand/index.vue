<template>
  <div class="content">
    <SentimentBar :title="brandInfo.brandName" :sidebar="sidebar" />
    <brandInfoArea :brandInfo="brandInfo" :bubbleData="bubbleData"/>
    <section class="brand-hot">
      <selectTime ref="refsTime" class="select-time"/>
      <heatLineCom 
        :overAllList="overAllHeatList" 
        :platformList="platformHeatList"
        :params="platformParams"
       />
    </section>
    <PraiseComment 
      :favorable="brandInfo.favorable" 
      :publicPraise="publicPraise"
      :link="getApplink('praiseHotWordsList')"
      v-if="publicPraise.appraiseList"
    />
    <UserPortrait 
      :ageRangeList="userAnalysis.ageRangeList" 
      :genderList="userAnalysis.genderList"
      v-if="userAnalysis.genderList"
      :link="getApplink('userAnalysis')"
    />
    <eventList 
      :eventList="brandEventList" 
      :params="eventParams"
      :link="getApplink('eventMarketingList')" 
    />
    <Competing :rivalList="rivalList" v-if="rivalList.length" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { getList, brandList, eventAnalysisList, brandAnalysisList } from '@/api/brand'
import { selectTime } from '@/components/hotLine'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // 头部bar
import brandInfoArea from './components/brandInfo.vue' // 气泡+基础信息
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import UserPortrait from '@/views/common/user/userPortrait.vue' // 用户分析
import eventList from '@/views/common/eventList/event.vue' // 事件分析
import heatLineCom from '@/views/common/heatLineCom/index.vue' // 热度分析
import Competing from './components/competing.vue' // 竞品分析



@Component({
  components: {
    SentimentBar,
    brandInfoArea,
    selectTime,
    heatLineCom,
    PraiseComment,
    UserPortrait,
    eventList,
    Competing
  }
})
export default class BrandPage extends ViewBase {
  @Prop({ type: Number, default: 0}) id!: number
  // 头部
  sidebar = {
    diggType: 'movie',
    diggId: '100038',
    rivalIds: '1,2,4'
  }
  // 气泡
  bubbleData: any = {}
  brandInfo: any = {}
  // 热度分析+平台信息
  overAllHeatList: any = []
  platformHeatList: any = []
  get platformParams() {
    return {
      type: 1, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.id, // 详情页id
      name: '奔驰',
      startTime: 20200304, // this.startTime,
      endTime: 20200310 // this.endTime
    }
  }
  // 口碑评论 数据
  publicPraise = {}
  // 用户分析
  userAnalysis = {}
  // 事件
  eventParams = {}
  brandEventList: any = {}
  // 竞品分析
  rivalList = []

  get refsTime() {
    return (this.$refs.refsTime as any)
  }

  mounted() {
    this.brandDetail() // 品牌详情页
    this.getHotList() // 热度分析数据
    this.eventAnalysis() // 事件分析
    this.analysisList() // 竞品分析
  }

  async brandDetail() {
    const brandId = this.id
    try {
      const { data: {
        brandInfo,
        brandOverView,
        publicPraise,
        userAnalysis
      } } = await brandList({brandId})

      this.brandInfo = brandInfo // 头部基础信息
      this.bubbleData = brandOverView // 气泡数据
      this.publicPraise = publicPraise // 口碑
      this.userAnalysis = userAnalysis // 用户分析
    } catch (ex) {
      toast(ex)
    }
  }

  async getHotList() {
    try {
      const { data: {
        overAllHeatList,
        platformHeatList
      } } = await getList({
        brandId: this.id,
        startTime: 20200304, // this.refsTime.beginDate
        endTime: 20200310 // this.refsTime.endDate
      })
      this.overAllHeatList = overAllHeatList
      this.platformHeatList = platformHeatList
    } catch (ex) {
      toast(ex)
    }
  }

  async eventAnalysis() {
    try {
      const { data } = await eventAnalysisList({
        type: 2, // 1
        objectId: 9 // this.id
      })
      this.brandEventList = data
    } catch (ex) {
      toast(ex)
    }
  }

  async analysisList() {
    try {
      const { data } = await brandAnalysisList({
        brandId: this.id
      })
      this.rivalList = data || []
    } catch (ex) {
      toast(ex)
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
}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import './less/com.less';
.select-time {
  padding: 20px 30px 30px;
}
</style>
