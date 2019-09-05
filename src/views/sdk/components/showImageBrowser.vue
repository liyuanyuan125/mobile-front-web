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
      <p>点击图片位置(就是点击的是图片列表中的第几张,目前只有2张)</p>
      <span class="input">
        <input type="text" v-model="objectData.currentImageIndex" class="inputTxt" />
      </span>
    </dd>

    <dt>
      <button @click="showImages">现身吧</button>
    </dt>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { showImageBrowser } from '@/util/native'

@Component({})
export default class ShowImageBrowser extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data
  async showImages(e: any) {
    const obj = {
      params: this.dataBase.data
    }

    await showImageBrowser(obj)
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
