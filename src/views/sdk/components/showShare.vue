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
        <input type="text" v-model="objectData.title" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <span class="input">
        <input type="text" v-model="objectData.summary" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <span class="input">
        <input type="text" v-model="objectData.url" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <span class="input">
        <input type="text" v-model="objectData.pic" class="inputTxt" />
      </span>
    </dd>
    <dt>
      <button @click="showShareTip">显示分享弹框</button>
    </dt>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { showShare } from '@/util/native'

@Component({})
export default class ShowShare extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data

  /**
   * 返回上一页
   */
  async showShareTip(e: any) {
    const obj = {
      params: this.objectData,
      callBackName: this.dataBase.callBackName
    }
    await showShare(obj)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
.imgbox {
  background-color: rgba(241, 245, 251, 0.3);
  border: 1px solid rgba(175, 190, 212, 0.3);
  display: block;
  color: #afbed4;
  font-size: 30px;
  text-align: center;
  height: 300px;
  line-height: 300px;
  img {
    vertical-align: top;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
