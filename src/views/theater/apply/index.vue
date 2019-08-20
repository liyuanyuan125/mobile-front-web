<template>
  <div class="apply">
    <NumPage
            v-show="page1"
            :changePage="changePage"
            @logNum="getNum"
    />
    <YzPage
            v-show="page2"
            :phoneNum="phoneNum"
            :pageOn="page2"
            :changePage="changePage"
    />
  <setPwdPage
            v-show="page3"
            :tit="setPwdTit"
            :changePage="changePage"
  />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import NumPage from '../components/numPage.vue'
  import YzPage from '../components/yzPage.vue'
  import setPwdPage from '../components/setPwdPage.vue'

  @Component({
    components: {
      YzPage,
      NumPage,
      setPwdPage
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
    padding: 50px 46px 0;
  }
</style>
