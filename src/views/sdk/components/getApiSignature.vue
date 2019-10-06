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
      <p>API完整路径，不包含参数</p>
      <span class="input">
        <input type="text" class="inputTxt" v-model="objectData.apiUrl" placeholder="https://" />
      </span>
    </dd>
    <dd>
      <p>请求方式：</p>
      <div class="select">
        <select v-model="objectData.httpMethod">
          <option value="get">get</option>
          <option value="post">post</option>
        </select>
      </div>
    </dd>
    <dd>
      <p>API参数：例-> 'a=b&c=d'</p>
      <span class="input">
        <input type="input" v-model="objectData.params" placeholder="参数" class="inputTxt" />
      </span>
    </dd>
    <dt>
      <button @click="getSignature">跳转</button>
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
import { getApiSignature } from '@/util/native'
import { validateURL } from '@/fn/validateRules'

@Component({})
export default class GetApiSignature extends ViewBase {
  @Prop({ type: Object }) dataBase!: any

  objectData: any = this.dataBase.data
  codeJson = null
  // 执行方法
  async getSignature() {
    try {
      if (validateURL(this.objectData.apiUrl)) {
        this.objectData.apiUrl.replace('http://', 'https://')
        const obj = {
          params: this.objectData,
          callBackName: this.dataBase.callBackName
        }
        const res: any = await getApiSignature(obj)
        this.codeJson = JSON.parse(res)
      } else {
        alert('url格式错误')
      }
    } catch (err) {
      alert(err)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
