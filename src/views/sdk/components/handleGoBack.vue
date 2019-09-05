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
      <label>
        <input
          type="checkbox"
          v-model="objectData.isCloseWindow"
          checked="objectData.isCloseWindow"
        /> 关闭当前页面
      </label>
      <p>当true时直接返回上个原生界面，如果是false时先执行webView的goBack操作，当goBack没有上一级时就执行返回上个界面</p>
    </dd>
    <dd>
      <label>
        <input
          type="checkbox"
          v-model="objectData.refreshWindow"
          checked="objectData.refreshWindow"
        /> 返回上个原生界面时，并刷新上个原生页面
      </label>
    </dd>
    <dt>
      <button @click="goBackApp">返回</button>
    </dt>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { handleGoBack } from '@/util/native'

@Component({})
export default class HandleGoBack extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data
  imgUrl = null

  /**
   * 返回上一页
   */
  async goBackApp() {
    const obj = {
      params: this.objectData
    }
    await handleGoBack(obj)
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
