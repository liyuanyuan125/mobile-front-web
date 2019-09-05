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
    <dt>
      <button @click="getNetWork">获取状态</button>
    </dt>
    <dd>
      <pre>{{this.codeJson}}</pre>
    </dd>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { getNativeNetStatus } from '@/util/native'

@Component({})
export default class GetNativeNetStatus extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data
  codeJson = null

  async getNetWork() {
    const obj = { callBackName: this.dataBase.callBackName }
    const res: any = await getNativeNetStatus(obj)
    this.codeJson = JSON.parse(res)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
