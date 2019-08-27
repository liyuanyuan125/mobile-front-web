<template>
  <div class="num">
    <div class="tit">输入手机号码</div>
    <div class="password">
      <input class="text" type="number" v-model="inValue" placeholder="请输入您的手机号码"
             oninput="if(value.length > 11)value = value.slice(0, 11)"
             onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))&&(/[^+-.*]/.test(event.key))"
             @keyup="butLight"
      >
      <i class="del" v-show="clear" @click="clearNum"></i>
    </div>
    <button :class="button?'button':'button disabled'" @click="getYzm">获取验证码</button>
    <div class="numTip" v-show="loginShow"><p>已有账号?<a href="">立即登录</a></p></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { validataTel } from '@/fn/validateRules'
  import ViewBase from '@/util/ViewBase'
  import { getCode } from '@/api/theater'
  import { Toast } from 'vant'

  @Component
  export default class NumPage extends ViewBase {
    @Prop({type: String, default: ''}) phoneNum!: string
    @Prop({type: Boolean, default: ''}) loginShow!: boolean

    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    inValue: string = this.phoneNum
    page: number = 1
    clear: boolean = false
    button: boolean = false

    @Watch('inValue', {deep: true})
    watchPhoneNum(val: any) {
      this.clear = !!val
      this.$emit('logNum', val)
    }

    clearNum() {
      this.inValue = ''
    }

    butLight() {
      this.button = !validataTel(this.inValue)
    }

    async getYzm() {
      if (!this.button) {
        return
      } else {
        try {
          const {code, msg} = await getCode({phoneNum: this.inValue})
          console.log(code,msg)
          // 0 ===获取验证码成功
          // 1 ===获取验证码失败
          if (code == 0) {
            this.changePage(this.page)
          } else {
            this.$toast(msg)
          }
        } catch (ex) {
          this.handleError(ex)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import 'less/common.less';
  .numTip{
    width: 100%;
    text-align: right;
    p{
      font-size: 28px;
      color: @tip-color;
      a{
        color: @but-color;
      }
    }
  }
</style>
