import { mockGet, mockPost, mockPut, mockDel } from '../util'
import rivalPlayData from './rivalPlayData'

/**
 * 1.单曲详情页
 * https://yapi.aiads-dev.com/project/404/interface/api/10878
 */
mockGet('/yuqing/music/song/detail', ({ songId }) => {
  return {
    songInfo: {
      songName: '向死而生很长很长很长很长很长很长很长很长很长很长很长很长',
      songSinger: 'Lana Del Rey / Lana Del Rey很长很长很长很长很长很长很长很长很长很长',
      releaseDate: '2020-02-22发行',
      releasePlatform: '多平台',
      rankingNum: '热搜NO.8',
      rankingName: '比伯结婚视频很长很长很长很长很长',
      rankingId: 1221,
      songCover: {
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/08/07/122067D54C1C0413C52E.jpg',
        source: 'piaoshen'
      },
      favorable: 'B+',
    },

    // 弹框简介
    basisDataList: [
      { name: '单曲名称1', value: 'Last Dance' },
      { name: '单曲名称2', value: '挪威的森林2' },
      { name: '单曲名称3', value: '挪威的森林3' },
      { name: '单曲名称4', value: '挪威的森林4' },
      { name: '单曲名称5', value: '挪威的森林5' },
      { name: '单曲名称6', value: '网易云音乐，QQ音乐，酷狗音乐，酷我音乐，虾米音乐' },
      { name: '单曲名称7', value: '挪威的森林7' },
      { name: '单曲名称8', value: '挪威的森林8' },
      { name: '单曲名称9', value: '挪威的森林9' },
      { name: '单曲名称10', value: '挪威的森林10' },
      { name: '单曲名称11', value: '挪威的森林11' },
      { name: '单曲名称12', value: '挪威的森林12' },
      { name: '单曲名称13', value: '挪威的森林13' },
      { name: '单曲名称14', value: '挪威的森林14' },
      { name: '单曲名称15', value: '挪威的森林15' },
      { name: '单曲名称16', value: '挪威的森林16' },
      { name: '单曲名称17', value: '挪威的森林17' },
      { name: '单曲名称18', value: '挪威的森林18' },
    ],

    // 专辑指标
    songOverView: {
      interactCount: '1,213.4万',
      interactTrend: -12,
      playCount: '',
      playTrend: 3288888,
      heatCount: '3,321',
      heatTrend: 0,
    },

    // 榜单表现
    rankAnalysis: {
      rankCount: '2,588',
      rankBest: 'NO.38',
      rankType: '流行 飙升',
      // rankType: '水电费沙发 沙发斯蒂芬 斯蒂芬 斯蒂芬',
      platformList: [
        { name: '抖音', value: 1080 },
        { name: '酷我音乐', value: 1840 },
        { name: '搜狗音乐', value: 2020 },
        { name: '网易云音乐', value: 2620 },
        { name: 'QQ音乐', value: 3850 },
      ]
    },

    // 口碑
    publicPraise: {
      appraiseList: [
        { raiseName: '正面评价', raisePercent: 1321 },
        { raiseName: '负面评价', raisePercent: 321 },
        { raiseName: '中性评价', raisePercent: 8321 },
      ],
      hotWordList: ['好听', '神曲', '好感人', '欢快'],
      badWordList: ['聒噪', '不好听', '什么玩意', '乌鸦嘴'],
    },

    // 用户分析
    userAnalysis: {
      genderList: [
        { name: '男', value: 9990 },
        { name: '女', value: 10 },
      ],
      ageRangeList: [
        { name: '≤19岁', value: 880 },
        { name: '20-24', value: 1760 },
        { name: '25-29', value: 3280 },
        { name: '30-34', value: 2800 },
        { name: '35-39', value: 920 },
        { name: '≥40岁', value: 310 },
      ]
    },

    // 音乐人分析
    singerAnalysisList: [
      {
        singerName: '毛不易',
        singerId: 123,
        singerCover: {
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/10/31/562EDE9160B003AFECEB.jpg',
          source: 'piaoshen',
        },
        heatCount: '',
        heatTrend: 0
      },
      {
        singerName: '汪汪汪',
        singerId: 333,
        singerCover: {
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/10/31/562EDE9160B003AFECEB.jpg',
          source: 'piaoshen',
        },
        heatCount: '1.2万',
        heatTrend: -1328888
      },
      {
        singerName: '分公司大股东',
        singerId: 888,
        singerCover: {
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/10/31/562EDE9160B003AFECEB.jpg',
          source: 'piaoshen',
        },
        heatCount: '1.2万',
        heatTrend: 132
      },
    ]
  }
})

