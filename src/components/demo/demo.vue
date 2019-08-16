<template>
  <div class="demo">
    <h1 class="title">{{title}}</h1>

    <Button type="primary">主要按钮</Button>
    <Field />

    <h1 class="title">引入局部图片示意（多用）</h1>
    <div class="line">
      <img alt="My avatar" src="./assets/avatar.jpg" class="demo-img">
    </div>
    <div class="code-box">使用 <code>./some/path</code></div>

    <h1 class="title">引入全局图片示意（少用）</h1>
    <div class="line">
      <img alt="Vue logo" src="@/assets/logo.png" class="demo-img">
    </div>
    <div class="code-box">使用 <code>@/some/path</code></div>

    <h1 class="title">装饰性的元素，宜用 css</h1>
    <div class="line">本地引用（多用）<span class="avatar"></span></div>
    <div class="code-box">在 CSS 中使用 <code>./some/path</code></div>

    <div class="line">全局引用（少用）<span class="logo"></span></div>
    <div class="code-box">在 CSS 中使用 <code>~@/some/path</code></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Button,Field } from 'vant'

@Component({
  components: {
    Button,
    Field
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
  line-height: 38px;
}

.title {
  color: #42b983;
  font-size: 18px;
}

.line {
  line-height: 1;
}

.code-box {
  display: block;
  font-size: 18px;
  code {
    color: #e20;
  }
}

.demo-img {
  max-width: 88px;
}

.avatar {
  display: inline-block;
  width: 38px;
  height: 38px;
  background: url(./assets/avatar.jpg) no-repeat;
  background-size: contain;
}

.logo {
  display: inline-block;
  width: 38px;
  height: 38px;
  background: url(~@/assets/logo.png) no-repeat;
  background-size: contain;
}
</style>
