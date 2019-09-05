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
      <label @change="setNav($event)">
        <input type="checkbox" v-model="objectData.isShowNavBar" checked="objectData.isShowNavBar" /> 是否显示导航栏
      </label>
    </dd>
    <dd>
      <label>
        <input
          type="checkbox"
          v-model="objectData.isWebViewOnScreenTop"
          checked="objectData.isWebViewOnScreenTop"
        /> webView是否从屏幕顶部开始布局
      </label>
    </dd>
    <dd>
      <span class="input">
        <input type="text" v-model="objectData.navBarMainTitle" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <label>
        <input
          type="checkbox"
          v-model="objectData.isShowRightShareBtn"
          checked="objectData.isShowRightShareBtn"
        /> 是否在原生导航栏的最右侧显示分享按钮
      </label>
    </dd>
    <dd v-if="objectData.isShowRightShareBtn">
      <span class="input">
        <input type="text" v-model="objectData.shareContent.title" class="inputTxt" />
      </span>
    </dd>
    <dd v-if="objectData.isShowRightShareBtn">
      <span class="input">
        <input type="text" v-model="objectData.shareContent.summary" class="inputTxt" />
      </span>
    </dd>
    <dd v-if="objectData.isShowRightShareBtn">
      <span class="input">
        <input type="text" v-model="objectData.shareContent.url" class="inputTxt" />
      </span>
    </dd>
    <dd v-if="objectData.isShowRightShareBtn">
      <span class="input">
        <input type="text" v-model="objectData.shareContent.pic" class="inputTxt" />
      </span>
    </dd>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { setNavBarStatus } from '@/util/native'

@Component({})
export default class SetNavBarStatus extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data

  /**
   * 返回上一页
   */
  async setNav(e: any) {
    const obj = {
      params: this.objectData
    }
    await setNavBarStatus(obj)
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