/**
 * 1.1单曲详情页-获取热度分析数据
 * https://yapi.aiads-dev.com/project/404/interface/api/11173
 */
mockGet('/yuqing/music/song/heat/analysis', () => {
  return {
    "overAllHeatList": [
      {
        "date": 1583251200000,
        "value": 32100,
        "eventList": null
      },
      {
        "date": 1583337600000,
        "value": 3211,
        "eventList": null
      },
      {
        "date": 1583424000000,
        "value": 300,
        "eventList": null
      },
      {
        "date": 1583510400000,
        "value": 32100,
        "eventList": null
      },
      {
        "date": 1583596800000,
        "value": 32100,
        "eventList": null
      },
      {
        "date": 1583683200000,
        "value": 32100,
        "eventList": null
      },
      {
        "date": 1583769600000,
        "value": 32100,
        "eventList": null
      }
    ],
    "platformHeatList": [
      {
        "platformName": "新浪新闻",
        "platformId": "xinlangxinwen",
        "platformLogo": {
          "source": "jydata",
          "url": "https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/xinlangxinwen.png"
        },
        "platformValueList": [
          {
            "name": "文章数",
            "value": "620"
          },
          {
            "name": "互动量",
            "value": "26.1万"
          }
        ],
        "platformNotice": "热搜no1000"
      },
      {
        "platformName": "微博",
        "platformId": "weibo",
        "platformLogo": {
          "source": "jydata",
          "url": " https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/weibo.png"
        },
        "platformValueList": [
          {
            "name": "微博数",
            "value": "490"
          },
          {
            "name": "互动量",
            "value": "7.1万"
          }
        ],
        "platformNotice": "热搜no1"
      },
      {
        "platformName": "腾讯新闻",
        "platformId": "tengxunxinwen",
        "platformLogo": {
          "source": "jydata",
          "url": "https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/tengxunxinwen.png"
        },
        "platformValueList": [
          {
            "name": "文章数",
            "value": "490"
          },
          {
            "name": "互动量",
            "value": "7.1万"
          }
        ],
        "platformNotice": "热搜no1"
      }
    ]
  }
})

/**
 * 1.2单曲详情页-获取竞品对手
 * https://yapi.aiads-dev.com/project/404/interface/api/11228
 */
mockGet('/yuqing/music/song/rival/list', () => {
  return [
    {
      rivalName: '向死而生名字很长名字很长名字很长名字很长',
      rivalId: 123,
      rivalDesc: '伍佰',
      rivalCover: {
        source: 'piaoshen',
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
      },
      playingCount: '1,313',
      playingTrend: 0,
      interactCount: '',
      interactTrend: 0,
      eventName: '英首相与女友订婚',
      eventCreatTime: 1583909626668,
    },
    {
      rivalName: 'Tomorrow',
      rivalId: 128,
      rivalDesc: '山姆·史密斯',
      rivalCover: {
        source: 'piaoshen',
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
      },
      playingCount: null,
      playingTrend: 88888131,
      interactCount: null,
      interactTrend: -8888888880,
    },
    {
      rivalName: '翻山越岭来看你',
      rivalId: 138,
      rivalDesc: '山姆·史密斯',
      rivalCover: {
        source: 'piaoshen',
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
      },
      playingCount: '1,313',
      playingTrend: 8888,
      interactCount: '3.3亿',
      interactTrend: -88,
    },
  ]
})

