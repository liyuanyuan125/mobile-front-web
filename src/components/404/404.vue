<template>
  <div>
    <SentimentBar :title="title" titleShow />
    <div class="page403" v-if="code === 10403">
      <span></span>
      <p @click="handleTelphone">
        你还未开通该模块的服务
        <br />请联系客服开通
        <i>400-605-0606</i>
      </p>
    </div>
    <div class="page404" v-if="code !== 10403 && code !== 10405">
      <span></span>
      <p>报歉，你查找的信息不存在</p>
    </div>
    <div class="page405" v-if="code === 10405">
      <span></span>
      <p>
        该信息已经后台关闭
        <br />暂时无法查看
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { handleGoBack } from '@/util/native'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { handleDialTel } from '@/util/native'
import { isJyApp } from '@/fn/ua'

@Component({
  components: {
    SentimentBar
  }
})
export default class TopBar extends Vue {
  /**
   * 属性示例
   * -10000 未登录
   * 10404  页面不存在
   * 10405  页面被禁用
   * 10403  无权限
   */
  @Prop({ type: Number, default: 10403 }) code!: number

  title: string = '' // 页面 title
  pageCode: number = 0 // 页面码

  created() {
    switch (this.code) {
      case 10403:
        this.title = '未开通服务'
        break
      case 10405:
        this.title = '信息已被关闭'
        break
      default:
        this.title = '信息不存在'
    }
  }

  // 播打电话
  async handleTelphone() {
    if (isJyApp()) {
      const obj = { params: { data: { phoneNumber: '4006050606' } } }
      await handleDialTel(obj)
    }
  }
}
</script>

<style scoped lang="less">
.page403,
.page404,
.page405 {
  padding-top: 400px;
  text-align: center;
  span {
    display: inline-block;
    width: 100%;
    background: no-repeat center center;
    background-size: contain;
    height: 350px;
  }
  p {
    font-size: 32px;
    line-height: 1.5;
    color: #8f8f8f;
    margin-top: 30px;
    i {
      color: #88aaf6;
      text-decoration: underline;
    }
  }
}
.page403 span {
  background-image: url('../../assets/sentiment/event-deny.png');
}
.page404 span {
  background-image: url('../../assets/sentiment/event-null.png');
}
.page405 span {
  background-image: url('../../assets/sentiment/event-close.png');
}
</style>
