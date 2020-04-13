import { mockGet, mockPost, mockPut, mockDel } from '../util'
import rivalPlayData from './rivalPlayData'

/**
 * 1.专辑详情页
 * https://yapi.aiads-dev.com/project/404/interface/api/10908
 */
mockGet('/yuqing/music/album/detail', ({ songId }) => {
  return {
    albumInfo: {
      albumName: '向死而生',
      albumSinger: 'Lana Del Rey / Lana Del Rey',
      albumPrice: '￥20',
      albumReleaseDate: '2020-02-22发行',
      releasePlatform: '多平台',
      hasDigital: true,
      rankingNum: '热搜NO.8',
      rankingName: '#Lana Delrey',
      rankingId: 1221,
      coverUrl: {
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
    albumOverView: {
      interactCount: '1,213.4万',
      interactTrend: -12,
      playCount: '1,213',
      playTrend: 32,
      singlePlayCount: '3,321',
      singlePlayTrend: 0,
      saleCount: '1,212.2万',
      saleTrend: 1211,
      yesterdaySaleRank: 'NO.500',
      yesterdaySaleTrend: -231,
    },

    musicList: [
      {
        musicId: 1,
        musicName: 'Yummy',
        heatCount: null,
        playCount: '888,222',
        commentCount: 0,
      },
      {
        musicId: 2,
        musicName: '名字很长名字很长很长很长很长很长很长很长',
        heatCount: '88,123,235',
        playCount: '99,888,222',
        commentCount: '22,688,000',
      },
      {
        musicId: 3,
        musicName: '水电费水电费',
        heatCount: '123,235',
        playCount: '888,222',
        commentCount: '688,000',
      },
      {
        musicId: 4,
        musicName: '师傅的说法是',
        heatCount: '123,235',
        playCount: '888,222',
        commentCount: '688,000',
      },
      {
        musicId: 5,
        musicName: '是发送到发送到发送到',
        heatCount: '123,235',
        playCount: '888,222',
        commentCount: '688,000',
      },
      {
        musicId: 6,
        musicName: '师傅的说法是是多少',
        heatCount: '123,235',
        playCount: '888,222',
        commentCount: '688,000',
      },
      {
        musicId: 7,
        musicName: '师傅的说法是是多少',
        heatCount: '123,235',
        playCount: '888,222',
        commentCount: '688,000',
      },
    ],

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
        { name: '男', value: 2220 },
        { name: '女', value: 7880 },
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

/**
 * 1.1专辑详情页-获取销售量分析数据
 * https://yapi.aiads-dev.com/project/404/interface/api/11243
 */
mockGet('/yuqing/music/album/sale/analysis', () => {
  return {
    platformList: [
      { name: '网易云音乐', value: 6880, countShow: '7.59亿' },
      { name: 'QQ音乐', value: 3888, countShow: '4.8亿' },
      { name: '酷我音乐', value: 2888, countShow: '3.8亿' },
    ],
    dailyPlatformList: [
      {
        platformName: '新浪',
        dataList: [
          { date: 1581782400000, value: 123231 },
          { date: 1582041600000, value: 823231 },
          { date: 1582300800000, value: 323231 },
        ]
      },
      {
        platformName: '网易',
        dataList: [
          { date: 1581782400000, value: 323231 },
          { date: 1582041600000, value: 223231 },
          { date: 1582300800000, value: 823231 },
        ]
      },
      {
        platformName: '搜狗',
        dataList: [
          { date: 1581782400000, value: 823231 },
          { date: 1582041600000, value: 123231 },
          { date: 1582300800000, value: 923231 },
        ]
      },
    ],
    dailyEventList: [
      { date: 1581782400000, eventName: '1事件名事件名事件名事件名事件名', eventId: 1 },
      { date: 1582041600000, eventName: '2事件名事件名事件名事件名事件名', eventId: 2 },
      { date: 1582300800000, eventName: '3事件名事件名事件名事件名事件名', eventId: 3 },
    ],
    dailyFormList: [
      {
        date: 1581782400000,
        saleCount: '276.9万',
        markName: '上线首日',
        platformList: [
          { name: '网易云音乐', value: '188.8万' },
          { name: 'QQ音乐', value: '88.8万' },
          { name: '酷我音乐', value: '' },
        ]
      },
      {
        date: 1582041600000,
        saleCount: '176.9万',
        platformList: [
          { name: '网易云音乐', value: '88.8万' },
          { name: 'QQ音乐', value: '38.8万' },
          { name: '酷我音乐', value: '20.8万' },
        ]
      },
      {
        date: 1582300800000,
        saleCount: '188.9万',
        platformList: [
          { name: '网易云音乐', value: '99.8万' },
          { name: 'QQ音乐', value: '66.8万' },
          { name: '酷我音乐', value: '' },
        ]
      },
    ]
  }
})

/**
 * 1.2专辑详情页-获取竞品对手
 * https://yapi.aiads-dev.com/project/404/interface/api/11233
 */
mockGet('/yuqing/music/album/rival/list', () => {
  return [
    {
      rivalName: '向死而生',
      rivalId: 123,
      rivalDesc: '伍佰',
      rivalCover: {
        source: 'piaoshen',
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
      },
      salesCount: '1,313',
      salesTrend: 0,
      interactCount: '1.3亿',
      interactTrend: 0,
      yesterdaySalesCount: '3.2万',
      yesterdaySalesTrend: 88,
      yesterdayInteractCount: '1.2万',
      yesterdayInteractTrend: 99,
      eventName: '英首相与女友订婚很长很长很长很长很长很长很长很长',
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
      salesCount: '1,313',
      salesTrend: 88131,
      interactCount: '8.3亿',
      interactTrend: -8880,
      yesterdaySalesCount: '8.2万',
      yesterdaySalesTrend: -88,
      yesterdayInteractCount: '2.2万',
      yesterdayInteractTrend: -99,
    },
    {
      rivalName: '翻山越岭来看你',
      rivalId: 138,
      rivalDesc: '山姆·史密斯',
      rivalCover: {
        source: 'piaoshen',
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
      },
      salesCount: '1,313',
      salesTrend: 0,
      interactCount: '3.3亿',
      interactTrend: 0,
      yesterdaySalesCount: '9.2万',
      yesterdaySalesTrend: 0,
      yesterdayInteractCount: '9.2万',
      yesterdayInteractTrend: 0,
    },
  ]
})

/**
 * 2.3用户分析二级页
 * https://yapi.aiads-dev.com/project/404/interface/api/11018
 */
mockGet('/yuqing/music/album/user/analysis', () => {
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

/**
 * 2.4竞品分析报告详情
 * https://yapi.aiads-dev.com/project/404/interface/api/11393
 */
mockGet('/yuqing/music/album/rival/analysis', () => {
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
        totalSaleCount: '1,223',
        totalInteractCount: '888,666',
        musicCount: '9',
        musicPlayCount: '2.8万',
        musicInteractCount: '6.6万',
        favorable: 'B+',
      },
      {
        rivalName: '学猫叫',
        releaseDate: '2019-02-22',
        companyName: '滚石音乐',
        totalSaleCount: '99,888',
        totalInteractCount: '888,666',
        musicCount: '12',
        musicPlayCount: '2.8万',
        musicInteractCount: '6.6万',
        favorable: 'A+',
      },
      {
        rivalName: '想见你想见你想见你',
        releaseDate: '2020-02-22',
        companyName: '滚石音乐',
        totalSaleCount: '66,883',
        totalInteractCount: '888,666',
        musicCount: '8',
        musicPlayCount: '2.8万',
        musicInteractCount: '6.6万',
        favorable: 'C+',
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
          { name: '男', value: 3120 },
          { name: '女', value: 6880 },
        ]
      },
      {
        rivalName: '挪威的森林',
        dataList: [
          { name: '男', value: 5220 },
          { name: '女', value: 4780 },
        ]
      },
      {
        rivalName: '想见你想见你想见你',
        dataList: [
          { name: '男', value: 8220 },
          { name: '女', value: 1780 },
        ]
      },
    ],

    userRegion: {
      cityList: [
        {
          rivalName: 'Last Dance',
          dataList: [
            { name: '深圳', value: 3120 },
            { name: '广州', value: 6880 },
            { name: '上海', value: 2880 },
            { name: '北京', value: 1880 },
            { name: '杭州', value: 280 },
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
 * 2.4.1竞品分析报告详情-获取销量对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11608
 */
mockGet('/yuqing/music/album/rival/analysis/sale', () => {
  // return [
  //   {
  //     platformName: '全部',
  //     rivalName: '挪威的森林',
  //     playCountShow: '12,432.4万',
  //     dataList: [
  //       { date: 1585756800000, value: 118888 },
  //       { date: 1586016000000, value: 128888 },
  //       { date: 1586275200000, value: 138888 },
  //     ],
  //     dateShowList: [
  //       { date: '2020-04-02', value: '118,888' },
  //       { date: '2020-04-05', value: '128,888' },
  //       { date: '2020-04-08', value: '138,888' },
  //     ]
  //   },
  // ]
  return [
    {
      "platformName": "网易云音乐",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "1,231"
        },
        {
          "date": "2020-04-02",
          "value": "1,931"
        },
        {
          "date": "2020-04-03",
          "value": "4,231"
        },
        {
          "date": "2020-04-05",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "人生海海人生海海人生海海人生海海人生海海人生海海",
      "dataList": [
        {
          "date": 1585714881000,
          "value": 123231
        },
        {
          "date": 1585801281000,
          "value": 323231
        },
        {
          "date": 1585887681000,
          "value": 623231
        },
        {
          "date": 1585974081000,
          "value": 123231
        },
        {
          "date": 1586060481000,
          "value": 183745
        },
        {
          "date": 1586060481000,
          "value": 323231
        },
        {
          "date": 1586233281000,
          "value": 303231
        }
      ]
    },
    {
      "platformName": "网易云音乐",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "1,231"
        },
        {
          "date": "2020-04-02",
          "value": "1,931"
        },
        {
          "date": "2020-04-03",
          "value": "4,231"
        },
        {
          "date": "2020-04-05",
          "value": "1,231"
        }
      ],
      "playCountShow": "",
      "rivalName": "最清楚",
      "dataList": [
        {
          "date": 1585714881000,
          "value": 228231
        },
        {
          "date": 1585801281000,
          "value": 300031
        },
        {
          "date": 1585887681000,
          "value": 923231
        },
        {
          "date": 1585974081000,
          "value": 108761
        },
        {
          "date": 1586060481000,
          "value": 283745
        },
        {
          "date": 1586060481000,
          "value": 423231
        },
        {
          "date": 1586233281000,
          "value": 103231
        }
      ]
    },
    {
      "platformName": "腾讯音乐",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "1,231"
        },
        {
          "date": "2020-04-02",
          "value": "1,931"
        },
        {
          "date": "2020-04-03",
          "value": "4,231"
        },
        {
          "date": "2020-04-05",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "哼唧哼唧",
      "dataList": [
        {
          "date": 1585714881000,
          "value": 10000
        },
        {
          "date": 1585801281000,
          "value": 328907
        },
        {
          "date": 1585887681000,
          "value": 442321
        },
        {
          "date": 1585974081000,
          "value": 123999
        },
        {
          "date": 1586060481000,
          "value": 180745
        },
        {
          "date": 1586060481000,
          "value": 12345
        },
        {
          "date": 1586233281000,
          "value": 703231
        }
      ]
    },
    {
      "platformName": "网易云音乐",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "1,231"
        },
        {
          "date": "2020-04-02",
          "value": "1,931"
        },
        {
          "date": "2020-04-03",
          "value": "4,231"
        },
        {
          "date": "2020-04-05",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "度卡拉胶",
      "dataList": [
        {
          "date": 1583902834605,
          "value": 1232313232
        }
      ]
    },
    {
      "platformName": "酷我音乐",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "1,231"
        },
        {
          "date": "2020-04-02",
          "value": "1,931"
        },
        {
          "date": "2020-04-03",
          "value": "4,231"
        },
        {
          "date": "2020-04-05",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "度卡拉胶",
      "dataList": [
        {
          "date": 1583902834605,
          "value": 1232313232
        }
      ]
    },
    {
      "platformName": "腾讯音乐",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "1,231"
        },
        {
          "date": "2020-04-02",
          "value": "1,931"
        },
        {
          "date": "2020-04-03",
          "value": "4,231"
        },
        {
          "date": "2020-04-05",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "度卡拉胶",
      "dataList": [
        {
          "date": 1583902834605,
          "value": 1232313232
        }
      ]
    },
    {
      "platformName": "全部",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "11,231"
        },
        {
          "date": "2020-04-02",
          "value": "12,931"
        },
        {
          "date": "2020-04-03",
          "value": "24,231"
        },
        {
          "date": "2020-04-05",
          "value": "61,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "度卡拉胶",
      "dataList": [
        {
          "date": 1583902834605,
          "value": 1232313232
        }
      ]
    }
  ]

  return [
    {
      "platformName": "网易云音乐",
      "dateShowList": [
        {
          "date": "2020-01-03",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "人生海海人生海海人生海海人生海海人生海海人生海海",
      "dataList": [
        {
          "date": 1585714881000,
          "value": 123231
        },
        {
          "date": 1585801281000,
          "value": 323231
        },
        {
          "date": 1585887681000,
          "value": 623231
        },
        {
          "date": 1585974081000,
          "value": 123231
        },
        {
          "date": 1586060481000,
          "value": 183745
        },
        {
          "date": 1586060481000,
          "value": 323231
        },
        {
          "date": 1586233281000,
          "value": 303231
        }
      ]
    },
    {
      "platformName": "网易云音乐",
      "dateShowList": [
        {
          "date": "2020-04-01",
          "value": "1,231"
        },
        {
          "date": "2020-04-02",
          "value": "1,931"
        },
        {
          "date": "2020-04-03",
          "value": "4,231"
        },
        {
          "date": "2020-04-05",
          "value": "1,231"
        }
      ],
      "playCountShow": "",
      "rivalName": "最清楚",
      "dataList": [
        {
          "date": 1585714881000,
          "value": 228231
        },
        {
          "date": 1585801281000,
          "value": 300031
        },
        {
          "date": 1585887681000,
          "value": 923231
        },
        {
          "date": 1585974081000,
          "value": 108761
        },
        {
          "date": 1586060481000,
          "value": 283745
        },
        {
          "date": 1586060481000,
          "value": 423231
        },
        {
          "date": 1586233281000,
          "value": 103231
        }
      ]
    },
    {
      "platformName": "网易云音乐",
      "dateShowList": [
        {
          "date": "2020-01-03",
          "value": "1,231"
        },
        {
          "date": "2020-01-03",
          "value": "1,231"
        },
        {
          "date": "2020-01-03",
          "value": "1,231"
        },
        {
          "date": "2020-01-03",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "哼唧哼唧",
      "dataList": [
        {
          "date": 1585714881000,
          "value": 10000
        },
        {
          "date": 1585801281000,
          "value": 328907
        },
        {
          "date": 1585887681000,
          "value": 442321
        },
        {
          "date": 1585974081000,
          "value": 123999
        },
        {
          "date": 1586060481000,
          "value": 180745
        },
        {
          "date": 1586060481000,
          "value": 12345
        },
        {
          "date": 1586233281000,
          "value": 703231
        }
      ]
    },
    {
      "platformName": "网易云音乐",
      "dateShowList": [
        {
          "date": "2020-01-03",
          "value": "1,231"
        },
        {
          "date": "2020-01-03",
          "value": "1,231"
        },
        {
          "date": "2020-01-03",
          "value": ""
        },
        {
          "date": "2020-01-03",
          "value": "1,231"
        }
      ],
      "playCountShow": "2,432.4万",
      "rivalName": "度卡拉胶",
      "dataList": [
        {
          "date": 1583902834605,
          "value": 1232313232
        }
      ]
    }
  ]
  // return rivalPlayData()
})

/**
 * 2.4.1竞品分析报告详情-获取销量对比-对齐发行时间
 * https://yapi.aiads-dev.com/project/404/interface/api/11648
 */
mockGet('/yuqing/music/album/rival/analysis/sale/align-release', () => {
  return [
    {
      platformName: '全部',
      rivalName: '挪威的森林',
      playCountShow: '12,432.4万',
      dataList: [
        { date: '发行首日', value: 118888 },
        { date: '发行1日', value: 128888 },
        { date: '发行2日', value: 138888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '118,888' },
        { date: '发行1日', value: '128,888' },
        { date: '发行2日', value: '138,888' },
      ]
    },
    {
      platformName: '全部',
      rivalName: '学猫叫',
      playCountShow: '23,432.4万',
      dataList: [
        { date: '发行首日', value: 138888 },
        { date: '发行1日', value: 148888 },
        { date: '发行2日', value: 158888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '138,888' },
        { date: '发行1日', value: '148,888' },
        { date: '发行2日', value: '158,888' },
      ]
    },
    {
      platformName: '全部',
      rivalName: '爱我别走',
      playCountShow: '38,432.4万',
      dataList: [
        { date: '发行首日', value: 168888 },
        { date: '发行1日', value: 178888 },
        { date: '发行2日', value: 188888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '138,888' },
        { date: '发行1日', value: '148,888' },
        { date: '发行2日', value: '158,888' },
      ]
    },
    {
      platformName: '网易云音乐',
      rivalName: '挪威的森林',
      playCountShow: '2,432.4万',
      dataList: [
        { date: '发行首日', value: 18888 },
        { date: '发行1日', value: 28888 },
        { date: '发行2日', value: 38888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '18,888' },
        { date: '发行1日', value: '28,888' },
        { date: '发行2日', value: '38,888' },
      ]
    },
    {
      platformName: '网易云音乐',
      rivalName: '学猫叫',
      playCountShow: '3,432.4万',
      dataList: [
        { date: '发行首日', value: 38888 },
        { date: '发行1日', value: 48888 },
        { date: '发行2日', value: 58888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '38,888' },
        { date: '发行1日', value: '48,888' },
        { date: '发行2日', value: '58,888' },
      ]
    },
    {
      platformName: '网易云音乐',
      rivalName: '爱我别走',
      playCountShow: '8,432.4万',
      dataList: [
        { date: '发行首日', value: 68888 },
        { date: '发行1日', value: 78888 },
        { date: '发行2日', value: 88888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '38,888' },
        { date: '发行1日', value: '48,888' },
        { date: '发行2日', value: '58,888' },
      ]
    },
    {
      platformName: 'QQ音乐',
      rivalName: '学猫叫',
      playCountShow: '8,432.4万',
      dataList: [
        { date: '发行首日', value: 18888 },
        { date: '发行1日', value: 38888 },
        { date: '发行2日', value: 58888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '18,888' },
        { date: '发行1日', value: '38,888' },
        { date: '发行2日', value: '58,888' },
      ]
    },
    {
      platformName: 'QQ音乐',
      rivalName: '爱我别走',
      playCountShow: '8,432.4万',
      dataList: [
        { date: '发行首日', value: 5888 },
        { date: '发行1日', value: 6888 },
        { date: '发行2日', value: 7888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '5,888' },
        { date: '发行1日', value: '6,888' },
        { date: '发行2日', value: '7,888' },
      ]
    },
    {
      platformName: '酷我',
      rivalName: '学猫叫',
      playCountShow: '8,432.4万',
      dataList: [
        { date: '发行首日', value: 18888 },
        { date: '发行1日', value: 88888 },
        { date: '发行2日', value: 98888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '18,888' },
        { date: '发行1日', value: '88,888' },
        { date: '发行2日', value: '98,888' },
      ]
    },
    {
      platformName: '酷狗',
      rivalName: '学猫叫',
      playCountShow: '9,432.4万',
      dataList: [
        { date: '发行首日', value: 28888 },
        { date: '发行1日', value: 38888 },
        { date: '发行2日', value: 78888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '28,888' },
        { date: '发行1日', value: '38,888' },
        { date: '发行2日', value: '78,888' },
      ]
    },
    {
      platformName: '虾米',
      rivalName: '爽爽爽',
      playCountShow: '3,432.4万',
      dataList: [
        { date: '发行首日', value: 38888 },
        { date: '发行1日', value: 58888 },
        { date: '发行2日', value: 88888 },
      ],
      dateShowList: [
        { date: '发行首日', value: '38,888' },
        { date: '发行1日', value: '58,888' },
        { date: '发行2日', value: '88,888' },
      ]
    },
  ]
})


/**
 * 2.4.2竞品分析报告详情-获取口碑评论对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11613
 */
mockGet('/yuqing/music/album/rival/keywords', () => {
  return {
    goodList: [
      {
        rivalName: 'Last Dance',
        percent: 1600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '挪威森林',
        percent: 8600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '想见你想见你想见你',
        percent: 3888,
        hotWordList: ['商务', '豪华无比', '象征']
      },
    ],
    neutralList: [
      {
        rivalName: '学猫叫',
        percent: 2680,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '挪威森林',
        percent: 3660,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '想见你想见你想见你',
        percent: 6888,
        hotWordList: ['商务', '豪华无比', '象征']
      },
    ],
    badList: [
      {
        rivalName: '学猫叫',
        percent: 600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '挪威森林',
        percent: 6600,
        hotWordList: ['商务', '豪华无比', '象征']
      },
      {
        rivalName: '想见你想见你想见你',
        percent: 8888,
        hotWordList: ['商务', '豪华无比', '象征']
      },
    ],
  }
})
