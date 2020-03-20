<template>
  <div class="content">
    <SentimentBar title="流浪地球" :sidebar="sidebar" />
    <brandInfoArea :brandInfo="brandInfo" :bubbleData="bubbleData"/>
    <section class="brand-hot">
      <selectTime ref="refsTime"/>
      <heatLineCom 
        :overAllList="overAllHeatList" 
        :platformList="platformHeatList"
        :params="params"
       />
    </section>
    <User />
    <eventList :eventList="list" :params="params2"/>
    <Competing /> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { getList, brandList } from '@/api/brand'
import { selectTime } from '@/components/hotLine'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import brandInfoArea from './components/brandInfo.vue'
import eventList from '@/views/common/eventList/event.vue'
import heatLineCom from '@/views/common/heatLineCom/index.vue'
import User from './components/users.vue'
import Competing from './components/competing.vue'



@Component({
  components: {
    SentimentBar,
    brandInfoArea,
    selectTime,
    heatLineCom,
    User,
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
  get params() {
    return {
      type: 1, // 1 品牌 2 艺人 3 电影 4 音乐-单曲 5 音乐-专辑  6 剧集
      id: 1, // 详情页id
      name: '奔驰',
      startTime: 20200304, // this.startTime,
      endTime: 20200310 // this.endTime
    }
  }
  // 口碑
  publicPraise: any = {}
  // 事件
  params2 = {}
  get list() {
    return [
    {
      eventName: '乔乔的异想世界获最佳喜剧片剪辑',
      eventId: '12332',
      creatTime: 1584146173812,
      target: [
        {
          targetCode: '1',
          targetName: '正面'
        }
      ],
      interactiveList: [
        {
          interactiveUrl: {
            source: 'jydata',
            url:
              'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
          },
          interactiveValue: '100万+'
        },
        {
          interactiveUrl: {
            source: 'jydata',
            url:
              'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
          },
          interactiveValue: '1,212'
        }
      ]
    },
   ]
  }

  get refsTime() {
    return (this.$refs.refsTime as any)
  }

  mounted() {
    this.brandDetail()
    this.getHotList()
  }

  async brandDetail() {
    const brandId = this.id
    try {
      const { data: {
        brandInfo,
        brandOverView,
        publicPraise: {appraiseList, hotWordList, badWordList},
        userAnalysis // 用户分析
      } } = await brandList({brandId})

      this.brandInfo = brandInfo // 头部基础信息
      this.bubbleData = brandOverView // 气泡数据
      // 口碑
      const appraiseListData = (appraiseList || []).map((it: any) => {
        return {
          ...it,
          raisePercent: it.raisePercent / 100
        }
      })
      this.publicPraise = {
        appraiseList: appraiseListData,
        hotWordList,
        badWordList
      }
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
      // this.xDate = (overAllHeatList || []).map((it: any) => it.date)
      // this.yDate = (overAllHeatList || []).map((it: any) => it.value)
      // this.eventList = (overAllHeatList || []).map((it: any) => it.eventList)
      // this.platformHeat = platformHeatList || []
    } catch (ex) {
      toast(ex)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import './less/com.less';

/deep/ .van-tab__pane {
  display: block;
}
</style>
