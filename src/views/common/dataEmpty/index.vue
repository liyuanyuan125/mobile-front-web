<template>
  <!--数据为空 -->
  <div class="datanull" @click="handleClick">
    <img src="@/assets/sentiment/event-null.png" :alt="text"/>
    <p>{{finalText}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { MapType } from '@/util/types'

const codeMap: MapType = {
  58: '加载超时，点击重试',
  403: '无权限',
  404: '不存在',
  500: '加载失败，点击重试',
  10403: '无权限',
  10404: '不存在',
  10405: '已禁用',
  default: '加载失败，点击重试',
}

const nonRetryList = [ 0, 403, 404, 10403, 10404, 10405 ]

@Component({
  components: {}
})
export default class DataEmpty extends ViewBase {
  @Prop({ type: String, default: '暂无数据' }) text!: string

  @Prop({ type: Number }) code!: number

  @Prop({ type: Function }) retry!: () => any

  @Prop({ type: String, default: '重试中...' }) retryingText!: string

  get finalText() {
    if (this.retrying) {
      return this.retryingText
    }
    const code = this.code
    if (code > 0) {
      const text = codeMap[code] || codeMap.default
      return text
    }
    return this.text
  }

  retrying = false

  async handleClick() {
    if (this.retrying) {
      return
    }

    const retry = this.retry
    if (retry && !nonRetryList.includes(this.code)) {
      this.retrying = true
      try {
        await retry()
      } finally {
        this.retrying = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.datanull {
  text-align: center;
  padding: 80px 50px;
  img {
    width: 268px;
  }
  p {
    text-align: center;
    font-size: 30px;
    line-height: 50px;
    margin-top: 15px;
    color: #8f8f8f;
  }
}
</style>
