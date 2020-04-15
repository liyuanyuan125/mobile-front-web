import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

/**
 * 2.6竞品分析报告详情
 * https://yapi.aiads-dev.com/project/404/interface/api/11433
 */
mockGet('/yuqing/music/song/rival/report', () => {
  return {
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
        rivalName: '想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你',
        releaseDate: '2020-02-22',
        companyName: '滚石音乐',
        playCount: '66,883',
        interactCount: '3.8万',
        favorable: 'C+',
      },
    ],

    rankAnalysis: [
      {
        rivalName: '挪威的森林',
        rankCount: '',
        rankBest: '',
        rankType: '',
        platformList: [
          { platformName: '抖音', platformNotice: '上榜数/最高排名', platformValue: '3/NO.2' },
          { platformName: '酷我音乐', platformNotice: '上榜数/最高排名', platformValue: '8/NO.23' },
          { platformName: '搜狗音乐', platformNotice: '上榜数/最高排名', platformValue: '6/NO.88' },
          { platformName: '网易云音乐', platformNotice: '上榜数/最高排名', platformValue: '9/NO.21' },
          { platformName: 'QQ音乐', platformNotice: '上榜数/最高排名', platformValue: '3/NO.66' },
        ]
      },
      {
        rivalName: '学猫叫',
        rankCount: '8,311',
        rankBest: 'NO.82',
        rankType: '口水歌',
        platformList: [
          { platformName: '抖音', platformNotice: '上榜数/最高排名', platformValue: '3/NO.2' },
          { platformName: '酷我音乐', platformNotice: '上榜数/最高排名', platformValue: '8/NO.23' },
          { platformName: '搜狗音乐', platformNotice: '上榜数/最高排名', platformValue: '6/NO.88' },
          { platformName: '网易云音乐', platformNotice: '上榜数/最高排名', platformValue: '9/NO.21' },
          { platformName: 'QQ音乐', platformNotice: '上榜数/最高排名', platformValue: '3/NO.66' },
        ]
      },
      {
        rivalName: '想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你想见你',
        rankCount: '8,311',
        rankBest: 'NO.182',
        rankType: '口水歌',
        platformList: [
          { platformName: '抖音', platformNotice: '上榜数/最高排名', platformValue: '3/NO.2' },
          { platformName: '酷我音乐', platformNotice: '上榜数/最高排名', platformValue: '8/NO.23' },
          { platformName: '搜狗音乐', platformNotice: '上榜数/最高排名', platformValue: '6/NO.88' },
          { platformName: '网易云音乐', platformNotice: '上榜数/最高排名', platformValue: '9/NO.21' },
          { platformName: 'QQ音乐', platformNotice: '上榜数/最高排名', platformValue: '3/NO.66' },
        ]
      },
    ],

    ageRangeList: [
      {
        ageType: '20岁以下',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 6360 },
          { rivalName: '挪威的森林', rivalPercent: 3960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 2520 },
        ]
      },
      {
        ageType: '20-24岁',
        rivalList: [
          { rivalName: '学猫叫', rivalPercent: 2360 },
          { rivalName: '挪威的森林', rivalPercent: 5960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 8520 },
        ]
      },
      {
        ageType: '25-29岁',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 1360 },
          { rivalName: '挪威的森林', rivalPercent: 2960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 3520 },
        ]
      },
      {
        ageType: '30-34岁',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 8360 },
          { rivalName: '挪威的森林', rivalPercent: 2960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 1520 },
        ]
      },
      {
        ageType: '35-39岁',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 2360 },
          { rivalName: '挪威的森林', rivalPercent: 8960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 1620 },
        ]
      },
      {
        ageType: '40岁以上',
        rivalList: [
          { rivalName: 'Last Dance', rivalPercent: 3360 },
          { rivalName: '挪威的森林', rivalPercent: 6960 },
          { rivalName: '想见你想见你想见你', rivalPercent: 8520 },
        ]
      },
    ],

    genderList: [
      {
        rivalName: 'Last Dance',
        dataList: [
          { name: '男', value: 1100 },
          { name: '女', value: 1900 },
        ]
      },
      {
        rivalName: '挪威的森林',
        dataList: [
          { name: '男', value: 0 },
          { name: '女', value: 2888 },
        ]
      },
      {
        rivalName: '挪威的森林是多少',
        dataList: [
          { name: '男', value: null },
          { name: '女', value: null },
        ]
      },
      {
        rivalName: '空串测试测试',
        dataList: [
          { name: '男', value: '' },
          { name: '女', value: 888 },
        ]
      },
      {
        rivalName: '全部都是空串',
        dataList: [
          { name: '男', value: '' },
          { name: '女', value: '' },
        ]
      },
      {
        rivalName: '想见你想见你想见你想见你想见你想见你想见你想见你想见你',
        dataList: [
          { name: '男', value: 8220 },
          { name: '女2', value: 1780 },
        ],
      },
    ],

    userRegion: {
      cityList: [
        {
          rivalName: 'Last Dance',
          dataList: [
            { name: '深圳名字很长很长', value: 3128 },
            { name: '广州', value: 6880 },
            { name: '上海', value: null },
            { name: '北京', value: 0 },
            // { name: '杭州', value: 280 },
          ]
        },
        {
          rivalName: '挪威的森林',
          dataList: [
            { name: '深圳', value: 5120 },
            { name: '广州', value: 2880 },
            { name: '上海', value: 3880 },
            { name: '北京', value: 2880 },
            { name: '杭州', value: 8280 },
          ]
        },
        {
          rivalName: '想见你想见你想见你',
          dataList: [
            { name: '深圳', value: 1120 },
            { name: '广州', value: 3880 },
            { name: '上海', value: 5880 },
            { name: '北京', value: 7880 },
            { name: '杭州', value: 9280 },
          ]
        },
      ],
      provinceList: [
        {
          rivalName: '学猫叫',
          dataList: [
            { name: '深圳', value: 2120 },
            { name: '广州', value: 3880 },
            { name: '上海', value: 4880 },
            { name: '北京', value: 5880 },
            { name: '杭州', value: 880 },
          ]
        },
        {
          rivalName: '挪威的森林',
          dataList: [
            { name: '深圳', value: 2120 },
            { name: '广州', value: 3880 },
            { name: '上海', value: 5880 },
            { name: '北京', value: 8880 },
            { name: '杭州', value: 1280 },
          ]
        },
        {
          rivalName: '想见你想见你想见你',
          dataList: [
            { name: '深圳', value: 2120 },
            { name: '广州', value: 4880 },
            { name: '上海', value: 6880 },
            { name: '北京', value: 8880 },
            { name: '杭州', value: 1280 },
          ]
        },
      ],
    }
  }
})
