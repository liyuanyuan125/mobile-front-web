import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

/**
 * 2.4竞品分析报告详情
 * https://yapi.aiads-dev.com/project/404/interface/api/11393
 */
mockGet('/yuqing/music/album/rival/analysis', () => {
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
        totalSaleCount: '1,223',
        totalInteractCount: '888,666',
        musicCount: '9',
        musicPlayCount: '2.8万',
        musicInteractCount: '6.6万',
        favorable: 'B+',
      },
      {
        rivalName: '学猫叫',
        releaseDate: '2019-02-22',
        companyName: '滚石音乐',
        totalSaleCount: '99,888',
        totalInteractCount: '888,666',
        musicCount: '12',
        musicPlayCount: '2.8万',
        musicInteractCount: '6.6万',
        favorable: 'A+',
      },
      {
        rivalName: '想见你想见你想见你',
        releaseDate: '2020-02-22',
        companyName: '滚石音乐',
        totalSaleCount: '66,883',
        totalInteractCount: '888,666',
        musicCount: '8',
        musicPlayCount: '2.8万',
        musicInteractCount: '6.6万',
        favorable: 'C+',
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
          { name: '男', value: 3120 },
          { name: '女', value: 6880 },
        ]
      },
      {
        rivalName: '挪威的森林',
        dataList: [
          { name: '男', value: 5220 },
          { name: '女', value: 4780 },
        ]
      },
      {
        rivalName: '想见你想见你想见你',
        dataList: [
          { name: '男', value: 8220 },
          { name: '女', value: 1780 },
        ]
      },
    ],

    userRegion: {
      cityList: [
        {
          rivalName: 'Last Dance',
          dataList: [
            { name: '深圳', value: 3120 },
            { name: '广州', value: 6880 },
            { name: '上海', value: 2880 },
            { name: '北京', value: 1880 },
            { name: '杭州', value: 280 },
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
