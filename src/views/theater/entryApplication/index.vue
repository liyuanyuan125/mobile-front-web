<template>
  <div class="application-page">
    <!-- tab -->
    <ApplicationTab :tabIndex="tabIndex" @changeTabIndex="changeTabIndex"></ApplicationTab>
    <!-- company -->
    <CompanyInfo v-show="tabIndex === 1" :companyItem="companyItem"></CompanyInfo>
    <!-- person -->
    <PersonInfo v-show="tabIndex === 2" :personItem="personItem"></PersonInfo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApplicationTab from './components/applicationTab.vue'
import CompanyInfo from './components/comanyInfo.vue'
import PersonInfo from './components/personInfo.vue'

@Component({
  components: {
    ApplicationTab,
    CompanyInfo,
    PersonInfo
  }
})
export default class Home extends Vue {
  tabIndex: number = 1 // 1=企业 2=个人
  companyItem: object = {} // 企业信息
  personItem: object = {} // 个人信息

  changeTabIndex(index: number) {
    this.tabIndex = index
  }
}
</script>

<style lang="less" scoped>
.application-page {
  padding: 20px 30px;
}
</style>