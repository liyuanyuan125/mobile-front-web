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
      <p>视频URL</p>
      <span class="input">
        <input type="text" v-model="objectData.videoUrl" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <p>视频封面</p>
      <span class="input">
        <input type="text" v-model="objectData.posterUrl" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <p>视频顶部位置</p>
      <span class="input">
        <input type="text" v-model="objectData.videoTop" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <p>视频左侧位置</p>
      <span class="input">
        <input type="text" v-model="objectData.videoLeft" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <p>视频宽度</p>
      <span class="input">
        <input type="text" v-model="objectData.videoWidth" class="inputTxt" />
      </span>
    </dd>
    <dd>
      <p>视频高度</p>
      <span class="input">
        <input type="text" v-model="objectData.videoHeight" class="inputTxt" />
      </span>
    </dd>
    <dt>
      <button @click="showVideo">现身吧</button>
    </dt>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { showVideoPlayer } from '@/util/native'

@Component({})
export default class ShowVideoPlayer extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data

  /**
   * 返回上一页
   */
  async showVideo(e: any) {
    const obj = {
      params: this.objectData
    }
    // console.log('this.dataBase.data', obj)
    await showVideoPlayer(obj)
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
