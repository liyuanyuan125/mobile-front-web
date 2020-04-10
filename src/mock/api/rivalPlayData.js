// 数据结构：https://yapi.aiads-dev.com/project/404/interface/api/11608
export default function(isVideo = false) {
  return [
    {
      platformName: '全部',
      rivalName: '挪威的森林',
      playCountShow: '12,432.4万',
      dataList: [
        { date: 1585756800000, value: isVideo ? 58888 : 118888 },
        { date: 1586016000000, value: isVideo ? 68888 : 128888 },
        { date: 1586275200000, value: isVideo ? 78888 : 138888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: isVideo ? '58,888' : '118,888' },
        { date: '2020-04-05', value: isVideo ? '68,888' : '128,888' },
        { date: '2020-04-08', value: isVideo ? '78,888' : '138,888' },
      ]
    },
    {
      platformName: '全部',
      rivalName: '学猫叫',
      playCountShow: '23,432.4万',
      dataList: [
        { date: 1585756800000, value: isVideo ? 18888 : 138888 },
        { date: 1586016000000, value: isVideo ? 38888 : 148888 },
        { date: 1586275200000, value: isVideo ? 88888 : 158888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: isVideo ? '18,888' : '138,888' },
        { date: '2020-04-05', value: isVideo ? '38,888' : '148,888' },
        { date: '2020-04-08', value: isVideo ? '88,888' : '158,888' },
      ]
    },
    {
      platformName: '全部',
      rivalName: '爱我别走',
      playCountShow: '38,432.4万',
      dataList: [
        { date: 1585756800000, value: isVideo ? 108888 : 168888 },
        { date: 1586016000000, value: isVideo ? 118888 : 178888 },
        { date: 1586275200000, value: isVideo ? 128888 : 188888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: isVideo ? '108,888' : '138,888' },
        { date: '2020-04-05', value: isVideo ? '118,888' : '148,888' },
        { date: '2020-04-08', value: isVideo ? '128,888' : '158,888' },
      ]
    },
    {
      platformName: '网易云音乐',
      rivalName: '挪威的森林',
      playCountShow: '2,432.4万',
      dataList: [
        { date: 1585756800000, value: 18888 },
        { date: 1586016000000, value: 28888 },
        { date: 1586275200000, value: 38888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '18,888' },
        { date: '2020-04-05', value: '28,888' },
        { date: '2020-04-08', value: '38,888' },
      ]
    },
    {
      platformName: '网易云音乐',
      rivalName: '学猫叫',
      playCountShow: '3,432.4万',
      dataList: [
        { date: 1585756800000, value: 38888 },
        { date: 1586016000000, value: 48888 },
        { date: 1586275200000, value: 58888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '38,888' },
        { date: '2020-04-05', value: '48,888' },
        { date: '2020-04-08', value: '58,888' },
      ]
    },
    {
      platformName: '网易云音乐',
      rivalName: '爱我别走',
      playCountShow: '8,432.4万',
      dataList: [
        { date: 1585756800000, value: 68888 },
        { date: 1586016000000, value: 78888 },
        { date: 1586275200000, value: 88888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '38,888' },
        { date: '2020-04-05', value: '48,888' },
        { date: '2020-04-08', value: '58,888' },
      ]
    },
    {
      platformName: 'QQ音乐',
      rivalName: '学猫叫',
      playCountShow: '8,432.4万',
      dataList: [
        { date: 1585756800000, value: 18888 },
        { date: 1586016000000, value: 38888 },
        { date: 1586275200000, value: 58888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '18,888' },
        { date: '2020-04-05', value: '38,888' },
        { date: '2020-04-08', value: '58,888' },
      ]
    },
    {
      platformName: 'QQ音乐',
      rivalName: '爱我别走',
      playCountShow: '8,432.4万',
      dataList: [
        { date: 1585756800000, value: 5888 },
        { date: 1586016000000, value: 6888 },
        { date: 1586275200000, value: 7888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '5,888' },
        { date: '2020-04-05', value: '6,888' },
        { date: '2020-04-08', value: '7,888' },
      ]
    },
    {
      platformName: '酷我',
      rivalName: '学猫叫',
      playCountShow: '8,432.4万',
      dataList: [
        { date: 1585756800000, value: 18888 },
        { date: 1586016000000, value: 88888 },
        { date: 1586275200000, value: 98888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '18,888' },
        { date: '2020-04-05', value: '88,888' },
        { date: '2020-04-08', value: '98,888' },
      ]
    },
    {
      platformName: '酷狗',
      rivalName: '学猫叫',
      playCountShow: '9,432.4万',
      dataList: [
        { date: 1585756800000, value: 28888 },
        { date: 1586016000000, value: 38888 },
        { date: 1586275200000, value: 78888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '28,888' },
        { date: '2020-04-05', value: '38,888' },
        { date: '2020-04-08', value: '78,888' },
      ]
    },
    {
      platformName: '虾米',
      rivalName: '爽爽爽',
      playCountShow: '3,432.4万',
      dataList: [
        { date: 1585756800000, value: 38888 },
        { date: 1586016000000, value: 58888 },
        { date: 1586275200000, value: 88888 },
      ],
      dateShowList: [
        { date: '2020-04-02', value: '38,888' },
        { date: '2020-04-05', value: '58,888' },
        { date: '2020-04-08', value: '88,888' },
      ]
    },
  ]
}
