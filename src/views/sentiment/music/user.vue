<template>
  <main class="main-page">
    <SentimentBar title="用户分析" titleShow/>

    <TabNav class="tab-nav"/>

    <UserPortrait
      :sexData="portrait.sexData"
      :ageData="portrait.ageData"
      class="user-portrait"
      v-if="portrait"
    />

    <UserArea
      :data="area"
      :moreLink="`/sentiment/common/userRegion?src=${isAlbum ? 6 : 5}&id=${id}&type=1`"
      class="user-area"
      v-if="area"
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

  portrait: any = null

  area: any = null

  created() {
    this.init()
  }

  init() {
    this.getBasic()
  }

  async getBasic() {
    try {
      const { portrait, area } = await getBasic(this.id, this.isAlbum)
      this.portrait = portrait
      this.area = area
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
