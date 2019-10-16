<template>
  <div class="num">
    <div class="tit">设置新密码</div>
    <div class="password">
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
    <button :class="button?'button':'button disabled'" @click="confirmLogin">确认</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { validatePassword } from '@/fn/validateRules'
import ViewBase from '@/util/ViewBase'
import { setPassword } from '@/store'
import { modifyPassWord } from '@/api/theater'
import { handleGoBack } from '@/util/native'
import { toast } from '@/util/toast'

@Component
export default class SetPwdPage extends ViewBase {
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
    }
    if (!this.checkPassWord()) {
      return
    } else {
      try {
        const res: any = await modifyPassWord({
          requestId: this.$store.state.requestId,
          phoneNum: this.$store.state.phoneNumber,
          password: this.password
        })
        if (res.code === 0) {
          toast('密码重置完成')
          // 成功后返回登录页
          const obj = {
            params: {
              isCloseWindow: true,
              refreshWindow: false
            }
          }
          await handleGoBack(obj)
        } else {
          toast('密码重置失败，请重试')
          this.handleError(res.msg)
        }
      } catch (ex) {
        this.handleError(ex)
      }
    }
  }

  // 验证一下验证码
  checkPassWord() {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/
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
}
</script>

<style lang="less" scoped>
@import '../less/common.less';
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
