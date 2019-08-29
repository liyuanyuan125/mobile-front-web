<template>
  <div class="num">
    <div class="tit">输入手机号码</div>
    <div class="password">
      <input
        class="text"
        type="number"
        v-model="inValue"
        placeholder="请输入您的手机号码"
        oninput="if(value.length > 11)value = value.slice(0, 11)"
        onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))&&(/[^+-.*]/.test(event.key))"
        @keyup="butLight"
      />
      <i class="del" v-show="clear" @click="clearNum"></i>
    </div>
    <button :class="button?'button':'button disabled'" @click="getVerifyCode">获取验证码</button>
    <div class="numTip" v-show="pageType === '1'">
      <p>
        已有账号?
        <span @click="goBackApp">立即登录</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { validataTel } from '@/fn/validateRules'
import ViewBase from '@/util/ViewBase'
import { getSmsCode } from '@/api/theater'
import { setRequestId, setPhoneNumber } from '@/store'
import { Toast } from 'vant'
import { handleGoBack } from '@/util/native'

@Component
export default class NumPage extends ViewBase {
  @Prop({ type: String, default: '' }) phoneNum!: string
  @Prop({ type: String, default: '1' }) pageType!: string

  /** 进入下一页页面函数 */
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

  inValue: string = this.phoneNum
  page: number = 1
  clear: boolean = false
  button: boolean = false

  @Watch('inValue', { deep: true })
  watchPhoneNum(val: any) {
    this.clear = !!val
    this.$emit('logNum', val)
  }

  clearNum() {
    this.inValue = ''
  }

  // 监听 input 改变按钮状态
  butLight() {
    this.button = !validataTel(this.inValue)
  }

  // 获取验证码
  async getVerifyCode() {
    if (!this.button) {
      return
    } else {
      try {
        const res = await getSmsCode({ phoneNum: this.inValue })
        // 0 ===获取验证码成功
        // 1 ===获取验证码失败
        if (res.code == 0) {
          this.changePage(this.page)
          setRequestId(res.data.requestId) // 更新store的值
          setPhoneNumber(this.inValue) // 更新store的值
        } else {
          this.$toast(res.msg)
        }
      } catch (ex) {
        this.handleError(ex)
      }
    }
  }

  // 返回登录页 (关闭 webview)
  async goBackApp() {
    const obj = {
      params: {
        isCloseWindow: true,
        refreshWindow: false
      }
    }
    await handleGoBack(obj)
  }
}
</script>

<style lang="less" scoped>
@import 'less/common.less';
.numTip {
  width: 100%;
  text-align: right;
  p {
    font-size: 28px;
    color: @tip-color;
    span {
      color: @but-color;
    }
  }
}
</style>
