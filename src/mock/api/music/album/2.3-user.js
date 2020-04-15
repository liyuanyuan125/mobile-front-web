import { mockGet, mockPost, mockPut, mockDel } from '../../../util'

/**
 * 2.3用户分析二级页
 * https://yapi.aiads-dev.com/project/404/interface/api/11018
 */
mockGet('/yuqing/music/album/user/analysis', () => {
  return {
    genderList: [
      { value: 1335, name: '男性' },
      { value: 310, name: '女性' }
    ],

    ageRangeList: [
      { name: '小于19岁', value: 880 },
      { name: '20-24', value: 1760 },
      { name: '25-29', value: 3280 },
      { name: '30-34', value: 2800 },
      { name: '35-39', value: 920 },
      { name: '大于40岁', value: 310 },
    ],

    userRegionList: [
      { name: '新疆', value: 0 },
      { name: '西藏', value: 2080 },
      { name: '青海', value: 3000 },
      { name: '甘肃', value: 4000 },
      { name: '内蒙古', value: 5000 },
      { name: '宁夏', value: 8088 },
      { name: '陕西', value: 6099 },
      { name: '黑龙江', value: 8000 },
      { name: '吉林', value: 3000 },
      { name: '辽宁', value: 5000 },
      { name: '河南', value: 9900 },
      { name: '北京', value: 8866 },
      { name: '天津', value: 6666 },
      { name: '江苏', value: 6666 },
      { name: '安徽', value: 8888 },
      { name: '湖北', value: 3888 },
      { name: '湖南', value: 5888 },
      { name: '河北', value: 3888 },
      { name: '山西', value: 4888 },
      { name: '四川', value: 2888 },
      { name: '广东', value: 5288 },
      { name: '山东', value: 8222 },
      { name: '广西', value: 8233 },
      { name: '重庆', value: 8255 },
      { name: '江西', value: 5288 },
      { name: '浙江', value: 5222 },
      { name: '福建', value: 8200 },
      { name: '台湾', value: 9200 },
      { name: '云南', value: 9200 },
      { name: '贵州', value: 6200 },
    ]
  }
})
