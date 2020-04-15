import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

/**
 * 1.1专辑详情页-获取销售量分析数据
 * https://yapi.aiads-dev.com/project/404/interface/api/11243
 */
mockGet('/yuqing/music/album/sale/analysis', () => {
  return {
    "platformList": [
      {
        "name": "网易云音乐",
        "value": 1600,
        "countShow": "2.3亿"
      },
      {
        "name": "腾讯音乐",
        "value": 1000,
        "countShow": "1.3亿"
      },
      {
        "name": "酷我音乐",
        "value": 600,
        "countShow": "0.3亿"
      },
      {
        "name": "搜狗音乐",
        "value": 500,
        "countShow": "0.2亿"
      }
    ],
    "dailyFormList": [
      {
        "date": 1583896221000,
        "saleCount": "1.2万",
        "platformList": [
          {
            "name": "QQ音乐",
            "value": "2,342万"
          },
          {
            "name": "QQ音乐",
            "value": "2,342万"
          }
        ],
        "markName": "上线首日"
      },
      {
        "date": 1583896221000,
        "saleCount": "1.2万",
        "platformList": [
          {
            "name": "QQ音乐",
            "value": "2,342万"
          }
        ],
        "markName": "上线首日"
      }
    ],
    "dailyPlatformList": [
      {
        "platformName": "网易云音乐",
        "dataList": [
          {
            "date": 1585714881000,
            "value": 22321
          },
          {
            "date": 1585801281000,
            "value": 32321
          },
          {
            "date": 1585887681000,
            "value": 62321
          },
          {
            "date": 1585974081000,
            "value": 12321
          },
          {
            "date": 1586060481000,
            "value": 22321
          },
          {
            "date": 1586146881000,
            "value": 32389
          },
          {
            "date": 1586233281000,
            "value": 32321
          }
        ]
      },
      {
        "platformName": "QQ音乐",
        "dataList": [
          {
            "date": 1585714881000,
            "value": 42321
          },
          {
            "date": 1585801281000,
            "value": 16221
          },
          {
            "date": 1585887681000,
            "value": 42321
          },
          {
            "date": 1585974081000,
            "value": 32321
          },
          {
            "date": 1586060481000,
            "value": 12321
          },
          {
            "date": 1586146881000,
            "value": 52389
          },
          {
            "date": 1586233281000,
            "value": 12321
          }
        ]
      },
      {
        "platformName": "腾讯音乐",
        "dataList": [
          {
            "date": 1585714881000,
            "value": 72321
          },
          {
            "date": 1585801281000,
            "value": 2321
          },
          {
            "date": 1585887681000,
            "value": 11321
          },
          {
            "date": 1585974081000,
            "value": 19321
          },
          {
            "date": 1586060481000,
            "value": 28321
          },
          {
            "date": 1586146881000,
            "value": 30389
          },
          {
            "date": 1586233281000,
            "value": 9321
          }
        ]
      },
      {
        "platformName": "酷狗音乐",
        "dataList": [
          {
            "date": 1585714881000,
            "value": 2321
          },
          {
            "date": 1585801281000,
            "value": 9321
          },
          {
            "date": 1585887681000,
            "value": 7321
          },
          {
            "date": 1585974081000,
            "value": 6321
          },
          {
            "date": 1586060481000,
            "value": 5321
          },
          {
            "date": 1586146881000,
            "value": 8389
          },
          {
            "date": 1586233281000,
            "value": 11321
          }
        ]
      }
    ],
    "dailyEventList": [
      {
        "date": 1585801281000,
        "eventId": "13232",
        "eventName": "这个时间可以点击查看的"
      },
      {
        "date": 1586146881000,
        "eventId": "1323",
        "eventName": "冲击最后的股市"
      },
      {
        "date": 1586233281000,
        "eventId": "232",
        "eventName": "冲击最后的股市"
      }
    ]
  }
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
