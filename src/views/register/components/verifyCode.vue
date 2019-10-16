<template>
  <div class="wrap">
    <div class="tit">输入验证码</div>
    <div class="verifytip">
      <span>验证码已发送至</span>
      <em>+86 {{phoneNum}}</em>
    </div>
    <div class="inputctrl verifycode">
      <input
        class="text"
        ref="verifyVal"
        type="number"
        v-model="value"
        pattern="[0-9]*"
        v-on:input="butLight"
        oninput="if(value.length > 6)value = value.slice(0, 6)"
        onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))&&(/[^+-.*]/.test(event.key))"
        @keyup="butLight"
      />
      <i class="del" v-show="clear" @click="clearNum"></i>
    </div>
    <div class="subbuttonbox">
      <button :class="button?'button':'button disabled'" @click="verifyCodeBut">下一步</button>
    </div>
    <div :class="again?'sendAgain':'sendTip'" @click="sendAgain">
      <p>
        重新发送
        <span v-show="!again">（{{time}}s）</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { validataCode } from '@/fn/validateRules'
import ViewBase from '@/util/ViewBase'
import applicationStore, { setRequestId } from '../store'
import { toast } from '@/util/toast'
import { verifySmsCode, getSmsCode } from '@/api/theater'
import { handleGoBack } from '@/util/native'

@Component
export default class VerifyCode extends ViewBase {
  // @Prop({ type: String, default: '' }) phoneNum!: string
  @Prop({ type: Boolean }) pageOn!: boolean
  // @Prop({ type: Boolean }) resetPwd!: boolean
  /** 进入下一页页面函数 */
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

  value: any = ''
  time: string = '60'
  page: number = 2
  clear: boolean = false
  again: boolean = false
  button: boolean = false
  phoneNum: string = ''

  @Watch('pageOn', { deep: true }) // 进入页面开始倒计时
  watchPageOn(val: boolean) {
    if (val) {
      this.phoneNum = applicationStore.state.userMobile
      this.getInputFocus()
      this.timeFunc()
    }
  }

  @Watch('value', { deep: true })
  watchValue(val: any) {
    this.clear = !!val
  }

  // 让 input 获取焦点
  getInputFocus() {
    const vfocus: any = this.$refs.verifyVal
    vfocus.focus()
  }

  clearNum() {
    this.value = ''
    this.button = false
    this.getInputFocus()
  }

  butLight() {
    this.button = !validataCode(this.value)
  }

  timeFunc() {
    // 倒计时开始时，input 框就获取焦点
    this.getInputFocus()
    const init: any = '60'
    let t: any = init
    const timer: any = setInterval(() => {
      if (t == 1) {
        this.again = true // 重新发送显示
        this.time = init // 显示时间重置
        clearInterval(timer)
      } else {
        t = t - 1
        this.time = t
      }
    }, 1000)
  }

  // 校验验证码
  async verifyCodeBut() {
    if (!this.button) {
      return
    } else {
      try {
        const res = await verifySmsCode({
          phoneNum: this.phoneNum,
          vcode: this.value,
          requestType: 1, // 1=注册 2=修改密码
          requestId: applicationStore.state.requestId
        })
        // 目前只区分注册和未注册
        if (res.code == 0) {
          setRequestId(res.data.requestId) // 更新store的值
          this.changePage(2)
        } else if (String(res.code).indexOf('900') > -1) {
          // 900是api的errCode 留在此页 例如验证码错误
          toast(res.msg)
        } else if (String(res.code).indexOf('800') > -1) {
          // 800是服务端的errCode，返回登录页 例如已注册过了
          toast(res.msg)
          setTimeout(async () => {
            const obj = {
              params: {
                isCloseWindow: true,
                refreshWindow: true
              }
            }
            await handleGoBack(obj)
          }, 1000)
        }
      } catch (ex) {
        this.handleError(ex)
      }
    }
  }

  // 重新发送验证码
  async sendAgain() {
    if (!this.again) {
      return
    } else {
      try {
        const res = await getSmsCode({ phoneNum: this.phoneNum })
        // 0 ===获取验证码成功
        // 1 ===获取验证码失败
        if (res.code == 0) {
          this.again = false
          this.timeFunc()
          setRequestId(res.data.requestId) // 更新store的值
        } else {
          toast(res.msg)
        }
      } catch (ex) {
        this.handleError(ex)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