/**
 * 1.3单曲详情页-获取播放量分析
 * https://yapi.aiads-dev.com/project/404/interface/api/11283
 */
mockGet('/yuqing/music/song/play/analysis', () => {
  return {
    songMusicView: {
      platformList: [
        { name: '网易云音乐名字很长名字很长名字很长', value: 6888, countShow: '8887.8万' },
        { name: 'QQ音乐名字很长名字很长名字很长名字很长', value: 3888, countShow: '4.8亿' },
        { name: '酷我音乐', value: 2888, countShow: '3.8亿' },
      ],
      dailyPlatformList: [
        {
          platformName: '网易云音乐',
          dataList: [
            { date: 1585756800000, value: 888123231 },
            { date: 1586016000000, value: 588823231 },
            { date: 1586275200000, value: 288323231 },
            { date: 1585324800000, value: 388923231 },
          ]
        },
        {
          platformName: 'QQ音乐',
          dataList: [
            { date: 1585756800000, value: 888323231 },
            { date: 1586016000000, value: 588223231 },
            { date: 1586275200000, value: 388823231 },
            { date: 1585324800000, value: 988623231 },
          ]
        },
        {
          platformName: '酷我音乐',
          dataList: [
            { date: 1585756800000, value: 288823231 },
            { date: 1586016000000, value: 688123231 },
            { date: 1586275200000, value: 66923231 },
            { date: 1585324800000, value: 288223231 },
          ]
        },
        {
          platformName: '酷狗音乐',
          dataList: [
            { date: 1585756800000, value: 88823231 },
            { date: 1586016000000, value: 88123231 },
            { date: 1586275200000, value: 288923231 },
            { date: 1585324800000, value: 588223231 },
          ]
        },
        {
          platformName: '音乐名称太长太长太长太长太长太长',
          dataList: [
            { date: 1585756800000, value: 98823231 },
            { date: 1586016000000, value: 98123231 },
            { date: 1586275200000, value: 988923231 },
            { date: 1585324800000, value: 288223231 },
          ]
        },
      ],
      dailyEventList: [
        { date: 1585756800000, eventName: '1事件名事件名事件名事件名事件名', eventId: 1 },
        { date: 1586016000000, eventName: '2事件名事件名事件名事件名事件名', eventId: 2 },
        { date: 1586275200000, eventName: '3事件名事件名事件名事件名事件名', eventId: 3 },
      ],
      dailyFormList: [
        {
          date: 1585756800000,
          playCount: '276.9万',
          markName: '上线首日',
          platformList: [
            { name: '网易云音乐', value: '188.8万' },
            { name: 'QQ音乐', value: '88.8万' },
            { name: '酷我音乐', value: '' },
          ]
        },
        {
          date: 1586016000000,
          playCount: '176.9万',
          platformList: [
            { name: '网易云音乐', value: '88.8万' },
            { name: 'QQ音乐', value: '38.8万' },
            { name: '酷我音乐', value: '20.8万' },
          ]
        },
        {
          date: 1586275200000,
          playCount: '188.9万',
          platformList: [
            { name: '网易云音乐', value: '99.8万' },
            { name: 'QQ音乐', value: '66.8万' },
            { name: '酷我音乐', value: '' },
          ]
        },
        {
          date: 1585324800000,
          playCount: '188.8万',
          platformList: [
            { name: '网易云音乐', value: '99.8万' },
            { name: 'QQ音乐', value: '66.8万' },
            { name: '酷我音乐', value: '' },
          ]
        },
      ]
    },
    videoView: {
      platformList: [
        { name: '网易云音乐', value: 1880, countShow: '2.59亿' },
        { name: 'QQ音乐', value: 9888, countShow: '3.8亿' },
        { name: '酷我音乐', value: 3888, countShow: '8.8亿' },
      ],
      dailyPlatformList: [
        {
          platformName: '网易云音乐',
          dataList: [
            { date: 1585756800000, value: 123231 },
            { date: 1586016000000, value: 823231 },
            { date: 1586275200000, value: 323231 },
          ]
        },
        {
          platformName: 'QQ音乐',
          dataList: [
            { date: 1585756800000, value: 323231 },
            { date: 1586016000000, value: 223231 },
            { date: 1586275200000, value: 823231 },
          ]
        },
        {
          platformName: '酷我音乐',
          dataList: [
            { date: 1585756800000, value: 823231 },
            { date: 1586016000000, value: 123231 },
            { date: 1586275200000, value: 923231 },
          ]
        },
      ],
      dailyEventList: [
        { date: 1585756800000, eventName: '1事件名事件名事件名事件名事件名', eventId: 1 },
        { date: 1586016000000, eventName: '2事件名事件名事件名事件名事件名', eventId: 2 },
        { date: 1586275200000, eventName: '3事件名事件名事件名事件名事件名', eventId: 3 },
      ],
      dailyFormList: [
        {
          date: 1581955200000,
          playCount: '876.9万',
          markName: '上线首日',
          platformList: [
            { name: '网易云音乐', value: '688.8万' },
            { name: 'QQ音乐', value: '66.8万' },
            { name: '酷我音乐', value: '' },
          ]
        },
        {
          date: 1586016000000,
          playCount: '388.8万',
          platformList: [
            { name: '网易云音乐', value: '288.8万' },
            { name: 'QQ音乐', value: '138.8万' },
            { name: '酷我音乐', value: '20.8万' },
          ]
        },
        {
          date: 1582128000000,
          playCount: '666.9万',
          platformList: [
            { name: '网易云音乐', value: '199.8万' },
            { name: 'QQ音乐', value: '166.8万' },
            { name: '酷我音乐', value: '20万' },
          ]
        },
      ]
    }
  }
})

