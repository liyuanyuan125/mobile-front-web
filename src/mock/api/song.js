import { mockGet, mockPost, mockPut, mockDel } from '../util'

mockGet('/yuqing/song/detail', ({ songId }) => {
  return {
    songInfo: {
      songName: '向死而生',
      songSinger: 'Lana Del Rey / Lana Del Rey',
      releaseDate: '2020-02-22发行',
      releasePlatform: '多平台',
      rankingNum: '热搜NO.8',
      rankingName: '#Lana Delrey',
      rankingId: 1221,
      songCover: {
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/08/07/122067D54C1C0413C52E.jpg',
        source: 'piaoshen'
      },
      favorable: 'B+',
    },

    // 弹框简洁
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
      playCount: '1,213',
      playTrend: 32,
      heatCount: '3,321',
      heatTrend: 0,
    },

    // 榜单表现
    rankAnalysis: {
      rankCount: '2,311',
      rankBest: 'NO.32',
      rankType: '流行 最热',
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
        { name: '男', value: 3220 },
        { name: '女', value: 6880 },
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
        heatCount: '1.2万',
        heatTrend: 132
      },
      {
        singerName: '汪汪汪',
        singerId: 333,
        singerCover: {
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/10/31/562EDE9160B003AFECEB.jpg',
          source: 'piaoshen',
        },
        heatCount: '1.2万',
        heatTrend: -132
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

mockGet('/yuqing/song/heat/analysis', () => {
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

mockGet('/yuqing/song/heat/analysis', () => {
  return {
    songMusicView: {
      platformList: [
        { name: '网易云音乐', value: 6880, countShow: '7.59亿' },
        { name: 'QQ音乐', value: 3888, countShow: '4.8亿' },
        { name: '酷我音乐', value: 2888, countShow: '3.8亿' },
      ],
      dailyPlay: {
        eventName: '',
        eventId: '',
      },
      dailyFormList: [
        {
          date: 1581782400000,
          playCount: '276.9万',
          markName: '上线首日',
          platformList: [
            { name: '网易云音乐', value: '188.8万' },
            { name: 'QQ音乐', value: '88.8万' },
            { name: '酷我音乐', value: '' },
          ]
        },
        {
          date: 1582041600000,
          playCount: '176.9万',
          platformList: [
            { name: '网易云音乐', value: '88.8万' },
            { name: 'QQ音乐', value: '38.8万' },
            { name: '酷我音乐', value: '20.8万' },
          ]
        },
        {
          date: 1582300800000,
          playCount: '188.9万',
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
      dailyPlay: {
        eventName: '',
        eventId: '',
      },
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
          date: 1582041600000,
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

mockGet('/yuqing/song/rival/list', () => {
  return [
    {
      rivalName: '向死而生',
      rivalId: 123,
      rivalDesc: '伍佰',
      rivalCover: {
        source: 'piaoshen',
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
      },
      playingCount: '1,313',
      playingTrend: 1318,
      interactCount: '1.3亿',
      interactTrend: 0,
      eventName: '英首相与女友订婚',
      eventCreateTime: 1583909626668,
    },
    {
      rivalName: 'Tomorrow',
      rivalId: 128,
      rivalDesc: '山姆·史密斯',
      rivalCover: {
        source: 'piaoshen',
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
      },
      playingCount: '1,313',
      playingTrend: 88131,
      interactCount: '8.3亿',
      interactTrend: -8880,
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
      playingTrend: 0,
      interactCount: '3.3亿',
      interactTrend: 0,
    },
  ]
})

mockGet('/yuqing/music/song/user/analysis', () => {
  return {
    genderList: [
      { value: 1335, name: '男性' },
      { value: 310, name: '女性' }
    ],

    ageRangeList: [
      { name: '小于19岁', value: 880 },
      { name: '20-24', value: 1760 },
      { name: '25-29', value: 3280 },
      { name: '30-34', value: 2800 },
      { name: '35-39', value: 920 },
      { name: '大于40岁', value: 310 },
    ],

    userRegionList: [
      { name: '新疆', value: 0 },
      { name: '西藏', value: 2080 },
      { name: '青海', value: 3000 },
      { name: '甘肃', value: 4000 },
      { name: '内蒙古', value: 5000 },
      { name: '宁夏', value: 8088 },
      { name: '陕西', value: 6099 },
      { name: '黑龙江', value: 8000 },
      { name: '吉林', value: 3000 },
      { name: '辽宁', value: 5000 },
      { name: '河南', value: 9900 },
      { name: '北京', value: 8866 },
      { name: '天津', value: 6666 },
      { name: '江苏', value: 6666 },
      { name: '安徽', value: 8888 },
      { name: '湖北', value: 3888 },
      { name: '湖南', value: 5888 },
      { name: '河北', value: 3888 },
      { name: '山西', value: 4888 },
      { name: '四川', value: 2888 },
      { name: '广东', value: 5288 },
      { name: '山东', value: 8222 },
      { name: '广西', value: 8233 },
      { name: '重庆', value: 8255 },
      { name: '江西', value: 5288 },
      { name: '浙江', value: 5222 },
      { name: '福建', value: 8200 },
      { name: '台湾', value: 9200 },
      { name: '云南', value: 9200 },
      { name: '贵州', value: 6200 },
    ]
  }
})
