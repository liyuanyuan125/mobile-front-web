import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

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
    // {
    //   rivalName: '翻山越岭来看你',
    //   rivalId: 138,
    //   rivalDesc: '山姆·史密斯',
    //   rivalCover: {
    //     source: 'piaoshen',
    //     url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/11/25/E3FEEC10AEB32F1C71A3.jpg'
    //   },
    //   playingCount: '1,313',
    //   playingTrend: 8888,
    //   interactCount: '3.3亿',
    //   interactTrend: -88,
    // },
  ]
})
