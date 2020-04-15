import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

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