/**
 * 2.5单曲用户分析二级页
 * https://yapi.aiads-dev.com/project/404/interface/api/11013
 */
mockGet('/yuqing/music/song/user/analysis', () => {
  return {
    "userRegionList": [
      {
        "name": "北京",
        "value": 9313
      },
      {
        "name": "新疆",
        "value": 8300
      }
    ],
    "genderList": [
      {
        "name": "男",
        "value": 4300
      },
      {
        "name": "女",
        "value": 5700
      }
    ],
    "ageRangeList": [
      {
        "name": "19岁以下",
        "value": 3141
      },
      {
        "name": "20-35岁",
        "value": 5141
      },
      {
        "name": "36-45岁",
        "value": 1141
      },
      {
        "name": "46-59岁",
        "value": 941
      },
      {
        "name": "60岁以上",
        "value": 598
      }
    ]
  }
  // return {
  //   genderList: [
  //     { value: 1335, name: '男性' },
  //     { value: 310, name: '女性' }
  //   ],

  //   ageRangeList: [
  //     { name: '小于19岁', value: 880 },
  //     { name: '20-24', value: 1760 },
  //     { name: '25-29', value: 3280 },
  //     { name: '30-34', value: 2800 },
  //     { name: '35-39', value: 920 },
  //     { name: '大于40岁', value: 310 },
  //   ],

  //   userRegionList: [
  //     { name: '新疆', value: 0 },
  //     { name: '西藏', value: 2080 },
  //     { name: '青海', value: 3000 },
  //     { name: '甘肃', value: 4000 },
  //     { name: '内蒙古', value: 5000 },
  //     { name: '宁夏', value: 8088 },
  //     { name: '陕西', value: 6099 },
  //     { name: '黑龙江', value: 8000 },
  //     { name: '吉林', value: 3000 },
  //     { name: '辽宁', value: 5000 },
  //     { name: '河南', value: 9900 },
  //     { name: '北京', value: 8866 },
  //     { name: '天津', value: 6666 },
  //     { name: '江苏', value: 6666 },
  //     { name: '安徽', value: 8888 },
  //     { name: '湖北', value: 3888 },
  //     { name: '湖南', value: 5888 },
  //     { name: '河北', value: 3888 },
  //     { name: '山西', value: 4888 },
  //     { name: '四川', value: 2888 },
  //     { name: '广东', value: 5288 },
  //     { name: '山东', value: 8222 },
  //     { name: '广西', value: 8233 },
  //     { name: '重庆', value: 8255 },
  //     { name: '江西', value: 5288 },
  //     { name: '浙江', value: 5222 },
  //     { name: '福建', value: 8200 },
  //     { name: '台湾', value: 9200 },
  //     { name: '云南', value: 9200 },
  //     { name: '贵州', value: 6200 },
  //   ]
  // }
})

