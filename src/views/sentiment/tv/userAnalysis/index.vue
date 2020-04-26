<template>
  <div class="pages">
    <SentimentBar title="用户分析" :titleShow="true" />
    <UserPortrait :sexData="sexData" :ageData="ageData" class="user-portrait" v-if="!basicCode" />
    <DataEmpty :code="basicCode" :retry="userAnalysis" class="data-empty" v-if="basicCode > 0" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { userAnalysisData } from './data'
import { toast } from '@/util/toast'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import moduleHeaer from '@/components/moduleHeader'
import { transformPercentField } from '@/util/dealData'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    SentimentBar,
    moduleHeaer,
    UserPortrait,
    DataEmpty
  }
})
export default class MovieUserAnalysisPage extends ViewBase {
  // 性别
  sexData: any = null
  basicCode: number = 0
  // 年龄
  ageData: VerticalBarItem[] = []

  created() {
    const tvId: string = this.$route.params.tvId
    this.userAnalysis(tvId)
  }

  async userAnalysis(tvId: string) {
    try {
      const res: any = await userAnalysisData(tvId)
      this.basicCode = 0
      // 性别
      this.sexData = res.genderList || []
      this.ageData = transformPercentField(res.ageRangeList)
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
.user-portrait {
  padding-top: 0;
}
</style>
