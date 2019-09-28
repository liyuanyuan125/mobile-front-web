<template>
  <div class="application-page">
    <!-- tab -->
    <ApplicationTab :tabIndex="tabIndex" @changeTabIndex="changeTabIndex($event)"></ApplicationTab>
    <!-- company -->
    <CompanyInfo
      v-show="tabIndex === 1"
      :companyItem="companyItem"
      @credentialFileId="changeCredential"
    ></CompanyInfo>
    <!-- person -->
    <PersonInfo
      v-show="tabIndex === 2"
      :personItem="personItem"
      @credentialFileId="changeCredential"
    ></PersonInfo>
    <!-- submit -->
    <div class="submitBox">
      <button @click="submitApplication">提交申请</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import GetMobile from './components/getMobile.vue'
import VerifyCode from './components/verifyCode.vue'
import SetPassWord from './components/setPassWord.vue'
import Success from './components/success.vue'
import { submitApplicationInfo } from '@/api/theater'
import { toast } from '@/util/toast'

@Component({
  components: {
    GetMobile,
    VerifyCode,
    SetPassWord,
    Success
  }
})
export default class Application extends Vue {
  // 1=企业 2=个人
  tabIndex: number = 1
  // 从其他页面带过来的信息
  commonInfo: any = {
    requestId: this.$store.state.requestId,
    password: this.$store.state.password,
    phoneNum: this.$store.state.phoneNumber,
    contactTel: this.$store.state.phoneNumber
  }
  // 企业信息
  companyItem: any = Object.assign({}, this.commonInfo, {
    accountType: 1,
    companyName: '',
    contact: '',
    provinceId: 0,
    cityId: 0,
    qualificationId: 'NULL',
    credentialUrl: '',
    recommendTel: ''
  })
  // 个人信息
  personItem: any = Object.assign({}, this.commonInfo, {
    accountType: 2,
    contact: '',
    voucherId: 'NULL',
    credentialUrl: '',
    recommendTel: ''
  })

  mounted() {
    document.title = '填写信息'
  }

  // 切换 tab
  changeTabIndex(index: number) {
    this.tabIndex = index
  }

  changeCredential(img: string) {
    if (this.tabIndex === 1) {
      this.companyItem.credentialUrl = img
    } else {
      this.personItem.credentialUrl = img
    }
  }

  async submitApplication() {
    try {
      let result: any
      if (this.tabIndex === 1) {
        // 企业
        const obj = this.companyItem
        if (!obj.companyName.length) {
          toast('请填写公司名称')
          return
        } else if (!obj.contact.length) {
          toast('请填写联系人')
          return
        } else if (!obj.contactTel.length) {
          toast('请填写联系人电话')
          return
        } else if (!obj.provinceId) {
          toast('请选择公司所在省份')
          return
        } else if (!obj.cityId) {
          toast('请选择公司所在城市')
          return
        } else if (obj.qualificationId === 'NULL') {
          toast('请选择公司行业类型')
          return
        } else if (!obj.credentialUrl) {
          toast('请上传公司营业执照')
          return
        } else {
          const finalItem = Object.assign({}, this.commonInfo, this.companyItem)
          result = await submitApplicationInfo(finalItem)
        }
      } else if (this.tabIndex === 2) {
        // 个人
        const obj = this.personItem
        if (!obj.contact.length) {
          toast('请填写联系人')
          return
        } else if (!obj.contactTel.length) {
          toast('请填写联系人电话')
          return
        } else if (obj.qualificationId === 'NULL') {
          toast('请选择证件类型')
          return
        } else if (!obj.credentialUrl.length) {
          toast('请上传证件照')
          return
        } else if (
          obj.qualificationId === 'ID_CARD' &&
          obj.credentialUrl.split(',').length < 2
        ) {
          toast('请上传身份证正反照')
          return
        } else {
          const finalItem = Object.assign({}, this.commonInfo, this.personItem)
          result = await submitApplicationInfo(this.personItem)
        }
      }
      switch (result.code) {
        case 0:
      }
    } catch (ex) {
      //
    }
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