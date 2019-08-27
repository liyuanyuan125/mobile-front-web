<template>
  <div class="num">
    <div class="tit">输入验证码</div>
    <div class="yzTip"><span>验证码已发送至</span><em> +86 {{phoneNum}}</em></div>
    <div class="password">
      <input class="text" type="number" v-model="value"
             oninput="value=value.replace(/[^\d]/g,'');if(value.length > 6)value = value.slice(0, 6)"
             onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))&&(/[^+-.*]/.test(event.key))"
             @keyup="butLight"
      >
      <i class="del" v-show="clear" @click="clearNum"></i>
    </div>
    <button :class="button?'button':'button disabled'" @click="verifyCodeBut">下一步</button>
    <div :class="again?'sendAgain':'sendTip'" @click="sendAgain">
      <p>重新发送 <span v-show="!again">（{{time}}S）</span></p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { validataCode } from '@/fn/validateRules'
  import ViewBase from '@/util/ViewBase'
  import { getRequestId } from '@/store'
  import { Toast } from 'vant'

  @Component
  export default class CheckPage extends ViewBase {
    @Prop({ type: String, default: '' }) phoneNum!: string
    @Prop({ type: Boolean }) pageOn!: boolean
    @Prop({ type: Boolean }) resetPwd!: boolean
    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    value: any = ''
    time: string = '3'
    page: number = 2
    clear: boolean = false
    again: boolean = false
    button: boolean = false
    requestID: any = ''

    @Watch('pageOn', {deep: true})   // 进入页面开始倒计时
    watchPageOn(val: boolean) {
      if (val) {
        this.timeFunc()
      }
    }

    @Watch('value', {deep: true})
    watchValue(val: any) {
      this.clear = !!val
    }

    clearNum() {
      this.value = ''
    }

    butLight() {
      this.button = !validataCode(this.value)
    }

    timeFunc() {
      const init: any = '3'
      let t: any = init
      const timer: any = setInterval(() => {
        if (t == 1) {
          this.again = true  // 重新发送显示
          this.time = init   // 显示时间重置
          clearInterval(timer)
        } else {
          t = t - 1
          this.time = t
        }
      }, 1000)
    }

    async verifyCodeBut() {    // 校验验证码
      if (!this.button) {
        return
      } else {
        try {
          // const { data: {requestID}, code, msg} = await verifyCode({phoneNum: this.phoneNum,vcode: this.value})
          // this.requestID = requestID   // this.$store.state.requestID取用
          // getRequestId(this.requestID) // 更新store的值

          // 重置密码页面 code == 0：该手机号未注册；页面不做跳转；
          // code != 0，则跳转至重置密码页面；
          // if (this.resetPwd) {
          //   if(code == 0) {
//             this.$toast('该手机号未注册')
//           } else {
//             this.changePage(this.page)
//           }
//         }else{

//      申请页面     code == 0，未注册，继续走下面流程；
//           code == 1，注册失败（原因未知那种）；
//           code == 100003，未注册，但已经申请过，跳转至提交页面；
//           code == 100001，操作中止，因为已注册过，并 已开通影院，跳转至提示页面
//           code == 100002，操作中止，因为已注册过，并 已开通广告商，显示指定提示语
//           if(code == 0) {
            this.changePage(this.page)
//           } else if (code == 1) {
//             this.$toast(msg)
//           } else if (code == 100001) {
//             await this.$router.push({name: 'submit', query: {'show': '2'}})
//           } else if (code == 100002) {
//             alert('您已开通广告商平台，请登录')
//           } else if (code == 100003) {
//             await this.$router.push({name: 'submit', query: {'show': '1'}})
//           }
//         }
        } catch (ex) {
          this.handleError(ex)
        }
      }
    }

    async sendAgain() {  // 重新发送验证码
      if (!this.again) {
        return
      } else {
        try {
          this.again = false
          // const {code, msg} = await getCode({phoneNum: this.phoneNum})

          // 0 ===获取验证码成功
          // 1 ===获取验证码失败
          // if (code == 0) {
            this.timeFunc()
          // } else if (code == 1) {
          //   this.$toast(msg)
          // }
        } catch (ex) {
          this.handleError(ex)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import 'less/common.less';
  .yzTip{
    position: absolute;
    left: 92px;
    top: 172px;
    font-size: 28px;
    color: @tip-color;
    em{
      display: inline-block;
      margin-left: 10px;
      color: @black;
    }
  }
  .sendTip{
    font-size: 28px;
    color: @tip-color;
  }
  .sendAgain{
    font-size: 28px;
    color: @but-color;
  }
  .text{
    font-size: 50px;
    letter-spacing: 20px;
  }
</style>
