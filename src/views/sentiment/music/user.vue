<template>
  <main class="main-page">
    <SentimentBar title="用户分析" titleShow />

    <UserPortrait
      :sexData="sexData"
      :ageData="ageData"
      class="user-portrait"
      v-if="basicCode == 0"
    />

    <UserArea
      :data="areaData"
      :moreLink="`/sentiment/common/userRegion?src=${isAlbum ? 6 : 5}&id=${id}&type=1`"
      class="user-area"
      v-if="basicCode == 0"
    />

    <DataEmpty
      :code="basicCode"
      :retry="getBasic"
      class="data-empty"
      v-if="basicCode > 0"
    />
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'
import { getBasic } from './userData'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    SentimentBar,
    UserPortrait,
    UserArea,
    DataEmpty,
  }
})
export default class extends ViewBase {
  @Prop({ type: Number }) id!: number

  @Prop({ type: Boolean, default: false }) isAlbum!: boolean

  basicCode = 0

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
      this.basicCode = 0
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
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
  padding-top: 158px;
}

.user-area {
  margin-top: 20px;
}

.data-empty {
  background-color: #fff;
  padding-top: 50%;
}
</style>
