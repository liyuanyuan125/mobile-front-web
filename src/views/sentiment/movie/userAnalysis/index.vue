<template>
  <div class="pages">
    <SentimentBar title="用户分析" :titleShow="true" />
    <div v-if="!basicCode">
      <UserPortrait :sexData="sexData" :ageData="ageData" class="user-portrait" />
      <div class="education" v-if="educationList.data.length">
        <moduleHeaer title="教育程度" />
        <annularChart :data="educationList" :width="annularWid"></annularChart>
      </div>
      <div class="work" v-if="workList.data.length">
        <moduleHeaer title="职业信息" />
        <annularChart :data="workList" :width="annularWid"></annularChart>
      </div>
      <ProgressList :progressData="userRegionList" title="活跃地区" />
      <ProgressList :progressData="moviePrefer" title="观影偏好" />
    </div>
    <DataEmpty :code="basicCode" :retry="userAnalysis" class="empty" v-if="basicCode > 0" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { userAnalysisData } from './data'
import annularChart from '@/components/cakeChart/annularChart.vue'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import ProgressList from './components/progress.vue'
import moduleHeaer from '@/components/moduleHeader'
import { transformPercentField } from '@/util/dealData'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    SentimentBar,
    annularChart,
    UserPortrait,
    ProgressList,
    moduleHeaer,
    DataEmpty
  }
})
export default class MovieUserAnalysisPage extends ViewBase {
  annularWid: number = document.documentElement.clientWidth - 60
  basicCode: number = 0
  // 性别
  sexData: any = []
  // 年龄
  ageData: VerticalBarItem[] = []
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
      this.basicCode = 0
      // 性别
      this.sexData = res.genderList || []
      this.ageData = transformPercentField(res.ageRangeList)
      this.educationList.data = res.educationList
      this.workList.data = res.workList
      this.userRegionList = res.userRegionList
      this.consumePrefer = res.consumePrefer
      this.moviePrefer = res.moviePrefer
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
    }
  }
}
</script>

<style lang="less" scoped>
.pages {
  width: 100%;
  padding-top: 148px;
}
.empty {
  margin-top: 150px;
}
.user-portrait {
  padding-top: 0;
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
