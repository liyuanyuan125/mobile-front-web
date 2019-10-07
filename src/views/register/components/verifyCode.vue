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
        // 这里有点绕，备注一下
        // 当页面类型是申请入驻的帐号时，0表示这个用户未注册过，可以继续注册 0只给申请用户使用
        // 当页面类型是修改密码时，手机号未注册的时候，api会返回相应的code=8007224
        switch (res.code) {
          case 0:
            setRequestId(res.data.requestId) // 更新store的值
            this.changePage(2)
            break
          case 8007408:
            // 公司状态为待审核
            await this.$router.push({ name: 'submit', query: { show: '1' } })
            break
          case 8007223:
            toast('您已开通广告商平台，请登录')
            break
          case 8007225:
            // 已经开通了账号，但是未开通广告商平台账号
            await this.$router.push({ name: 'submit', query: { show: '2' } })
            break
          default:
            toast(res.msg)
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
