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
  // canvas的宽高
  annularWid: number = document.documentElement.clientWidth - 60
  // 性别
  sexdata: any = {
    data: [],
    title: '性别占比',
    emphasisShow: true
  }
  // 年龄
  agedata: VerticalBarItem[] = []

  created() {
    const tvId: string = this.$route.params.tvId
    this.userAnalysis(tvId)
  }

  async userAnalysis(tvId: string) {
    try {
      const res: any = await userAnalysisData(tvId)
      // 性别
      this.sexdata.data = res.genderList
      this.agedata = res.ageRangeList
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
    margin: 0 30px;
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
