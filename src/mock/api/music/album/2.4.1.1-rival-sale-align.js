import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

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
