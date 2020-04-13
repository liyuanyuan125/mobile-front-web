<template>
  <div class="content">
    <SentimentBar :title="brandInfo.brandName" :sidebar="sidebar" />
    <brandInfoArea :brandInfo="brandInfo" :bubbleData="bubbleData"/>
    <TabNav
      :list="navList"
      class="tab-nav"
    />
    <section class="brand-hot bg_fff" id="hot">
      <selectTime v-model="day" class="select-time"/>
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
      id="praise"
      class="praise"
    />
    <UserPortrait 
      :ageRangeList="userAnalysis.ageRangeList" 
      :genderList="userAnalysis.genderList"
      v-if="userAnalysis.genderList"
      :link="getApplink('userAnalysis')"
      id="user"
    />
    <eventList 
      :eventList="brandEventList" 
      :params="eventParams"
      :link="getApplink('eventMarketingList')" 
      id="event"
      class="bg_fff"
    />
    <Competing :rivalList="rivalList" id="part" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { lastDays } from '@/util/timeSpan'
import TabNav, { TabNavItem } from '@/components/tabNav'
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
    Competing,
    TabNav
  }
})
export default class BrandPage extends ViewBase {
  @Prop({ type: Number, default: 0}) id!: number

  navList: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    { name: 'part', label: '竞品' },
  ]

  // 气泡
  bubbleData: any = {}
  brandInfo: any = {}

  // 热度分析+平台信息
  day = 7
  overAllHeatList: any = []
  platformHeatList: any = []

  get platformParams() {
    const [ startTime, endTime ] = lastDays(this.day)
    return {
      type: 1, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.id, // 详情页id
      name: '奔驰',
      startTime,
      endTime,
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
  rivalIds = []

  // 头部
  get sidebar() {
    let rivalObj = {}
    // 有竞品数据跳竞品报告页
    if (this.rivalIds.length) {
      rivalObj = {
        name: 'sentimentbrand-analyze',
        query: {
          ids: this.rivalIds.join(',')
        }
      }
    } else {
      // 无竞品的时候，跳设置竞品页
      rivalObj = {
        businessType: 1,
        businessObjectIdList: this.id
      }
    }
   return {
    diggType: 1, // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
    diggId: this.id,
    rivalIds: rivalObj
   }
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

      this.brandInfo = brandInfo || {} // 头部基础信息
      this.bubbleData = brandOverView // 气泡数据
      this.publicPraise = publicPraise // 口碑
      this.userAnalysis = userAnalysis // 用户分析
    } catch (ex) {
      toast(ex)
    }
  }

  async getHotList() {
    const [ startTime, endTime ] = lastDays(this.day)
    try {
      const { data: {
        overAllHeatList,
        platformHeatList
      } } = await getList({
        brandId: this.id,
        startTime,
        endTime,
      })
      this.overAllHeatList = overAllHeatList || []
      this.platformHeatList = platformHeatList || []
    } catch (ex) {
      toast(ex)
    }
  }

  async eventAnalysis() {
    try {
      const { data } = await eventAnalysisList({
        type: 1,
        objectId: this.id
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
      this.rivalIds = (data || []).map((it: any) => it.rivalId)
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

  @Watch('day', {deep: true})
  watchDay() {
    this.getHotList()
  }
}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import './less/com.less';
.content {
  background: #f2f3f6;
  // overflow: hidden;
}
.select-time {
  padding: 60px 30px 30px;
}
.praise {
  overflow: hidden;
}
/deep/ .tab-nav {
  margin-top: 0;
  top: 100px;
  z-index: 11;
  /deep/ .van-tab {
    flex-basis: 20% !important;
  }
}
// /deep/ nav.formattab {
//   margin-top: 0;
//   top: 88px;
//   z-index: 11;
// }
// /deep/ nav.formattab .van-tab {
//   flex-basis: 20% !important;
// }
.bg_fff {
  background: #fff;
}
</style>