/**
 * 2.6竞品分析报告详情
 * https://yapi.aiads-dev.com/project/404/interface/api/11433
 */
mockGet('/yuqing/music/song/rival/report', () => {
  return {
    rivalList: [
      {
        rivalId: 1,
        rivalName: '挪威的森林',
        coverUrl: {
          source: 'piaoshen',
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/09/5601F7C08816AB57A432.jpg',
        },
        rivalDesc: '伍佰/wubai',
      },
      {
        rivalId: 2,
        rivalName: '学猫叫',
        coverUrl: {
          source: 'piaoshen',
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/09/5601F7C08816AB57A432.jpg',
        },
        rivalDesc: '学猫叫',
      },
    ],

    basisDataList: [
      {
        rivalName: '挪威的森林',
        releaseDate: '2019-12-22',
        companyName: '滚石音乐',
        playCount: '1,223',
        interactCount: '1.7万',
        favorable: 'B+',
      },
      {
        rivalName: '学猫叫',
        // releaseDate: '2019-02-22',
        // companyName: '滚石音乐',
        // playCount: '99,888',
        // interactCount: '2.6万',
        // favorable: 'A+',
      },
      {
        rivalName: '想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你',
        releaseDate: '2020-02-22',
        companyName: '滚石音乐',
        playCount: '66,883',
        interactCount: '3.8万',
        favorable: 'C+',
      },
    ],

    rankAnalysis: [
      {
        rivalName: '挪威的森林',
        rankCount: '',
        rankBest: '',
        rankType: '',
        platformList: [
          { platformName: '抖音', platformNotice: '上榜数/最高排名', platformValue: '3/NO.2' },
          { platformName: '酷我音乐', platformNotice: '上榜数/最高排名', platformValue: '8/NO.23' },
          { platformName: '搜狗音乐', platformNotice: '上榜数/最高排名', platformValue: '6/NO.88' },
          { platformName: '网易云音乐', platformNotice: '上榜数/最高排名', platformValue: '9/NO.21' },
          { platformName: 'QQ音乐', platformNotice: '上榜数/最高排名', platformValue: '3/NO.66' },
        ]
      },
      {
        rivalName: '学猫叫',
        rankCount: '8,311',
        rankBest: 'NO.82',
        rankType: '口水歌',
        platformList: [
          { platformName: '抖音', platformNotice: '上榜数/最高排名', platformValue: '3/NO.2' },
          { platformName: '酷我音乐', platformNotice: '上榜数/最高排名', platformValue: '8/NO.23' },
          { platformName: '搜狗音乐', platformNotice: '上榜数/最高排名', platformValue: '6/NO.88' },
          { platformName: '网易云音乐', platformNotice: '上榜数/最高排名', platformValue: '9/NO.21' },
          { platformName: 'QQ音乐', platformNotice: '上榜数/最高排名', platformValue: '3/NO.66' },
        ]
      },
      {
        rivalName: '想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你',
        rankCount: '8,311',
        rankBest: 'NO.182',
        rankType: '口水歌',
        platformList: [
          { platformName: '抖音', platformNotice: '上榜数/最高排名', platformValue: '3/NO.2' },
          { platformName: '酷我音乐', platformNotice: '上榜数/最高排名', platformValue: '8/NO.23' },
          { platformName: '搜狗音乐', platformNotice: '上榜数/最高排名', platformValue: '6/NO.88' },
          { platformName: '网易云音乐', platformNotice: '上榜数/最高排名', platformValue: '9/NO.21' },
          { platformName: 'QQ音乐', platformNotice: '上榜数/最高排名', platformValue: '3/NO.66' },
        ]
      },
    ],

    ageRangeList: [
      {
        ageType: '20岁以下',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 6360 },
          { rivalName: '挪威的森林', rivalPercent: 3960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 2520 },
        ]
      },
      {
        ageType: '20-24岁',
        rivalList: [
          { rivalName: '学猫叫', rivalPercent: 2360 },
          { rivalName: '挪威的森林', rivalPercent: 5960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 8520 },
        ]
      },
      {
        ageType: '25-29岁',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 1360 },
          { rivalName: '挪威的森林', rivalPercent: 2960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 3520 },
        ]
      },
      {
        ageType: '30-34岁',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 8360 },
          { rivalName: '挪威的森林', rivalPercent: 2960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 1520 },
        ]
      },
      {
        ageType: '35-39岁',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 2360 },
          { rivalName: '挪威的森林', rivalPercent: 8960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 1620 },
        ]
      },
      {
        ageType: '40岁以上',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 3360 },
          { rivalName: '挪威的森林', rivalPercent: 6960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 8520 },
        ]
      },
    ],

    genderList: [
      {
        rivalName: 'Last Dance',
        dataList: [
          { name: '男', value: 8100 },
          { name: '女', value: 1900 },
        ]
      },
      {
        rivalName: '挪威的森林',
        dataList: [
          { name: '男1', value: 5220 },
          { name: '女1', value: 4780 },
        ]
      },
      {
        rivalName: '挪威的森林是多少',
        dataList: [
          { name: '男', value: null },
          { name: '女', value: null },
        ]
      },
      {
        rivalName: '想见你想见你想见你想见你想见你想见你想见你想见你想见你',
        dataList: [
          { name: '男', value: 8220 },
          { name: '女2', value: 1780 },
        ],
      },
    ],

    userRegion: {
      cityList: [
        {
          rivalName: 'Last Dance',
          dataList: [
            { name: '深圳名字很长很长', value: 3128 },
            { name: '广州', value: 6880 },
            { name: '上海', value: null },
            { name: '北京', value: 0 },
            // { name: '杭州', value: 280 },
          ]
        },
        {
          rivalName: '挪威的森林',
          dataList: [
            { name: '深圳', value: 5120 },
            { name: '广州', value: 2880 },
            { name: '上海', value: 3880 },
            { name: '北京', value: 2880 },
            { name: '杭州', value: 8280 },
          ]
        },
        {
          rivalName: '想见你想见你想见你',
          dataList: [
            { name: '深圳', value: 1120 },
            { name: '广州', value: 3880 },
            { name: '上海', value: 5880 },
            { name: '北京', value: 7880 },
            { name: '杭州', value: 9280 },
          ]
        },
      ],
      provinceList: [
        {
          rivalName: '学猫叫',
          dataList: [
            { name: '深圳', value: 2120 },
            { name: '广州', value: 3880 },
            { name: '上海', value: 4880 },
            { name: '北京', value: 5880 },
            { name: '杭州', value: 880 },
          ]
        },
        {
          rivalName: '挪威的森林',
          dataList: [
            { name: '深圳', value: 2120 },
            { name: '广州', value: 3880 },
            { name: '上海', value: 5880 },
            { name: '北京', value: 8880 },
            { name: '杭州', value: 1280 },
          ]
        },
        {
          rivalName: '想见你想见你想见你',
          dataList: [
            { name: '深圳', value: 2120 },
            { name: '广州', value: 4880 },
            { name: '上海', value: 6880 },
            { name: '北京', value: 8880 },
            { name: '杭州', value: 1280 },
          ]
        },
      ],
    }
  }
})

