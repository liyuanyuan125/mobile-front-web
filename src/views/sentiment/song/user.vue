<template>
  <main class="main-page">
    <SentimentBar title="用户分析" titleShow/>

    <TabNav class="tab-nav"/>

    <UserPortrait
      :sexData="userAnalysis.sexData"
      :ageData="userAnalysis.ageData"
      class="user-portrait"
      v-if="userAnalysis"
    />

    <UserArea
      :data="userRegionList"
      :moreLink="`/sentiment/common/userRegion?src=5&id=${id}&type=1`"
      class="user-area"
      v-if="userRegionList"
    />
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import TabNav from '@/components/tabNav'
import ModuleHeader from '@/components/moduleHeader'
import { getUserAnalysis } from './data'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'

@Component({
  components: {
    SentimentBar,
    TabNav,
    ModuleHeader,
    UserPortrait,
    UserArea,
  }
})
export default class extends ViewBase {
  @Prop({ type: Number }) id!: number

  userAnalysis: any = null

  userRegionList: any = null

  created() {
    this.init()
  }

  async init() {
    this.getBasic()
  }

  async getBasic() {
    try {
      const {
        userAnalysis = {},
        userRegionList = [],
      } = await getUserAnalysis(this.id)
      this.userAnalysis = userAnalysis
      this.userRegionList = userRegionList
    } catch (ex) {
      this.handleError(ex)
    }
  }
}
</script>

<style lang="less" scoped>
.main-page {
  padding: 1px 0 8px;
  background-color: #f2f3f6;
}

.user-portrait {
  padding-top: 30px;
}

.user-area {
  margin-top: 20px;
}
</style>
