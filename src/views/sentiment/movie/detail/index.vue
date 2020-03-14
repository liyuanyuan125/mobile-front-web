<template>
  <div class="page">
    <SentimentBar :attribute="topbar" />
    <BaseInfoArea :baseInfo="movieInfo" :overView="movieOverView" />
    <ActorList v-if="actorList && actorList.length" :actorList="actorList" />
    <ProduceList v-if="produceList && produceList.length" :produceList="produceList" />
    <!-- <EventList /> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import BaseInfoArea from './components/movieInfo.vue' // 影片基本信息
// import EventList from '@/views/common/eventList/event.vue'
import ActorList from '@/views/common/actorList/index.vue' // 主创人员
import ProduceList from '@/views/common/produceList/index.vue' // 出品发行
// import hotLine from '@/components/hotLine'

@Component({
  components: {
    SentimentBar,
    BaseInfoArea,
    // EventList,
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
  eventList = []
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
