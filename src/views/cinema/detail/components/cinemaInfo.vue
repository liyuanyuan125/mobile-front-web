<template>
  <div class="cinemainfo">
    <span class="location" title="定位" @click="goCinemaMap"></span>
    <h2>{{cinemaInfo.cinemaName}}</h2>
    <p class="address">{{cinemaInfo.cinemaAddress}}</p>
    <div class="discount">
      <strong class="price">
        <i>￥</i>
        <b>{{cinemaInfo.discountPrice}}650</b>
      </strong>
      <span class="through">￥{{cinemaInfo.viewPrice}}1,300</span>
      <span>/千次曝光</span>
      <em class="disdesc">{{cinemaInfo.discountDesc}}限时五折</em>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { openAppLinkClient } from '@/util/native'

@Component({
  components: {}
})
export default class CinemaInfo extends ViewBase {
  @Prop({ type: Object }) cinemaInfo!: any

  // 去影院地图
  async goCinemaMap() {
    const applink = 'cinemaMapPage'
    const objectData = {
      applinkData:
        'jydataadvertiser://scheme?p=' +
        applink +
        '&cinemaId=' +
        this.cinemaInfo.cinemaId,
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
