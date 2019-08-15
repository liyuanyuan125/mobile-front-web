<template>
  <div class="demo">
    <h1 class="title">{{title}}</h1>

    <Button type="primary">主要按钮</Button>

    <h1 class="title">引入全局图片示意（少用）</h1>
    <img alt="Vue logo" src="~@/assets/logo.png">

    <h1 class="title">引入局部图片示意（多用）</h1>
    <img alt="Vue logo" src="./assets/avatar.jpg">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Button } from 'vant'

@Component({
  components: {
    Button
  }
})
export default class Demo extends Vue {
  /**
   * 属性示例
   */
  @Prop({ type: String, default: '' }) title!: string
}
</script>

<style scoped lang="less">
.demo {
  padding: 18px;
}
.title {
  color: #42b983;
  font-size: 18px;
}
</style>
