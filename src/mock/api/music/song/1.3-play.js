import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

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
        { date: 1585756800000, eventName: '', eventId: 1 },
        { date: 1586016000000, eventName: '2事件名事件名事件名事件名事件名', eventId: null },
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
