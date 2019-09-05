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
    <dd>
      <div class="imgbox" @click="uploadImg">
        <em v-if="!imgUrl">上传图片</em>
        <img :src="imgUrl" v-else />
      </div>
    </dd>
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import data from '../data'
import { handleUploadImage } from '@/util/native'
import { validateURL } from '@/fn/validateRules'

@Component({})
export default class HandleUploadImage extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data
  imgUrl = null

  /**
   * 调取原生上传图片
   */
  async uploadImg() {
    const obj = {
      params: this.dataBase.data,
      callBackName: this.dataBase.callBackName
    }
    const result: any = await handleUploadImage(obj)

    // 防止操作中途停止时报错
    if (result) {
      const resultJSON = JSON.parse(result)
      this.imgUrl = resultJSON.data.imageList[0].url
    }
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
