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
      <span class="input">
        <input type="text" class="inputTxt" v-model="mobile" />
      </span>
    </dd>
    <dt>
      <button @click="handleTelphone">拨打电话</button>
    </dt>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { handleDialTel } from '@/util/native'

@Component({})
export default class HandleDialTel extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  mobile: string = this.dataBase.data.phoneNumber
  objectData: any = this.dataBase.data

  async handleTelphone() {
    const obj = { params: this.objectData }
    this.dataBase.data.phoneNumber = this.mobile
    await handleDialTel(obj)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