/**
 * 2.6.1竞品分析报告详情-获取热度分析
 * https://yapi.aiads-dev.com/project/404/interface/api/11618
 */
mockGet('/yuqing/music/song/rival/heat/analysis', () => {
  const list = [
    {
      rivalName: '挪威的森林',
      data: [
        { date: 1583251200000, value: 32100 },
        { date: 1583337600000, value: 3211 },
        { date: 1583424000000, value: 300 },
        { date: 1583510400000, value: 32100 },
        { date: 1583596800000, value: 32100 },
        { date: 1583683200000, value: 32100 },
        { date: 1583769600000, value: 32100 },
      ]
    },
    {
      rivalName: '学猫叫',
      data: [
        { date: 1583251200000, value: 92100 },
        { date: 1583337600000, value: 2211 },
        { date: 1583424000000, value: 800 },
        { date: 1583510400000, value: 92100 },
        { date: 1583596800000, value: 82100 },
        { date: 1583683200000, value: 62100 },
        { date: 1583769600000, value: 52100 },
      ]
    },
    {
      rivalName: '想见你想见你想见你',
      data: [
        { date: 1583251200000, value: 22100 },
        { date: 1583337600000, value: 8211 },
        { date: 1583424000000, value: 1800 },
        { date: 1583510400000, value: 22100 },
        { date: 1583596800000, value: 52100 },
        { date: 1583683200000, value: 82100 },
        { date: 1583769600000, value: 92100 },
      ]
    },
  ]
  return {
    overAllHeat: list,
    platform: {
      interactList: [
        { platformName: '微博', dataList: list },
        { platformName: '微信', dataList: list },
        { platformName: '抖音', dataList: list },
      ],
      materialList: [
        { platformName: '抖音', dataList: list },
        { platformName: '微博', dataList: list },
        { platformName: '微信', dataList: list },
      ],
    },
    rivalList: [
      {
        rivalId: 1,
        rivalName: '挪威的森林',
        coverUrl: {
          source: 'piaoshen',
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/09/5601F7C08816AB57A432.jpg',
        },
        rivalDesc: '伍佰/wubai',
      },
      {
        rivalId: 2,
        rivalName: '学猫叫',
        coverUrl: {
          source: 'piaoshen',
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/09/5601F7C08816AB57A432.jpg',
        },
        rivalDesc: '学猫叫',
      },
    ],

    basisDataList: [
      {
        rivalName: '挪威的森林',
        releaseDate: '2019-12-22',
        companyName: '滚石音乐',
        playCount: '1,223',
        interactCount: '1.7万',
        favorable: 'B+',
      },
      {
        rivalName: '学猫叫',
        // releaseDate: '2019-02-22',
        // companyName: '滚石音乐',
        // playCount: '99,888',
        // interactCount: '2.6万',
        // favorable: 'A+',
      },
      {
        rivalName: '想见你想见你想见你想见你想见你想见你',
        releaseDate: '2020-02-22',
        companyName: '滚石音乐',
        playCount: '66,883',
        interactCount: '3.8万',
        favorable: 'C+',
      },
    ],
  }
})

