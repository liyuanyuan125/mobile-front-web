<template>
  <dl class="params">
    <dt>
      methodName：
      <br />
      <b style="color:#3c8eff">{{dataBase.sdkName}}</b>
    </dt>
    <dt v-if="dataBase.callBackName">
      callBackMethod：
      <br />
      <b style="color:#3c8eff">{{dataBase.callBackName}}</b>
    </dt>
    <dt>data：</dt>
    <dd>
      <p>跳转的URL，需Encode</p>
      <span class="input">
        <input type="text" class="inputTxt" v-model="url" placeholder="https://" />
      </span>
    </dd>
    <dt>
      <button @click="openLinkClient">跳转</button>
    </dt>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { openAppLinkClient } from '@/util/native'
import { validateURL } from '@/fn/validateRules'

@Component({})
export default class OpenAppLinkClient extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  url: string = 'https://m.piaoshen.com'
  objectData: any = {
    applinkData: '',
    originUrl: location.href // 埋点专用
    // linkType: '' 目前可不传，需定制
  }

  async openLinkClient() {
    if (validateURL(this.url)) {
      this.url.replace('http://', 'https://')
      this.objectData.applinkData =
        'jydatacinema://scheme?p=h5Page&url=' + encodeURIComponent(this.url)
      const obj = { params: this.objectData }
      await openAppLinkClient(obj)
    } else {
      alert('url格式错误')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
