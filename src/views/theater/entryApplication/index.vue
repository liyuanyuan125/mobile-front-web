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
      <button @click="submitApplication">提交申请</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApplicationTab from './components/applicationTab.vue'
import CompanyInfo from './components/comanyInfo.vue'
import PersonInfo from './components/personInfo.vue'
import { Toast } from 'vant'

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
    companyName: '',
    provinceId: 0,
    provinceName: '企业所在省份',
    cityId: 0,
    cityName: '城市',
    qualificationId: 'NULL',
    qualificationName: ''
  })
  // 个人信息
  personItem: object = Object.assign({}, this.commonInfo, {
    accountType: 2,
    contactMail: '',
    voucherId: 'NULL',
    voucherName: ''
  })

  // 切换 tab
  changeTabIndex(index: number) {
    this.tabIndex = index
  }

  /**
   * 验证信息
   */
  checkInfo(obj: any) {
    console.info('11', obj, obj.accountType)
    switch (obj.accountType) {
      //企业
      case 1:
        console.info('11', obj.companyName.length, obj.companyName)
        if (!obj.companyName.length) {
          this.$toast('请填写公司名称')
        } else if (!obj.contact.length) {
          this.$toast('请填写联系人')
        } else if (!obj.contactTel.length) {
          this.$toast('请填写联系人电话')
        } else if (!obj.provinceId) {
          this.$toast('请选择公司所在省份')
        } else if (!obj.cityId) {
          this.$toast('请选择公司所在城市')
        } else if (obj.qualificationId === 'NULL') {
          this.$toast('请选择公司行业类型')
        } else if (!obj.credentialUrl.length) {
          this.$toast('请上传公司营业执照')
        }
        break
      case 2:
        if (!obj.contact.length) {
          this.$toast('请填写联系人')
        } else if (!obj.contactTel.length) {
          this.$toast('请填写联系人电话')
        } else if (obj.qualificationId === 'NULL') {
          this.$toast('请选择证件类型')
        } else if (!obj.credentialUrl.length) {
          this.$toast('请上传证件照')
        } else if (obj.qualificationId === 'ID_CARD' && obj.credentialUrl.length < 2) {
          this.$toast('请上传身份证正反照')
        }
        break
    }
  }

  async submitApplication() {
    console.info(this.companyItem)
    this.checkInfo(this.companyItem)
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