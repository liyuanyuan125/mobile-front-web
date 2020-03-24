<template>
  <div class="content" v-if='show'>
    <SentimentBar title="营销事件详情" :titleShow="true" />
    <div class='main'>
      <h2>{{title}}</h2>
      <div class='show-num'>
        <div class='left'>
          <span class='s1'>{{eventInfo.interactCount}}</span>
          <span class='s2'>&nbsp;累计互动</span>
        </div>
        <div class='right'>
          今日新增：{{eventInfo.todayInteractAdd}}
        </div>
      </div>
      <div class='show-echarts'>
        <Button class='chg' v-for='(item) in tabList' :key='item.key' :class="{'chgbgc': newPk == item.key}" type="primary" @click='chgnewPk(item)'>{{item.name}}</Button>
        <hotLine 
          :lineDatas="lineDatas"
          :platformList="platformHeat"
          :params="params"
          v-if="this.yDate.length"
          ref="hots"
        />
     </div>

    </div>
      <spread :dataList="spreadList" />
      <!-- 口碑评论 -->
      <PraiseComment 
        :favorable="publicPraise.favorable" 
        :publicPraise="publicPraise"
        :link="getApplink('praiseHotWordsList')"
      />
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Tab, Tabs, Icon , Button } from 'vant'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import spread from '@/views/common/spreadList/index.vue' // 事件
import { toast } from '@/util/toast'
import { alert } from '@/util/toast'
import { eventDetail } from './data'
import { hotLine } from '@/components/hotLine'




@Component({
  components: {
    Tab,
    Tabs,
    Icon,
    SentimentBar,
    PraiseComment,
    Button,
    hotLine,
    spread
  }
})
export default class KolPage extends ViewBase {
  /* 标题name */
  @Prop({ type: String, default: '《封神三部曲》曝小寒海报中国首部 神话史诗将映' }) title!: string

  xDate = []
  yDate = []
  eventList = []
  platformHeat = []

  show: any = false
  newPk: any = 'newsList'
  newPkName: any = '新闻'
  // 口碑评论 数据
  favorable: any = ''
  publicPraise = {
    appraiseList: [
      {
        raisePercent: 1200,
        raiseName: '正面评价'
      },
      {
        raisePercent: 3200,
        raiseName: '负面评价'
      },
      {
        raisePercent: 2300,
        raiseName: '中性评价'
      }
    ],
    hotWordList: ['劲暴', '太帅了', '要严肃', '四个字的'],
    badWordList: ['劲暴', '太帅', '严肃', '四个字的']
  }
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

  get startTime() {
    return (this.$refs.hots as any).startTime
  }

  get endTime() {
    return (this.$refs.hots as any).endTime
  }

  get params() {
    return {
      type: 101, // 1 品牌 2 艺人 3 电影 4 音乐-单曲 5 音乐-专辑  6 剧集
      id: this.$route.params.eventId,
      name: this.title, // 天数
      startTime: 20200304, // this.startTime,
      endTime: 20200304 // this.endTime
    }
  }


  get lineDatas() {
    return {
      title: '',
      xDate: this.xDate, // 格式 ['20201212', '20121122', '20121122','20121122','20121122','20121122','20121122']
      eventList: this.eventList,
      yDate: [
        {
          data: this.yDate, // 格式 [333,33333,303333333,33333,333,33333,303333333]
          name: this.newPkName
        }
      ]
   }
  }

  created() {
    this.geteventDetail()
  }

  async geteventDetail() {
    try {
      const {
        data: {
          eventInfo,
          platformList,
          spreadList,
          publicPraise,
        }
      } = await eventDetail({eventId: this.$route.params.eventId})
      this.publicPraise = publicPraise
      this.spreadList = spreadList
      this.eventInfo = eventInfo
      this.xDate = (eventInfo.newsList || []).map((it: any) => it.name)
      this.yDate = (eventInfo.newsList || []).map((it: any) => it.value)
      // this.eventList = (overAllHeatList || []).map((it: any) => it.eventList)
      this.platformHeat = platformList || []
    } catch (ex) {
      toast(ex)
    } finally {
      this.show = true
    }
  }

  // 切换平台热度对比
  chgnewPk(params: any) {
    this.newPk = params.key
    this.newPkName = params.name
    this.xDate = (this.eventInfo[params.key] || []).map((it: any) => it.name)
    this.yDate = (this.eventInfo[params.key] || []).map((it: any) => it.value)
    // this.$emit('chgnewPk', num)
  }

  // 所有的 applink
  // 业务类型 businessType 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
  // 业务 Id businessObjectId
  appLinks = {
    // 票房
    boxOffice: {
      page: 'movieBoxOffice',
      boxOfficeType: 1,
      movieId: '100038'
    },
    praise: {
      page: 'praiseHotWordsList',
      businessType: 2,
      businessObjectId: '100038'
    },
    user: {
      page: 'praiseHotWordsList',
      businessType: 2,
      businessObjectId: '100038'
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
          name: 'sentimentactoruser',
          params: {
            movieId: 100038
          }
        }
      default:
        return {
          page,
          businessType: 2,
          businessObjectId: 100038
        }
    }
  }

}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';

.main {
  padding: 110px 30px 0 30px;
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
.alertwid {
  width: 90%;
}
/deep/ .options-page {
  border-top: 0;
}
/deep/ .line-title {
  display: none;
}
</style>
