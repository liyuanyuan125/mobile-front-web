<template>
  <div class="num">
    <div class="tit">{{tit}}</div>
    <div class="password">
      <input class="text" :type="inputType" v-model="password" placeholder="请输入6～16位新密码"
             maxlength="16"
             onkeypress="return (/[a-zA-Z\d]/.test(String.fromCharCode(event.keyCode)))"
             @keyup="butLight"
      >
      <i :class="show?'show':'hide'" @click="toggleShow"></i>
    </div>
    <button :class="button?'button':'button disabled'" @click="confirmLogin">确认</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { validatePassword } from '@/fn/validateRules'
  import { getPassword } from '@/store'

  @Component
  export default class SetPwdPage extends Vue {
    @Prop({ type: String }) tit!: string
    @Prop({ type: Boolean }) resetPwd!: boolean
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
          // await setPwd({requestID: this.$store.state.requestID,phoneNum: this.inValue,password: this.password})
          getPassword(this.password)  // 更新store的值
          this.changePage(this.page)

          // 重置密码时点确认 提示：密码重置完成  设置密码时不做提示
          if (this.resetPwd) {
            alert('密码重置完成')
          }
        } catch (ex) {
          throw new Error(ex)
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  @import 'less/common.less';
  .password{
    position: relative;
    i{
      position: absolute;
      top: 34px;
      right: 20px;
    }
    .hide{
      width: 36px;
      height: 18px;
      background: url("assets/hide.png") no-repeat center;
      background-size: cover;
    }
    .show{
      width: 36px;
      height: 24px;
      background: url("assets/noHide.png") no-repeat center;
      background-size: cover;
    }
  }
</style>
