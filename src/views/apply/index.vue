<template>
  <div class="apply">


    <div class="password" v-show="page3">
      <input class="text" type="text" :value="password" placeholder="请输入6～16位新密码">
      <i></i>
    </div>
    <NumPage
            v-show="page1"
            ref="getNum"
            :changePage="changePage"
    />
    <YzPage
            v-show="page2"
            :phoneNum="phoneNum"
            :pageOn="page2"
            :changePage="changePage"
    />
  </div>
</template>

<script lang="ts">
  import { Component,Prop,Vue } from 'vue-property-decorator'
  import { PasswordInput, NumberKeyboard } from 'vant';
  import NumPage from './numPage.vue'
  import YzPage from './yzPage.vue'

  @Component({
    components: {
      YzPage,
      PasswordInput,
      NumberKeyboard,
      NumPage
    }
  })
  export default class Apply extends Vue {
    page1 = true
    page2 = false
    page3 = false
    showNum = false
    showKeyboard = false
    phoneNum: string = ''
    password: string = ''

    changePage(page:number) {
      switch (page) {
        case 1:
          this.page1 = false
          this.page2 = true
          this.phoneNum = this.$refs.getNum.phoneNum
          break
        case 2:
          this.page2 = false
          this.page3 = true
          break
        case 3:
          this.$router.push({name: 'form'})
          break
      }
    }

  }
</script>

<style lang="less" scoped>
  .apply {
    position: relative;
    padding: 50px 46px 0;
  }
</style>
