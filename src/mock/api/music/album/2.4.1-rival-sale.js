import { mockGet, mockPost, mockPut, mockDel } from '../../../util'
import rivalPlayData from '../rivalPlayData'

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
