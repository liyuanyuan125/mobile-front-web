<template>
  <div>
     <UserPortrait
      :sexData="sexData"
      :ageData="ageData"
      class="pane"
    />
    <SexVs :data="vsData" class="pane"/>
    <UserArea :data="data" class="pane"/>
    <pointChart :width='375' :height='300' :data='data3' />
    <ModuleHeader 
       title="高消费偏好地区"
       tag="h4" 
       moreText="查看更多"
       :link="{ page: 'xxx' }"
       class="sex-rate"/>
    <ModuleHeader 
       title="分城市购买力"
       tag="h4" 
       class="sex-rate"/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import SexVs, { VsItem } from '@/views/common/sexVs'
import pointChart from '@/components/cakeChart/pointChart.vue'
import ModuleHeader from '@/components/moduleHeader'

@Component({
  components: {
    UserArea,
    UserPortrait,
    SexVs,
    pointChart,
    ModuleHeader
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

  vsData: VsItem[] = [
    { name: '奔驰', rate1: 63.6, rate2: 44.4 },
    { name: '兰博基尼', rate1: 39.6, rate2: 60.4 },
    { name: '林肯', rate1: 20.2, rate2: 79.8 },
    { name: '雪佛兰', rate1: 2.2, rate2: 97.8 },
    { name: '玛莎拉蒂名字很长', rate1: 98.8, rate2: 1.2 },
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

}

</script>

<style lang='less' scoped>

</style>
