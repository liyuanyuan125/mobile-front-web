<template>
  <div class="application-page">
    <!-- tab -->
    <ApplicationTab :tabIndex="tabIndex" @changeTabIndex="changeTabIndex"></ApplicationTab>
    <!-- company -->
    <CompanyInfo v-show="tabIndex === 1" :companyItem="companyItem"></CompanyInfo>
    <!-- person -->
    <PersonInfo v-show="tabIndex === 2" :personItem="personItem"></PersonInfo>
    <!-- submit -->
    <div class="submitBox">
      <button>提交申请</button>
    </div>
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
export default class Application extends Vue {
  // 1=企业 2=个人
  tabIndex: number = 1
  // 基本信息
  commonInfo: any = {
    requestId: '',
    password: '',
    contact: '',
    contactTel: '',
    credentialUrl: [],
    recommendTel: ''
  }
  // 企业信息
  companyItem: object = Object.assign({}, this.commonInfo, {
    accountType: 1,
    companyName: '票神',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    qualificationId: '',
    qualificationName: ''
  })
  // 个人信息
  personItem: object = Object.assign({}, this.commonInfo, {
    accountType: 2,
    contactMail: '',
    voucherId: '',
    voucherName: ''
  })

  // 切换 tab
  changeTabIndex(index: number) {
    this.tabIndex = index
  }
}
</script>

<style lang="less" scoped>
.application-page {
  padding: 20px 30px;
}
.submitBox {
  text-align: center;
  margin-top: 40px;
  button {
    background-color: #3c8eff;
    width: 566px;
    color: #fff;
    font-size: 30px;
    line-height: 90px;
    padding: 0;
    border: none;
    text-align: center;
    border-radius: 45px;
  }
}
</style>