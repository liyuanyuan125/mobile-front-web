<template>
  <div class="num">
    <div class="tit">输入验证码</div>
    <div class="yzTip"><span>验证码已发送至</span><em> +86 {{phoneNum}}</em></div>
    <div class="password">
      <input class="text" type="number" v-model="value"
             @keyup="verifyCode" oninput="if(value.length > 6)value = value.slice(0, 6)"
      >
      <i class="del" v-show="clear" @click="clearNum"></i>
    </div>
    <button class="button" @click="verifyCode">下一步</button>
    <div :class="again?'sendAgain':'sendTip'" @click="sendAgain">
      <p>重新发送 <span v-show="!again">（{{time}}S）</span></p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component,Prop,Vue,Watch } from 'vue-property-decorator'

  @Component
  export default class yzPage extends Vue {
    @Prop({ type: String, default: '' }) phoneNum!: string
    @Prop({ type: Boolean }) pageOn!: boolean
    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    value: any = ''
    time: string = '3'
    page: number = 2
    clear: boolean = false
    again: boolean = false
    requestID: any = ''

    @Watch('pageOn', {deep: true})   //进入页面开始倒计时
    watchPageOn(val:boolean){
      if(val){
        this.timeFunc()
      }
    }

    @Watch('value', {deep: true})
    watchValue(val:any){
      if(val){
        this.clear = true
      }else{
        this.clear = false
      }
    }

    clearNum(){
      this.value = ''
    }

    timeFunc(){
      const init:any = '3'
      let t:any = init
      let timer:any = setInterval(()=>{
        if(t == 1){
          this.again = true  //重新发送显示
          this.time = init   //显示时间重置
          clearInterval(timer)
        }else{
          t = t - 1
          this.time = t
        }
      },1000)
    }

    async verifyCode(){    //校验验证码
      if(this.value.length == 6){
        try {
          //const { data: {requestID}} = await verifyCode({phoneNum: this.phoneNum,vcode: this.value})
          // this.requestID = requestID
          this.changePage(this.page)
        } catch (ex) {
          // this.handleError(ex)
        }
      }
    }

    async sendAgain() {  //重新发送验证码
      if(!this.again){
        return
      }else{
        try {
          this.again = false
          // await getCode({phoneNum: this.phoneNum})
          this.timeFunc()
        } catch (ex) {
          // this.handleError(ex)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~@/views/theater/components/less/common.less';
  .yzTip{
    position: absolute;
    left: 46px;
    top: 86px;
    font-size: 14px;
    color: @tip-color;
    em{
      display: inline-block;
      margin-left: 5px;
      color: @black;
    }
  }
  .van-password-input{ //ul外层div
    margin: 0;
  }
  .van-password-input__security{  //ul
    height: 42px;
    border-bottom: @border;
    li{
      line-height: 42px;
      font-size: 25px;
      color: @black;
    }
  }
  .sendTip{
    font-size: 14px;
    color: @tip-color;
  }
  .sendAgain{
    font-size: 14px;
    color: @but-color;
  }
  .text{
    font-size: 25px;
    letter-spacing: 10px;
  }
</style>
