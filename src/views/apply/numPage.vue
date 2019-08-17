<template>
  <div class="num">
    <div class="tit">输入手机号码</div>
    <input class="text" type="number" v-model="phoneNum" placeholder="请输入您的手机号码">
    <button class="button" @click="getYzm">获取验证码</button>
    <div class="numTip"><p>已有账号?<a href="">立即登录</a></p></div>
  </div>
</template>

<script lang="ts">
  import { Component,Prop,Vue } from 'vue-property-decorator'

  @Component
  export default class NumPage extends Vue {
    @Prop({type: String,default: ''}) phoneNum!: string

    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    page:number = 1

    async getYzm() {
      this.changePage(this.page)
    }

  }
</script>

<style lang="less" scoped>
  @import '~@/views/apply/less/common.less';
  .numTip{
    width: 100%;
    text-align: right;
    p{
      font-size: 14px;
      color: @tip-color;
      a{
        color: @but-color;
      }
    }
  }
</style>
