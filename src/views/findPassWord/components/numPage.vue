<template>
  <div class="num">
    <div class="tit">输入手机号码</div>
    <div class="password">
      <input
        class="text"
        type="number"
        v-model="inValue"
        placeholder="请输入您的手机号码"
        v-on:input="butLight"
        pattern="[0-9]*"
        oninput="if(value.length > 11)value = value.slice(0, 11)"
        ref="getPhoneNumber"
      />
      <i class="del" v-show="clear" @click="clearNum"></i>
    </div>
    <button :class="button?'button':'button disabled'" @click="getVerifyCode">获取验证码</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { validataTel } from '@/fn/validateRules'
import ViewBase from '@/util/ViewBase'
import { getSmsCode } from '@/api/theater'
import { setRequestId, setPhoneNumber } from '@/store'
import { toast } from '@/util/toast'
import { handleGoBack } from '@/util/native'

@Component
export default class NumPage extends ViewBase {
  @Prop({ type: String, default: '' }) phoneNum!: string

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
    this.button = false
    const mobile: any = this.$refs.getPhoneNumber
    mobile.focus()
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
        const res = await getSmsCode({
          phoneNum: this.inValue,
          requestType: 2 // 1:注册   2:修改密码
        })
        // 0 ===获取验证码成功
        // 1 ===获取验证码失败
        if (res.code == 0) {
          this.changePage(this.page)
          setRequestId(res.data.requestId) // 更新store的值
          setPhoneNumber(this.inValue) // 更新store的值
        } else {
          toast(res.msg)
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
@import '../less/common.less';
.numTip {
  width: 100%;
  text-align: right;
  p {
    font-size: 28px;
    color: #899ab3;
    span {
      color: #3c8eff;
    }
  }
}
</style>
