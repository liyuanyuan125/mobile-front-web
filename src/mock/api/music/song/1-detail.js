import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

/**
 * 1.单曲详情页
 * https://yapi.aiads-dev.com/project/404/interface/api/10878
 */
mockGet('/yuqing/music/song/detail', ({ songId }) => {
  return {
    songInfo: {
      songName: '向死而生很长很长很长很长很长很长很长很长很长很长很长很长',
      songSinger: 'Lana Del Rey / Lana Del Rey很长很长很长很长很长很长很长很长很长很长',
      releaseDate: '2020-02-22发行',
      releasePlatform: '多平台',
      rankingNum: '热搜NO.8',
      rankingName: '比伯结婚视频很长很长很长很长很长',
      rankingId: 1221,
      songCover: {
        url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/news/images/2019/08/07/122067D54C1C0413C52E.jpg',
        source: 'piaoshen'
      },
      favorable: 'B+',
    },

    // 弹框简介
    basisDataList: [
      { name: '单曲名称1', value: 'Last Dance' },
      { name: '单曲名称2', value: '' },
      { name: '单曲名称3', value: '挪威的森林3' },
      { name: '单曲名称4', value: null },
      { name: '单曲名称5', value: 0 },
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
      playCount: '',
      playTrend: 3288888,
      heatCount: '3,321',
      heatTrend: 0,
    },

    // 榜单表现
    rankAnalysis: {
      rankCount: '2,588',
      rankBest: 'NO.38',
      rankType: '流行 飙升',
      // rankType: '水电费沙发 沙发斯蒂芬 斯蒂芬 斯蒂芬',
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
        { name: '男', value: 9990 },
        { name: '女', value: 10 },
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
        heatCount: '8.88万',
        heatTrend: 0
      },
      {
        singerName: '汪汪汪',
        singerId: 333,
        singerCover: {
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/10/31/562EDE9160B003AFECEB.jpg',
          source: 'piaoshen',
        },
        heatCount: '1.2万',
        heatTrend: -1328888
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
      {
        singerName: '汪汪汪',
        singerId: 833,
        singerCover: {
          url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/movie/images/2019/10/31/562EDE9160B003AFECEB.jpg',
          source: 'piaoshen',
        },
        heatCount: '',
        heatTrend: 0
      },
    ]
  }
})
