<template>
  <div class="num">
    <div class="tit">输入手机号码</div>
    <div class="password">
      <input class="text" type="number" v-model="inValue" placeholder="请输入您的手机号码"
             oninput="if(value.length > 11)value = value.slice(0, 11)"
      >
      <i class="del" v-show="clear" @click="clearNum"></i>
    </div>
    <button class="button" @click="getYzm">获取验证码</button>
    <div class="numTip"><p>已有账号?<a href="">立即登录</a></p></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component
  export default class NumPage extends Vue {
    @Prop({type: String, default: ''}) phoneNum!: string

    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    inValue: string = this.phoneNum
    page: number = 1
    clear: boolean = false

    @Watch('inValue', {deep: true})
    watchPhoneNum (val: any) {
      if (val) {
        this.clear = true
      } else {
        this.clear = false
      }
      this.$emit("logNum",val)
    }

    clearNum () {
      this.inValue = ''
    }

    async getYzm() {
      if(this.inValue == ''){
        alert('请输入手机号')
        return
      } else {
        try {
          // await getCode({phoneNum: this.inValue})
          this.changePage(this.page)
        } catch (ex) {
          // this.handleError(ex)
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '~@/views/theater/components/less/common.less';
  .numTip{
    width: 100%;
    text-align: right;
    p{
      font-size: 14px;
      color: @tip-color;
      a{
        color: @but-color;
      }
    }
  }
</style>
