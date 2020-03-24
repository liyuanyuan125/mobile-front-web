<template>
  <div>
    <SentimentBar title="用户分析" :titleShow="true" />
     <UserPortrait
      :sexData="sexData"
      :ageData="ageData"
      class="pane"
    />
    <section class="item-sales">
      <div class="van-hairline--top hairline" />
      <ModuleHeader title="促销敏感度" class="sales-header" />
    </section>
    <pointChart :width='375' :height='300' :data='data3' />
    <section class="item-sales">
      <div class="van-hairline--top top-hairline" />
      <ModuleHeader title="评论敏感度" class="sales-header" />
    </section>
    <pointChart :width='375' :height='300' :data='data3' />
    <UserArea :data="data" class="item-areas"/>
    <section class="item-city">
      <ModuleHeader 
        title="高消费偏好地区"
        moreText="查看更多"
        :link="{ page: 'xxx' }"
        class="sex-rate"/>
       <User :consumRegion="consumRegion" v-if="consumRegion.cityList" />
    </section>
    <section class="items-consum">
      <ModuleHeader  title="分城市购买力" class="sex-rate"/>
      <cityConsum :cityConsum="cityConsumList" v-if="cityConsumList.length" />
    </section>
    
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { useranalysis } from '@/api/brand'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import pointChart from '@/components/cakeChart/pointChart.vue'
import ModuleHeader from '@/components/moduleHeader'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import User from './components/user.vue'
import cityConsum from './components/city.vue'
import { toast } from '@/util/toast'

@Component({
  components: {
    UserArea,
    UserPortrait,
    pointChart,
    ModuleHeader,
    SentimentBar,
    User,
    cityConsum
  }
})
export default class Main extends Vue {
  data: ChinaMapItem[] = [
    { name: '新疆', value: 0 },
    { name: '西藏', value: 20.8 },
    { name: '青海', value: 30 },
    { name: '甘肃', value: 40 },
    { name: '内蒙古', value: 50 },
    { name: '宁夏', value: 80.88 },
    { name: '陕西', value: 60.99 },
    { name: '黑龙江', value: 80 },
    { name: '吉林', value: 30 },
    { name: '辽宁', value: 50 },
    { name: '河南', value: 99 },
    { name: '北京', value: 88.66 },
    { name: '天津', value: 66.66 },
    { name: '江苏', value: 66.66 },
    { name: '安徽', value: 88.88 },
    { name: '湖北', value: 38.88 },
    { name: '湖南', value: 58.88 },
    { name: '河北', value: 38.88 },
    { name: '山西', value: 48.88 },
    { name: '四川', value: 28.88 },
    { name: '广东', value: 52.88 },
    { name: '山东', value: 82.22 },
    { name: '广西', value: 82.33 },
    { name: '重庆', value: 82.55 },
    { name: '江西', value: 52.88 },
    { name: '浙江', value: 52.22 },
    { name: '福建', value: 82 },
    { name: '台湾', value: 92 },
    { name: '云南', value: 92 },
    { name: '贵州', value: 62 },
  ]

  sexData: NameValue[] = [
    { name: '男性', value: 1335 },
    { name: '女性', value: 310 },
  ]

  ageData: VerticalBarItem[] = [
    { name: '小于19岁', value: 8.8 },
    { name: '20-24', value: 17.6 },
    { name: '25-29', value: 32.8 },
    { name: '30-34', value: 28.0 },
    { name: '35-39', value: 9.2 },
    { name: '大于40岁', value: 3.1 },
  ]

  data3: any = {
    data: [
      {value: 335, name: '极度敏感'},
      {value: 310, name: '高度敏感'},
      {value: 234, name: '中度敏感'},
      {value: 135, name: '轻度敏感'},
      {value: 1548, name: '不敏感'}],
    color: '', // 修改颜色
    title: '促销敏感度',
    sesnsitivity: '敏感度高'// 显示的敏感度  这个需要自己计算了
  }

  cityList = [
    { name: '北京1', value: 10},
    { name: '北京2', value: 20},
    { name: '北京3', value: 50},
    { name: '北京4', value: 80},
    { name: '北京5', value: 15},
    { name: '北京6', value: 30},
    { name: '北京7', value: 10},
  ]

  genderList = []
  ageRangeList = []
  promotionList = []
  commentList = []
  userRegionList = []
  consumRegion = {}
  cityConsumList = []

  mounted() {
    this.list()
  }

  async list() {
    try {
      const { data: {
        genderList,
        ageRangeList,
        promotionList,
        commentList,
        userRegionList,
        consumRegion,
        cityConsumList,
      }} = await useranalysis({brandId: 1})
      this.genderList = genderList || [] // 性别占比
      this.ageRangeList = ageRangeList || [] // 年龄占比
      this.promotionList = promotionList || [] // 促销敏感度
      this.commentList = commentList || [] // 评论敏感度
      this.userRegionList = userRegionList || [] // 用户地域分布
      this.consumRegion = consumRegion || {} //  消费区域分布
      this.cityConsumList = cityConsumList || [] // 分城市购买力
    } catch (ex) {
      toast(ex)
    }
  }
}

</script>

<style lang='less' scoped>
.item-city {
  padding: 60px 30px 60px;
  border-bottom: solid 20px #f2f3f6;
}
.pane {
  padding-top: 160px;
}
.top-hairline {
  margin-top: -60px;
}
.item-sales {
  padding: 0 30px;
  .sales-header {
    padding-top: 60px;
    margin-bottom: -60px;
  }
}
.items-consum {
  padding: 60px 30px;
}
.item-areas {
  border-top: solid 20px #f2f3f6;
  margin-top: -60px;
  border-bottom: solid 20px #f2f3f6;
}
</style>
