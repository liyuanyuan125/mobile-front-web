<template>
  <div class="apply">
    <div class="tit">{{tit}}</div>
    <div class="tip"><span>验证码已发送至</span><em>21313331</em></div>
    <input type="text">
    <button @click="changePage">获取验证码</button>
  </div>
</template>

<script lang="ts">
  import { Component,Prop,Vue } from 'vue-property-decorator'

  @Component
  export default class Apply extends Vue {
    checkPage = 1
    tit: any = '输入手机号码'

    changePage(page: number) {
      switch (page) {
        case 1:
          this.checkPage = 2
            console.log(this.checkPage)
          break
        case 2:
          this.checkPage = 3
          console.log(this.checkPage)
          break
        case 3:
          this.$router.push({name: 'form'})
          console.log(this.checkPage)
          break
      }
    }

  }
</script>

<style lang="less" scoped>
  .apply {
    text-align: center;
    margin-top: 28px;
  }
</style>
