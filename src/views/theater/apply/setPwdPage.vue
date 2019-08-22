<template>
  <div class="num">
    <div class="tit">{{tit}}</div>
    <div class="password">
      <input class="text" :type="inputType" v-model="password" placeholder="请输入6～16位新密码" maxlength="16">
      <i :class="show?'show':'hide'" @click="toggleShow"></i>
    </div>
    <button class="button" @click="confirmLogin">确认</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { validatePassword } from '@/fn/validateRules'

  @Component
  export default class SetPwdPage extends Vue {
    @Prop({ type: String }) tit!: string
    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    page: number = 3
    password: any = ''
    inputType: any = 'password'
    show: boolean = false

    toggleShow() {
      if (this.inputType == 'password') {
        this.inputType = 'text'
        this.show = true
      } else {
        this.inputType = 'password'
        this.show = false
      }
    }

    async confirmLogin() {
      if (validatePassword(this.password)) {
        alert(validatePassword(this.password))
      } else {
        try {
          // await setPwd({requestID: this.requestID,phoneNum: this.inValue,password: this.password})
          this.changePage(this.page)
        } catch (ex) {
          // this.handleError(ex)
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
