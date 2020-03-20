<template>
  <div class="pages">
    <SentimentBar :title="title" :titleShow="true" />
    <div class="agelist">
      <div class="title">用户画像</div>
      <div class="sex">
        <sexChart :width="305" :data="sexdata"></sexChart>
      </div>
      <div class="age">
        <div class="item-title">年龄占比</div>
        <VerticalBar :data="agedata" class="chart" />
      </div>
    </div>
    <div class="education">
      <annularChart :data="educationList" :width="annularWid"></annularChart>
    </div>
    <div class="work">
      <annularChart :data="workList" :width="annularWid"></annularChart>
    </div>
    <ProgressList :progressData="userRegionList" title="活跃地区" />
    <ProgressList :progressData="userRegionList" title="消费偏好" />
    <ProgressList :progressData="userRegionList" title="观影偏好" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import { toast } from '@/util/toast'
import sexChart from '@/components/cakeChart/sexChart.vue'
import annularChart from '@/components/cakeChart/annularChart.vue'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import ProgressList from './components/progress.vue'

@Component({
  components: {
    SentimentBar,
    sexChart,
    annularChart,
    VerticalBar,
    ProgressList
  }
})
export default class MovieUserAnalysisPage extends ViewBase {
  sexdata: any = {
    data: [
      { value: 1335, name: '男性' },
      { value: 310, name: '女性' }
    ],
    title: '性别占比',
    emphasisShow: true
  }
  annularWid: number = document.documentElement.clientWidth
  educationList: any = {
    data: [
      { value: 335, name: '微博' },
      { value: 310, name: '抖音' },
      { value: 234, name: '网易云音乐' },
      { value: 135, name: 'QQ音乐' },
      { value: 1548, name: '腾讯视频' }
    ],
    color: '', // 修改颜色
    title: '教育信息',
    sesnsitivity: '敏感度高'
  }
  workList: any = {
    data: [
      { value: 335, name: '微博' },
      { value: 310, name: '抖音' },
      { value: 234, name: '网易云音乐' },
      { value: 135, name: 'QQ音乐' },
      { value: 1548, name: '腾讯视频' }
    ],
    color: '', // 修改颜色
    title: '职业信息',
    sesnsitivity: '敏感度高'
  }

  agedata: VerticalBarItem[] = [
    { name: '小于19岁', value: 8.8 },
    { name: '20-24', value: 17.6 },
    { name: '25-29', value: 32.8 },
    { name: '30-34', value: 28.0 },
    { name: '35-39', value: 9.2 },
    { name: '大于40岁', value: 3.1 }
  ]
  userRegionList = [
    {
      name: '广西壮族自治区',
      value: 52
    },
    {
      name: '山东省',
      value: 30
    },
    {
      name: '山东省',
      value: 12
    }
  ]

  colorRangeList = [['#f1f5ff', '#d7e2ff', '#a3bdfd', '#598cfe', '#4763c6']]

  theme = 0

  title = '电影名称'

  detail: any = null

  topFive: any = [
    {
      name: '广东省',
      id: 1
    },
    {
      name: '江苏省',
      id: 2
    },
    {
      name: '山东省',
      id: 3
    },
    {
      name: '四川省',
      id: 4
    },
    {
      name: '河南省',
      id: 5
    }
  ]

  created() {
    const mid = this.$route.params.kolId
    this.getDetail()
  }

  async getDetail() {
    try {
      this.detail = {}
    } catch (ex) {
      toast(ex)
    }
  }
}
</script>

<style lang="less" scoped>
.pages {
  width: 100%;
  padding-top: 148px;
}
.agelist {
  // padding: 0 30px;
  // height: 450px;
  .title {
    height: 40px;
    padding: 0 30px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 40px;
  }
  .age {
    border-top: solid 1px #d8d8d8;
    margin: 0 30px;
    padding-bottom: 50px;
    .item-title {
      margin-top: 60px;
      margin-bottom: 50px;
      font-size: 34px;
      font-weight: 500;
      color: rgba(48, 48, 48, 1);
      line-height: 34px;
    }
  }
}
.education {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
}
.work {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
}
</style>
