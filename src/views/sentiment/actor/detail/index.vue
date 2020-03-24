<template>
  <div class="content" >
    <SentimentBar :title="actorInfo.actorName" :sidebar="sidebar" />
    <div class="header">
      <div class='left'>
        <div>
          <img :src="actorInfo.coverUrl" class="img" />
        </div>
      </div>
      <div class='right'>
        <p class="kol-name">{{actorInfo.actorName}}</p>
        <p v-if="actorInfo.rankingName && !actorInfo.rankingId " class="event-name">
            <span>
              <i class='hid'>热搜No.{{actorInfo.rankingNum}}&nbsp;</i>
              <i class='bor'>#{{actorInfo.rankingName}}</i>
            </span>
        </p>
        <p v-if="actorInfo.rankingName && actorInfo.rankingId">
          <router-link to="" class="event-name flex-box">
            <span>
              <i class='hid'>#{{actorInfo.rankingNum}}&nbsp;</i>
              <i class='bor'>{{actorInfo.rankingName}}</i>
            </span>
            <Icon name="arrow" size="13" class="icon-arrow" />
          </router-link> 
        </p>
      </div>
    </div>

    <div class="dubble"> 
      <BubbleBottom :data="bubbleData" />
    </div>
    <TabNav
      :list ="list"
      class="tab-nav"
    />
    <section v-if='show' class="pane" id="hot">
      <!-- 热度分析 -->
      <Hots :id='0'/>
    </section>

    <section v-if='show' class="pane" id="praise">
      <!-- 口碑评论 -->
      <PraiseComment 
        :favorable="actorInfo.favorable" 
        :publicPraise="publicPraise"
        :link="getApplink('praiseHotWordsList')"
      />
    </section>

    <section v-if='show' class="pane" id="user">
      <!-- 用户分析 -->
      <UserPortrait 
          :genderList="userAnalysis.genderList" 
          :ageRangeList="userAnalysis.ageRangeList"
          :link="getApplink('userAnalysis')"
       />
    </section>

    <section v-if='showevent' class="pane" id="event">
      <!-- 营销事件 -->
      <Event 
        :eventList='eventList'
        :link="getApplink('eventMarketingList')"
      />
    </section>

    <section v-if='showuser' class="pane" id="part">
       <!-- 相似艺人 -->
        <Competing :pkUserList='pkUserList' :pkIdList='pkIdList' />
    </section>

    <section v-if='show' class="pane" id="work">
      <!-- 作品分析 -->
      <Works :worksAnalysis='worksAnalysis' />
    </section>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Tab, Tabs, Icon } from 'vant'
import TabNav, { TabNavItem } from '@/components/tabNav'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import Hots from './components/hots.vue'
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import UserPortrait from '@/views/common/user/userPortrait.vue'
import Event from '@/views/common/eventList/event.vue' // 事件跟踪
import Competing from './components/competing.vue'
import Works from './components/works.vue'
import { toast } from '@/util/toast'
import {BubbleLeft, BubbleBottom, BubbleItem, Title } from '@/components/bubble'
import { getActorDetail , getPkUser , getEventList } from '@/api/kol'
import { alert } from '@/util/toast'

@Component({
  components: {
    Tab,
    Tabs,
    Icon,
    BubbleBottom,
    SentimentBar,
    Hots,
    PraiseComment,
    UserPortrait,
    Event,
    Competing,
    Works,
    TabNav
  }
})
export default class KolPage extends ViewBase {

  defaultActorImg: any = '@/assets/actordefault.png'

  show: any = false
  showuser: any = false
  showevent: any = false

