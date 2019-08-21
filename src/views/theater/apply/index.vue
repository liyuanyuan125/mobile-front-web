<template>
  <div class="apply">
    <NumPage
            v-show="page1"
            :changePage="changePage"
            @logNum="getNum"
    />
    <CheckPage
            v-show="page2"
            :phoneNum="phoneNum"
            :pageOn="page2"
            :changePage="changePage"
    />
    <SetPwdPage
            v-show="page3"
            :tit="setPwdTit"
            :changePage="changePage"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import NumPage from '../components/input/numPage.vue'
  import CheckPage from '../components/input/checkPage.vue'
  import SetPwdPage from '../components/input/setPwdPage.vue'

  @Component({
    components: {
      CheckPage,
      NumPage,
      SetPwdPage
    }
  })
  export default class Apply extends Vue {
    page1 = true
    page2 = false
    page3 = false
    phoneNum: string = ''
    setPwdTit: string = '设置登录密码'

    getNum(val: any) {
      this.phoneNum = val
    }

    changePage(page: number) {
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
    padding: 100px 92px 0;
  }
</style>
