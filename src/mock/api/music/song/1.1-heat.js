import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

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