  sidebar = {
    diggType: 'actor',
    diggId: '100038',
    rivalIds: '1,2,4'
  }
  // 艺人基本信息
  actorInfo = {
    actorName: '玄彬',
    actorId: 1,
    coverUrl: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg', // 封面图
    kolLogo: {
      source: '',
      url: ''
    },
    rankingId: '', // 有值则加热搜事件链接
    rankingNum: '热搜No.8',
    rankingName: '#1111111111111', // 有值则显示模块，无则不显示模块,
    favorable: 'B+'
  }
  // 气泡数据概览
  bubbleData: any = [
    {type: '1', value: '235,454', trend: '123',  renderTitle: (h: any) => {
      return h(Title, {
        props: {
          title: `近90日新增互动`
        },
        on: {
          click: this.showNote
      }})
    }},
    {type: '2', title: '全网粉丝数', value: '1,423', trend: '-6', showdown: true},
    {type: '3', title: '实时热度', value: '234,234', trend: '-256', showdown: true},
    {type: '4', title: '好感度', value: 'B+'}
  ]
  // tab导航
  list: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    { name: 'part', label: '竞品' },
    { name: 'work', label: '作品' },
  ]
  // 用户分析
  userAnalysis: any = {
    genderList: [
      {
        'name ': '男',
        value: 1200
      },
      {
        'name ': '女',
        value: 8800
      }
    ],
    ageRangeList: [
      {
        name: '小于20',
        value: 1400
      },
      {
        name: '20-30',
        value: 2000
      },
      {
        name: '30-40',
        value: 3400
      },
      {
        name: '40-50',
        value: 3000
      },
      {
        name: '大于50',
        value: 200
      }
    ]
  }
  // 口碑评论 数据
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
  // 事件跟踪
  eventList = [
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
    {
      eventName: '冲奥片"乔乔的异想世界"曝豪华卡司幕后',
      eventId: '12332',
      creatTime: 1584146173812,
      target: [
        {
          targetCode: '1',
          targetName: '热点'
        },
        {
          targetCode: '2',
          targetName: '负面'
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
        },
        {
          interactiveUrl: {
            source: 'jydata',
            url:
              'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
          },
          interactiveValue: '100万+'
        }
      ]
    },
    {
      eventName: '乔乔的异想世界获最佳喜剧片剪辑',
      eventId: '12332',
      creatTime: 1584146173812,
      target: [
        {
          targetCode: '1',
          targetName: '热点'
        },
        {
          targetCode: '2',
          targetName: '负面'
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
        },
        {
          interactiveUrl: {
            source: 'jydata',
            url:
              'https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png'
          },
          interactiveValue: '100万+'
        }
      ]
    }
  ]
  // 作品分析
  worksAnalysis: any = {}

  pkUserList: any = []

  pkIdList: any = []

  created() {
    const mid = this.$route.params.kolId
    this.getActorDetail()
    this.getPkUser()
    this.getEventList()
    document.body.style.background = '#FBFBFB'
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

  async getActorDetail() {
    try {
      const { data: {
        actorInfo, // 艺人基本信息
        actorOverView, // 气泡数字概览
        publicPraise, // 口碑
        userAnalysis, // 用户分析
        worksAnalysis, // 作品分析
      } } = await getActorDetail({actorId: this.$route.params.actorId})
      this.actorInfo = actorInfo
      this.bubbleData = [
        {type: '1', value: actorOverView.interactCount, trend: actorOverView.interactTrend,
         renderTitle: (h: any) => {
          return h(Title, {
            props: {
              title: `近90日新增互动`
            },
            on: {
              click: this.showNote
          }})
        }},
        {type: '2', title: '全网粉丝数', value: actorOverView.fansCount, trend: actorOverView.fansTrend, showdown: true},
        {type: '3', title: '实时热度', value: actorOverView.heatCount, trend: actorOverView.heatTrend	, showdown: true},
        {type: '4', title: '好感度', value: actorInfo.favorable}
      ]
      this.publicPraise = publicPraise
      this.userAnalysis = userAnalysis
      this.worksAnalysis = worksAnalysis
    } catch (ex) {
      toast(ex)
    } finally {
      this.show = true
    }
  }

  async getPkUser() {
    this.pkIdList = []
    try {
      const pkUser = await getPkUser({actorId: this.$route.params.actorId})
      this.pkUserList = pkUser.data
      this.pkIdList = (pkUser.data || []).map((it: any) => {
        return it.rivalId
      })
    } catch (ex) {
      toast(ex)
    } finally {
      this.showuser = true
    }
  }

  async getEventList() {
    try {
      const event = await getEventList({objectId: this.$route.params.actorId, type: 2})
      this.eventList = event.data
    } catch (ex) {
      toast(ex)
    } finally {
      this.showevent = true
    }
  }

  // 显示说明
  showNote() {
    alert({
      title: '提示',
      message:
        '互动数为物料的点赞、转发、阅读及播放数之和',
      showConfirmButton: true,
      className: 'alertwid'
    })
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
  /deep/ .van-tabs__wrap {
    height: 55px;
    border-bottom: solid 1px fade(@c-divider, 0.5);
    .van-tab {
      font-size: 30px;
      padding: 0;
      color: @c-text;
      flex: 1;
    }
    .van-tab--active {
      color: #7ca4ff;
    }
    .van-tabs__line {
      background-color: #88aaf6;
    }
  }
}
.header {
  display: flex;
  padding: 88px 40px 0;
  .left {
    width: 33%;
    div {
      width: 172px;
      height: 172px;
      border-radius: 50%;
      overflow: hidden;
      background: url('~@/assets/actordefault.png');
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // max-width: 172px;
        // min-height: 130px;
        object-fit: contain;
        background-color: #fff;
      }
    }
  }
  .right {
    width: 65%;
  }
  .kol-name {
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    margin-top: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .event-name {
    margin-top: 12px;
    font-size: 26px;
    font-weight: 300;
    color: rgba(136, 170, 246, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      .hid {
        color: rgba(48, 48, 48, 1);
      }
      .bor {
        text-decoration: underline;
        // border-bottom: 1px solid rgba(136, 170, 246, 1);
      }
    }
    .icon-arrow {
      padding-left: 10px;
    }
  }
}
.dubble {
  padding: 0 4vw;
  margin-top: -5.73333vw;
  position: relative;
  z-index: 12;
  height: 49.33333vw;
  overflow: hidden;
}
/deep/ .bubble-warper-bottom {
  .mask {
    opacity: 0;
  }
}
.bg-header {
  width: 100%;
  height: 120px;
}
.line-height {
  height: 50px;
  width: 100%;
  background: #fff;
}
/deep/ .tab-nav {
  margin-top: 0;
  top: 88px;
  z-index: 11;
}
.pane {
  // padding: 15px;
  min-height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
}

.pane-head {
  font-size: 40px;
  font-weight: 500;
}

.sub-pane {
  min-height: 88px;
  border-top: 1px solid #d8d8d8;
  padding-top: 30px;
  &:first-child {
    border-top: 0;
  }
}

.sub-pane-head {
  font-size: 34px;
  font-weight: 500;
}

.sub-pane-body {
  min-height: 188px;
}
/deep/ .event-content {
  border-top: 0;
}
/deep/ .options-page {
  border-top: 0;
}
/deep/ .userportrait {
  border-top: 0;
}
.alertwid {
  width: 90%;
}
</style>
