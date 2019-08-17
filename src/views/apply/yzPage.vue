<template>
  <div class="num">
    <div class="tit">输入验证码</div>
    <div class="yzTip"><span>验证码已发送至</span><em>{{phoneNum}}</em></div>
    <PasswordInput
            :value="value"
            :mask="false"
            :length="6"
            :gutter="5"
            @focus="showKeyboard = true"
    />
    <NumberKeyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
            @blur="showKeyboard = false"
    />
    <button class="button" @click="setPwd">下一步</button>
    <div class="sendTip"><p>重新发送（{{time}}S）</p></div>
  </div>
</template>

<script lang="ts">
  import { Component,Prop,Vue,Watch } from 'vue-property-decorator'
  import { PasswordInput, NumberKeyboard } from 'vant'

  @Component({
    components: {
      PasswordInput,
      NumberKeyboard
    }
  })
  export default class yzPage extends Vue {
    @Prop({ type: String, default: '' }) phoneNum!: string
    @Prop({ type: Boolean }) pageOn!: boolean
    /** 进入下一页页面函数 */
    @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

    showKeyboard = false
    value: any = ''
    time: string = '30'
    page: number = 2

    async setPwd() {
      this.changePage(this.page)
    }

    @Watch('pageOn', {deep: true})
    watchPageOn(val:boolean){
      if(val){
        this.timeFunc()
      }
    }

    timeFunc(){
      const init:any = '30'
      let t:any = init
      let timer:any = setInterval(()=>{
        if(t == 0){
          clearInterval(timer)
        }else{
          t = t - 1
          this.time = t
        }
      },1000)
    }

    onInput(key: any) {
      this.value = (this.value + key).slice(0, 6)
    }

    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    }
  }
</script>

<style lang="less" scoped>
  @import '~@/views/apply/less/common.less';
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
</style>
