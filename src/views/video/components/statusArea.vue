<template>
  <!-- 状态区 -->
  <div class="statusarea">
    <i class="reBack" title="返回" @click="goBack"></i>
    <b class="kefu" title="客服" @click="goKeFu"></b>
    <h4 class="status">
      <i v-if="statusInfo.adVideoStatus=='4'" class="succ"></i>
      <i v-if="statusInfo.adVideoStatus==5" class="fail"></i>
      {{statusInfo.adVideoStatusShow}}
    </h4>
    <p class="desc">{{statusInfo.adVideoStatusDesc}}</p>
    <div class="but" v-if="statusInfo.hasCanEdit">
      <button>编辑</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { openAppLinkClient, handleGoBack } from '@/util/native'

@Component({
  components: {}
})
export default class StatusArea extends ViewBase {
  @Prop({ type: Object }) statusInfo!: any

  statusTit = ''

  // 返回上一页
  async goBack() {
    const objectData = {
      isCloseWindow: true,
      refreshWindow: true
    }
    const obj = { params: objectData }
    await handleGoBack(obj)
  }

  // 去客服页
  async goKeFu() {
    const applink = 'hotLinePage'
    const objectData = {
      applinkData: 'jydataadvertiser://scheme?p=' + applink,
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
