<template>
  <div class="wrap">
    <div class="tit">设置密码</div>
    <div class="inputctrl password">
      <input
        class="text"
        :type="inputType"
        v-model="password"
        placeholder="请输入新密码 (数字、字母，6～16位)"
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
import { userHasLoginInH5, setNavBarStatus } from '@/util/native'
import { toast } from '@/util/toast'
import { devLog, devInfo } from '@/util/dev'

@Component
export default class SetPassWord extends ViewBase {
  /** 进入下一页页面函数 */
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>
  @Prop({ type: Boolean }) guestShow!: boolean

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
    }
    if (!this.checkPassWord()) {
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
          recommendTel: sto.state.recommendPhone,
          customerId: sto.state.guestId
        })
        if (res.code === 0) {
          // toast('注册成功')
          // 成功后去往注册成功页
          this.changePage(3)
          // 隐藏成功页的顶部管理区
          this.hideNavBarStatus()
          // 通知APP注册成功了
          const mi = this.$cookies.get('app-token')
          const hostArr = location.host.split('.')
          const host = `${hostArr[1]}.${hostArr[2]}`
          const userCookie = `app-token=${mi};Domain=${host}`
          devInfo('userCookie', userCookie, res.data)
          const obj = {
            params: {
              userId: res.data,
              userCookie
            }
          }
          await userHasLoginInH5(obj)
        } else {
          toast('注册失败，请联系客服')
          this.handleError(res.msg)
        }
      } catch (ex) {
        this.handleError(ex)
      }
    }
  }

  // 验证一下验证码
  checkPassWord() {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (
      !reg.test(this.password) ||
      this.password.length > 16 ||
      this.password.length < 6
    ) {
      toast('密码为6-16位字母、数字')
      return false
    } else {
      return true
    }
  }

  // 隐藏导航
  async hideNavBarStatus() {
    const objectData = {
      isShowNavBar: false,
      statusBarColor: '#A5BEF8'
    }
    const obj = { params: objectData }
    await setNavBarStatus(obj)
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
