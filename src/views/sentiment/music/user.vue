<template>
  <main class="main-page">
    <SentimentBar title="用户分析" titleShow/>

    <TabNav class="tab-nav"/>

    <UserPortrait
      :sexData="sexData"
      :ageData="ageData"
      class="user-portrait"
    />

    <UserArea
      :data="areaData"
      :moreLink="`/sentiment/common/userRegion?src=${isAlbum ? 6 : 5}&id=${id}&type=1`"
      class="user-area"
    />
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import TabNav from '@/components/tabNav'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'
import { getBasic } from './userData'

@Component({
  components: {
    SentimentBar,
    TabNav,
    UserPortrait,
    UserArea,
  }
})
export default class extends ViewBase {
  @Prop({ type: Number }) id!: number

  @Prop({ type: Boolean, default: false }) isAlbum!: boolean

  sexData: any[] | null = null

  ageData: any[] | null = null

  areaData: any[] | null = null

  created() {
    this.init()
  }

  reset() {
    this.sexData = null
    this.ageData = null
    this.areaData = null
  }

  init() {
    this.reset()
    this.getBasic()
  }

  async getBasic() {
    try {
      const { sexData, ageData, areaData } = await getBasic(this.id, this.isAlbum)
      this.sexData = sexData
      this.ageData = ageData
      this.areaData = areaData
    } catch (ex) {
      this.logError(ex)
      this.sexData = []
      this.ageData = []
      this.areaData = []
    }
  }
}
</script>

<style lang="less" scoped>
.main-page {
  padding: 1px 0 0;
  background-color: #f2f3f6;
}

.user-portrait {
  padding-top: 30px;
}

.user-area {
  margin-top: 20px;
}
</style>
