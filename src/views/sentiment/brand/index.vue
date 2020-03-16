<template>
  <div class="content">
    <!-- <SentimentBar :attribute="topbar" /> -->
    <brandInfoArea :brandInfo="brandInfo" :bubbleData="bubbleData"/>
    <Hots :id="id" />
    <!-- <comment :publicPraise='publicPraise' :hotQuery="hotQuery" /> -->
    <User />
    <!-- <eventList :eventList="list" :params="params"/> -->
    <Competing /> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { getList } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import brandInfoArea from './components/brandInfo.vue'
import comment from '@/components/opinions/comment/index.vue'
import eventList from '@/views/common/eventList/event.vue'
import Hots from './components/hots.vue'
import User from './components/users.vue'
import Competing from './components/competing.vue'



@Component({
  components: {
    SentimentBar,
    brandInfoArea,
    Hots,
    comment,
    User,
    eventList,
    Competing
  }
})
export default class BrandPage extends ViewBase {
  @Prop({ type: Number, default: 0}) id!: number

  topbar = {
    title: '流浪地球',
    diggShow: true,
    pkShow: true
  }

  bubbleData: any = {}
  brandInfo: any = {}

  get hotQuery() {
    return {
      text: '好感度',
      value: 'B+'
    }
  }
  publicPraise: any = {}

  // 事件
  params = {}
  get list() {
    return [
      {
        eventId: 1,
        eventName: '四川一辅警开奔驰强行闯关被辞',
        creatTime: 1582897820984,
        target: [
          {
            targetCode: 'hot',
            targetName: '热点'
          },
          {
            targetCode: 'negative',
            targetName: '负面'
          }
        ], // 格式为string[]或者object[]待定 最多2个标签
        interactiveList: [
          {
            url: 'x',
            text: '10万+'
          },
          {
            url: 'x',
            text: '200万+'
          },
        ]
      }
   ]
  }

  /* brandInfo = {
    brandName: '梅赛德斯-奔驰',
    brandId: 1,
    brandLogo: {
      url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg',
      source: 'piaoshen'
    },
    rankingId: '', // 有值则加热搜事件链接
    rankingName: '#奔驰大G开进故宫', // 有值则显示模块，无则不显示模块
  }*/

  mounted() {
    this.brandDetail()
  }

  async brandDetail() {
    const brandId = this.id
    try {
      const { data: {
        brandInfo,
        brandOverView,
        publicPraise: {appraiseList, hotWordList, badWordList},
        userAnalysis // 用户分析
      } } = await getList({brandId})

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
}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import './less/com.less';

/deep/ .van-tab__pane {
  display: block;
}
.content {
  background: #f2f3f6;
}
</style>
