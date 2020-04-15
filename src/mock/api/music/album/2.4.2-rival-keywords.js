import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

/**
 * 2.4.2竞品分析报告详情-获取口碑评论对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11613
 */
mockGet('/yuqing/music/album/rival/keywords', () => {
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
