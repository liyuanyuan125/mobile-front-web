<template>
  <div class="pages">
    <SentimentBar title="用户分析" :titleShow="true" />
    <div class="agelist">
      <moduleHeaer title="用户画像" />
      <div class="item-title">性别占比</div>
      <div class="sex">
        <sexChart :width="annularWid" :data="sexdata" v-if="sexdata.data.length"></sexChart>
      </div>
      <div class="age">
        <div class="item-title">年龄占比</div>
        <VerticalBar :data="agedata" v-if="agedata.length" class="chart" />
      </div>
    </div>
    <div class="education" v-if="educationList.data.length">
      <moduleHeaer title="教育程度" />
      <annularChart :data="educationList" :width="annularWid"></annularChart>
    </div>
    <div class="work" v-if="workList.data.length">
      <moduleHeaer title="职业信息" />
      <annularChart :data="workList" :width="annularWid"></annularChart>
    </div>
    <ProgressList :progressData="userRegionList" title="活跃地区" />
    <!-- <ProgressList :progressData="consumePrefer" title="消费偏好" /> -->
    <ProgressList :progressData="moviePrefer" title="观影偏好" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { userAnalysisData } from './data'
import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import { toast } from '@/util/toast'
import sexChart from '@/components/cakeChart/sexChart.vue'
import annularChart from '@/components/cakeChart/annularChart.vue'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import ProgressList from './components/progress.vue'
import moduleHeaer from '@/components/moduleHeader'

@Component({
  components: {
    SentimentBar,
    sexChart,
    annularChart,
    VerticalBar,
    ProgressList,
    moduleHeaer
  }
})
export default class MovieUserAnalysisPage extends ViewBase {
  annularWid: number = document.documentElement.clientWidth - 60
  // 性别
  sexdata: any = {
    data: [],
    title: '性别占比',
    emphasisShow: true
  }
  // 年龄
  agedata: VerticalBarItem[] = []
  // 教育
  educationList: any = {
    data: [],
    color: '' // 修改颜色
  }
  // 职业信息
  workList: any = {
    data: [],
    color: '' // 修改颜色
  }
  // 活跃地区
  userRegionList: any = []
  // 消费偏好
  consumePrefer: any = []
  // 观影偏好
  moviePrefer: any = []

  created() {
    const movieId: string = this.$route.params.movieId
    this.userAnalysis(movieId)
  }

  async userAnalysis(movieId: string) {
    try {
      const res: any = await userAnalysisData(movieId)
      // 性别
      this.sexdata.data = res.genderList
      this.agedata = res.ageRangeList
      this.educationList.data = res.educationList
      this.workList.data = res.workList
      this.userRegionList = res.userRegionList
      this.consumePrefer = res.consumePrefer
      this.moviePrefer = res.moviePrefer
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
  padding: 0 30px;
  .item-title {
    margin-top: 45px;
    margin-bottom: 50px;
    font-size: 34px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 34px;
  }
  .age {
    border-top: solid 1px #d8d8d8;
    // margin: 0 30px;
    padding-bottom: 50px;
  }
}
.education {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 30px;
}
.work {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 30px;
}
</style>
