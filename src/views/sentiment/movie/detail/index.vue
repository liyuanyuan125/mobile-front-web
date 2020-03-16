<template>
  <div class="page">
    <SentimentBar :attribute="topbar" />
    <BaseInfoArea :baseInfo="movieInfo" :overView="movieOverView" />
    <WantSeeTrend :dataTrend="wantSeeTrend" />
    <BoxOffice />
    <PraiseComment :favorable="movieInfo.favorable" :publicPraise="publicPraise" />
    <EventList :eventList="eventList" />
    <RivalAnalysis :rivalList="rivalAnalysis" />
    <ActorList v-if="actorList && actorList.length" :actorList="actorList" />
    <ProduceList v-if="produceList && produceList.length" :produceList="produceList" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import BaseInfoArea from './components/movieInfo.vue' // 影片基本信息
import WantSeeTrend from './components/wantSeeTrend.vue' // 想看趋势
import BoxOffice from './components/boxOffice.vue' // 影片票房
import PraiseComment from '@/views/common/praiseComment/index.vue' // 口碑评论
import EventList from '@/views/common/eventList/event.vue' // 事件跟踪
import RivalAnalysis from './components/rivalAnalysis.vue' // 竞品分析
import ActorList from '@/views/common/actorList/index.vue' // 主创人员
import ProduceList from '@/views/common/produceList/index.vue' // 出品发行
// import hotLine from '@/components/hotLine'

@Component({
  components: {
    SentimentBar,
    BaseInfoArea,
    WantSeeTrend,
    BoxOffice,
    PraiseComment,
    EventList,
    RivalAnalysis,
    ActorList,
    ProduceList
  }
})
export default class MoviePage extends ViewBase {
  topbar = {
    title: '流浪地球',
    diggShow: true,
    pkShow: true
  }
  movieInfo = {
    movieNameCn: '流浪地球',
    movieNameEn: 'The Wandering Earth',
    coverUrl: {
      url:
        'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg',
      source: 'piaoshen'
    },
    duration: '115分钟',
    genreName: '剧情 / 喜剧',
    releaseDate: '2020-02-22 中国大陆上映',
    movieId: '100038',
    favorable: 'B+'
  }
  movieOverView = {
    heatRanking: 'NO.125',
    commnetTrend: 121344,
    commentCount: '1,324',
    materialsTrend: -132332,
    materialsCount: '1,213.3万',
    heatTrend: 0
  }
  wantSeeTrend = {
    dailyGainList: [
      {
        date: 1583719155000,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 1300
      },
      {
        date: 1583805555000,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 32132
      },
      {
        date: 1583891955000,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 323132
      },
      {
        date: 1583978355000,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 12313
      },
      {
        date: 1584064755000,
        eventList: [
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '231332'
          }
        ],
        value: 320
      }
    ],
    totalGainList: [
      {
        date: 1583979088061,
        ' eventList': [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        ' eventList': [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        ' eventList': [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        ' eventList': [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          },
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      },
      {
        date: 1583979088061,
        ' eventList': [
          {
            eventName: '花木兰首映获好评',
            eventId: '132323'
          }
        ],
        value: 32311323
      }
    ]
  }
  favorable = {
    text: '好感度',
    value: 'B+'
  }
  // 口碑评论 数据
  publicPraise = {
    appraiseList: [
      {
        raisePercent: 12,
        raiseName: '正面评价'
      },
      {
        raisePercent: 32,
        raiseName: '负面评价'
      },
      {
        raisePercent: 23,
        raiseName: '中性评价'
      }
    ],
    hotWordList: ['劲暴', '太帅了', '要严肃', '四个字的'],
    badWordList: ['劲暴', '太帅', '严肃', '四个字的']
  }
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
  rivalAnalysis = [
    {
      rivalName: '疯狂外星人',
      heatTrend: 1300,
      heatCount: '1.2万',
      rivalCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg'
      },
      rivalId: '231331',
      materialsAdd: '1,232',
      materialsTrend: 1200,
      eventName: '世贸组织暂停会议',
      ' eventCreatTime': 1583979088061
    },
    {
      rivalName: '疯狂外星人',
      heatTrend: -1300,
      heatCount: '1.2万',
      rivalCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg'
      },
      rivalId: '231331',
      materialsAdd: '1,232',
      materialsTrend: 231,
      eventName: '世贸组织暂停会议',
      ' eventCreatTime': 1583979088061
    },
    {
      rivalName: '疯狂外星人',
      heatTrend: -1300,
      heatCount: '1.2万',
      rivalCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg'
      },
      rivalId: '231331',
      materialsAdd: '1,232',
      materialsTrend: 3211,
      eventName: '世贸组织暂停会议',
      ' eventCreatTime': 1583979088061
    }
  ]
  actorList = [
    {
      actorId: 906,
      actorName: '郭帆',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/18/190418052016353817.jpg'
      },
      character: '导演'
    },
    {
      actorId: 907,
      actorName: '吴京',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/07/11/B06EDD23EEED60C418B4.jpg'
      },
      character: '饰 刘培强'
    },
    {
      actorId: 893,
      actorName: '屈楚萧',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2020/02/03/62102C34026872169FAF.jpg'
      },
      character: '饰 刘启'
    },
    {
      actorId: 885,
      actorName: '李光洁',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/18/190418020626211394.jpg'
      },
      character: '饰 王磊'
    },
    {
      actorId: 890,
      actorName: '吴孟达',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/18/190418052014658253.jpg'
      },
      character: '饰 韩子昂'
    },
    {
      actorId: 896,
      actorName: '赵今麦',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/10/15/63C87F8158A679D70A25.jpg'
      },
      character: '饰 韩朵朵'
    },
    {
      actorId: 179289,
      actorName: 'Mike隋',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/18/190418052014803156.jpg'
      },
      character: '饰 Mike'
    },
    {
      actorId: 884,
      actorName: '屈菁菁',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/11/21/D1A74C1E0D84CB90BE91.jpg'
      },
      character: '饰 周倩'
    },
    {
      actorId: 901,
      actorName: '张亦驰',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/07/11/7F0CE6B3F5362EB77105.jpg'
      },
      character: '饰 李一一'
    },
    {
      actorId: 909,
      actorName: '杨皓宇',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/09/16/FD18B0E3BE81539812C7.jpg'
      },
      character: '饰 何连科'
    },
    {
      actorId: 480556,
      actorName: '阿尔卡基·沙罗格拉茨基',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/18/19041805201560601.jpg'
      },
      character: ''
    },
    {
      actorId: 887,
      actorCover: {
        source: 'piaoshen',
        url: '杨轶',
        avatarUrl:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/10/11/EE75829592698EC35365.jpg'
      },
      character: ''
    },
    {
      actorId: 910,
      actorName: '李虹辰',
      actorCover: {
        source: 'piaoshen',
        url:
          'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/18/190418052015165185.jpg'
      },
      character: ''
    }
  ]
  produceList = [
    '新疆华夏天山电影院线有限责任公司',
    '霍尔果斯腾影影视发行有限公司',
    '上海淘票票影视文化有限公司',
    '北京聚合影联文化传媒有限公司',
    '珠江影业传媒股份有限公司',
    '中国电影股份有限公司',
    '北京影拓星瀚网络科技有限公司',
    '北京国影纵横电影发行有限公司'
  ]
}
</script>

<style lang="less" scoped>
.page {
  color: #303030;
}
</style>
