<template>
  <div class="datatotal">
    <dl>
      <dd @click="goList('cinema')">
        <div class="box">
          <i class="icocinema"></i>
          <strong>{{cinemaCount}}</strong>
          <p>覆盖影院</p>
        </div>
      </dd>
      <dd @click="goList('movie')">
        <div class="box">
          <i class="icomovie"></i>
          <strong>{{movieCount}}</strong>
          <p>覆盖影片</p>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { openAppLinkClient } from '@/util/native'

@Component({
  components: {}
})
export default class DataTotal extends ViewBase {
  @Prop({ type: String, default: '0' }) cinemaCount!: string
  @Prop({ type: String, default: '0' }) movieCount!: string
  @Prop({ type: String }) orderId!: string

  // 去往列表页
  async goList(page: string) {
    let applink = ''
    switch (page) {
      case 'cinema':
        applink = 'reportRelateCinemaList'
        break
      case 'movie':
        applink = 'reportRelateMoiveList'
        break
    }
    const objectData = {
      applinkData:
        'jydataadvertiser://scheme?p=' + applink + '&orderId=' + this.orderId,
      originUrl: location.href
    }
    const obj = { params: objectData }
    await openAppLinkClient(obj)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