/**
 * 2.6.2竞品分析报告详情-获取播放量对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11623
 */
mockGet('/yuqing/music/song/rival/play/analysis', () => {
  return {
    rivalPlay: rivalPlayData(),
    videoView: rivalPlayData(true),
  }
})

/**
 * 2.6.3竞品分析报告详情-获取口碑评论对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11628
 */
mockGet('/yuqing/music/song/rival/praise', () => {
  return {
    goodList: [
      {
        rivalName: 'Last Dance',
        rivalId: 1,
        percent: 1600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '挪威森林',
        rivalId: 2,
        percent: 8600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '想见你想见你想见你',
        rivalId: 3,
        percent: 3888,
        hotWordList: ['商务', '豪华无比', '象征']
      },
    ],
    neutralList: [
      {
        rivalName: '学猫叫',
        rivalId: 4,
        percent: 2680,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '挪威森林',
        rivalId: 5,
        percent: 3660,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '想见你想见你想见你',
        rivalId: 6,
        percent: 6888,
        hotWordList: ['商务', '豪华无比', '象征']
      },
    ],
    badList: [
      {
        rivalName: '学猫叫',
        rivalId: 7,
        percent: 600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '挪威森林',
        rivalId: 8,
        percent: 6600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '想见你想见你想见你',
        rivalId: 9,
        percent: 8888,
        hotWordList: ['商务', '豪华无比', '象征']
      },
    ],
  }
})
