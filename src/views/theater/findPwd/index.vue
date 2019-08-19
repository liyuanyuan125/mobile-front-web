<template>
  <div class="apply">
    <NumPage
            v-show="page1"
            @logNum="getNum"
            :changePage="changePage"
    />
    <YzPage
            v-show="page2"
            :phoneNum="phoneNum"
            :pageOn="page2"
            :changePage="changePage"
    />
  <setPwdPage
            v-show="page3"
            :changePage="changePage"
  />
  </div>
</template>

<script lang="ts">
  import { Component,Prop,Vue,Watch } from 'vue-property-decorator'
  import { PasswordInput, NumberKeyboard } from 'vant'
  import NumPage from './numPage.vue'
  import YzPage from './yzPage.vue'
  import setPwdPage from './setPwdPage.vue'

  @Component({
    components: {
      YzPage,
      PasswordInput,
      NumberKeyboard,
      NumPage,
      setPwdPage
    }
  })
  export default class Apply extends Vue {
    page1 = true
    page2 = false
    page3 = false
    showNum = false
    showKeyboard = false
    phoneNum: string = ''

    getNum(val: any) {
      this.phoneNum = val
    }

    changePage(page:number) {
      switch (page) {
        case 1:
          this.page1 = false
          this.page2 = true
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
