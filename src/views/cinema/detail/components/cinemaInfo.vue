<template>
  <div>
    <div class="cinemainfo">
      <span class="location" title="定位" @click="goCinemaMap"></span>
      <h2>{{cinemaInfo.cinemaName}}</h2>
      <p class="address">{{cinemaInfo.cinemaAddress}}</p>
    </div>
    <div class="discount">
      <div v-if="cinemaInfo.discountPrice">
        <strong class="price">
          <i>￥</i>
          <b>{{cinemaInfo.discountPrice}}</b>
        </strong>
        <span class="through">￥{{cinemaInfo.viewPrice}}</span>
        <span>/千次曝光（15s）</span>
        <p>
          <em class="disdesc" v-if="cinemaInfo.discountDesc">{{cinemaInfo.discountDesc}}</em>
        </p>
      </div>
      <strong class="price" v-if="!cinemaInfo.discountPrice">
        <i>￥</i>
        <b>{{cinemaInfo.viewPrice}}</b>
        <i>/千次曝光（15s）</i>
      </strong>
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
