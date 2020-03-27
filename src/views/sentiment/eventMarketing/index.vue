<template>
  <div class="content" v-if="show">
    <SentimentBar title="营销事件详情" :titleShow="true" />
    <div class="main">
      <h2 class="van-multi-ellipsis--l2">{{title}}</h2>
      <div class="show-num">
        <div class="left">
          <span class="s1">{{eventInfo.interactCount}}</span>
          <span class="s2">&nbsp;累计互动</span>
        </div>
        <div class="right">今日新增：{{eventInfo.todayInteractAdd}}</div>
      </div>
      <div class="show-echarts">
        <Button
          class="chg"
          v-for="(item) in tabList"
          :key="item.key"
          :class="{'chgbgc': newPk == item.key}"
          type="primary"
          @click="chgnewPk(item)"
        >{{item.name}}</Button>
        <div @click="openAnalysisPage">
          <LineGrap :lineData="linedata" class="wantchart" :formatterHtml="formatterHtml" />
        </div>
      </div>
    </div>
    <platForm
      :platformList="platformHeatList"
      v-if="platformHeatList.length"
      :params="platformParams"
      class="platform"
    />
    <SpreadList :dataList="spreadList" :link="getApplink('eventSpreadPathList')" />
    <!-- 口碑评论 -->
    <PraiseComment
      :favorable="publicPraise.favorable"
      :publicPraise="publicPraise"
      :link="getApplink('eventPraiseHotWordsList')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { roleNumber } from '@/fn/validateRules'
import moment from 'moment'
import { toast } from '@/util/toast'
import LineGrap from '@/components/lineGraph'
import { eventDetail } from './data'
import { Tab, Tabs, Icon, Button } from 'vant'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import SpreadList from '@/views/common/spreadList/index.vue' // 事件
import { platForm } from '@/components/hotLine'

import { openAppLink, AppLink } from '@/util/native'

@Component({
  components: {
    Tab,
    Tabs,
    Icon,
    SentimentBar,
    PraiseComment,
    Button,
    LineGrap,
    SpreadList,
    platForm
  }
})
export default class KolPage extends ViewBase {
  title!: string
  eventId: string = ''

  // 热度分析
  linedata: any = {}
  overAllHeatList: any = []
  // 热度平台
  platformHeatList: any = []
  get platformParams() {
    return {
      type: 101, // 1 品牌 2 艺人 3 电影 5 音乐-单曲 6 音乐-专辑  4 剧集 100=全网事件 101=营销事件
      id: this.$route.params.eventId, // 详情页id
      name: this.title
    }
  }

  show: any = false
  newPk: any = 'newsList'
  newPkName: any = '新闻'
  // 口碑评论 数据
  favorable: any = ''
  publicPraise = {}
  // 数据表切换列表
  tabList: any = [
    {
      key: 'newsList',
      name: '新闻'
    },
    {
      key: 'commentList',
      name: '评论'
    },
    {
      key: 'praisedList',
      name: '点赞'
    },
    {
      key: 'forwardList',
      name: '转发'
    },
    {
      key: 'readList',
      name: '阅读'
    }
  ]
  spreadList: any = []
  eventInfo: any = {}

  created() {
    this.eventId = this.$route.params.eventId
    const tit: any = this.$route.query.title || '营销事件详情'
    this.title = decodeURIComponent(tit)
    this.geteventDetail()
  }

  async geteventDetail() {
    try {
      const {
        data: { eventInfo, platformList, spreadList, publicPraise }
      } = await eventDetail({ eventId: this.$route.params.eventId })
      this.publicPraise = publicPraise
      this.spreadList = spreadList
      this.eventInfo = eventInfo
      this.overAllHeatList = eventInfo.newsList
      this.formatDatas(eventInfo.newsList)
      this.platformHeatList = platformList || []
    } catch (ex) {
      toast(ex)
    } finally {
      this.show = true
    }
  }

  // 处理数据
  formatDatas(data: any[]) {
    if (data && data.length) {
      const xDate = (data || []).map((it: any) => it.name)
      const yDate = (data || []).map((it: any) => it.value)
      const eventList = (data || []).map((it: any) => it.eventList)

      this.linedata = {
        xDate,
        eventList,
        yDate: [
          {
            data: yDate
          }
        ]
      }
    }
  }

  // 切换平台热度对比
  chgnewPk(params: any) {
    this.newPk = params.key
    this.newPkName = params.name
    this.overAllHeatList = this.eventInfo[params.key] || []
    this.formatDatas(this.overAllHeatList)
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
          eventType: 101 // 100=全网事件 101=营销事件
        }
    }
  }

  // 处理chart 浮层 tooltip
  formatterHtml = (params: any, time: any) => {
    const date = moment(time).format('YYYY年MM月DD日')
    return `
           <div style="border:2px solid rgba(48,48,48,.1);border-radius:6px; padding:7px 10px;background-color:#fff">
             <p style="color:#47403B;font-size:13px;line-height:16px">${date}</p>
             <div style="color:#88AAF6;font-size:14px;line-height:16px;margin-top:5px">
             ${this.newPkName} ${roleNumber(Math.abs(params.data))}</div>
           </div>
          `
  }

  // 打开趋势大图
  openAnalysisPage() {
    const link: AppLink = {
      page: 'eventTrendDetail',
      eventId: this.eventId,
      title: encodeURIComponent(this.title)
    }
    openAppLink(link)
  }
}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';

.main {
  padding: 140px 30px 0 30px;
  h2 {
    width: 100%;
  }
  .show-num {
    display: flex;
    width: 100%;
    margin-top: 25px;
    .left {
      width: 50%;
      text-align: left;
      font-size: 26px;
      font-weight: 600;
      color: rgba(136, 170, 246, 1);
      .s1 {
        font-size: 70px;
        font-weight: bold;
      }
    }
    .right {
      padding-top: 7%;
      width: 50%;
      text-align: right;
      font-size: 26px;
      font-weight: 400;
      color: #a8a8a8;
    }
  }
}
/deep/ .van-button--primary {
  width: 15%;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  color: #303030;
  border-radius: 30px;
  border: 2px solid rgba(235, 235, 235, 1);
  font-size: 26px;
}
.chg {
  margin-right: 20px;
  margin-top: 35px;
}
.chgbgc {
  background: #88aaf6;
  color: #fff;
}
/deep/ .line-title {
  display: none;
}
.wantchart {
  padding-bottom: 0;
}
// 平台热度
.platform {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 0 30px;
}
</style>
