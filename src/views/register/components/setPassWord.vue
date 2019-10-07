<template>
  <div class="wrap">
    <div class="tit">设置密码</div>
    <div class="inputctrl password">
      <input
        class="text"
        :type="inputType"
        v-model="password"
        placeholder="请输入6～16位新密码"
        maxlength="16"
        onkeypress="return (/[a-zA-Z\d]/.test(String.fromCharCode(event.keyCode)))"
        @keyup="butLight"
      />
      <i :class="show?'show':'hide'" @click="toggleShow"></i>
    </div>
    <div class="subbuttonbox">
      <button :class="button?'button':'button disabled'" @click="confirmLogin">确认</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { validatePassword } from '@/fn/validateRules'
import ViewBase from '@/util/ViewBase'
import applicationStore from '../store'
import { submitApplicationInfo } from '@/api/theater'
import { handleGoBack } from '@/util/native'
import { toast } from '@/util/toast'

@Component
export default class SetPassWord extends ViewBase {
  /** 进入下一页页面函数 */
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

  page: number = 3
  password: any = ''
  inputType: any = 'text'
  show: boolean = true
  button: boolean = false

  toggleShow() {
    if (this.inputType == 'password') {
      this.inputType = 'text'
      this.show = true
    } else {
      this.inputType = 'password'
      this.show = false
    }
  }

  butLight() {
    this.button = !validatePassword(this.password)
  }

  async confirmLogin() {
    if (!this.button) {
      return
    } else {
      try {
        const sto = applicationStore
        const res: any = await submitApplicationInfo({
          requestId: sto.state.requestId,
          phoneNum: sto.state.userMobile,
          password: this.password,
          accountType: sto.state.userType,
          companyName: sto.state.companyName,
          contact: sto.state.userName,
          // contactTel: '',
          recommendTel: sto.state.recommendPhone
        })
        if (res.code === 0) {
          // toast('注册成功')
          // 成功后返回登录页
        } else {
          toast('注册失败，请联系客服')
          this.handleError(res.msg)
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
.password {
  position: relative;
  i {
    position: absolute;
    top: 34px;
    right: 20px;
  }
  .hide {
    width: 36px;
    height: 18px;
    background: url('../assets/hide.png') no-repeat center;
    background-size: cover;
  }
  .show {
    width: 36px;
    height: 24px;
    background: url('../assets/noHide.png') no-repeat center;
    background-size: cover;
  }
}
</style>
