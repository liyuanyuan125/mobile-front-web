import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

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
