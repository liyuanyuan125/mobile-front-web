<template>
  <div class="num">
    <div class="tit">{{tit}}</div>
    <div class="password">
      <input class="text" :type="inputType" v-model="password" placeholder="请输入6～16位新密码">
      <i :class="show?'show':'hide'" @click="toggleShow"></i>
    </div>
    <button class="button" @click="confirmLogin">确认</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class setPwdPage extends Vue {
    @Prop({ type: String }) tit!: string
    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    page: number = 3
    password: any = ''
    inputType: any = 'password'
    show: boolean = false

    toggleShow(){
      if(this.inputType == 'password'){
        this.inputType = 'text'
        this.show = true
      }else{
        this.inputType = 'password'
        this.show = false
      }
    }

    async confirmLogin() {
      try {
        // await setPwd({requestID: this.requestID,phoneNum: this.inValue,password: this.password})
        this.changePage(this.page)
      } catch (ex) {
        // this.handleError(ex)
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '~@/views/theater/components/less/common.less';
  .password{
    position: relative;
    i{
      position: absolute;
      top: 17px;
      right: 10px;
    }
    .hide{
      width: 18px;
      height: 9px;
      background: url("./assets/hide.png") no-repeat center;
      background-size: cover;
    }
    .show{
      width: 18px;
      height: 12px;
      background: url("./assets/noHide.png") no-repeat center;
      background-size: cover;
    }
  }
</style>
