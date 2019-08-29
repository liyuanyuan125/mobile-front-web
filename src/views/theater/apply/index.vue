<template>
  <div class="apply">
    <NumPage v-show="page1" :pageType="pageType" :changePage="changePage" @logNum="getNum" />
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
import NumPage from './numPage.vue'
import CheckPage from './checkPage.vue'
import SetPwdPage from './setPwdPage.vue'

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
  pageType: any = '1' // 1=申请入驻 2=修改密码

  mounted() {
    this.pageType = this.$route.query.type
    document.title = this.pageType === '1' ? '申请入驻' : '找回密码'
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
.apply {
  position: relative;
  padding: 100px 92px 0;
}
.van-toast {
  line-height: 0;
  font-size: 50px;
}
</style>
