<template>
  <div :class="pageType =='1' ? 'adver' : 'apply'">
    <NumPage v-show="page1" :changePage="changePage" @logNum="getNum" />
    <CheckPage
      v-show="page2"
      :phoneNum="phoneNum"
      :pageOn="page2"
      :changePage="changePage"
      :pageType="pageType"
    />
    <SetPwdPage v-show="page3" :resetPwd="false" :changePage="changePage" :pageType="pageType" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NumPage from './components/numPage.vue'
import CheckPage from './components/checkPage.vue'
import SetPwdPage from './components/setPwdPage.vue'

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
  pageType: any = '' // 1=广告主端 2=影院端   仅样式不一样

  mounted() {
    this.pageType = this.$route.query.type || '1'
    document.title = '找回密码'
  }

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
        this.$router.push({ name: 'form' })
        break
    }
  }
}
</script>

<style lang="less" scoped>
.apply,
.adver {
  position: relative;
  padding: 100px 92px 0;
}
.van-toast {
  line-height: 0;
  font-size: 50px;
}
</style>
