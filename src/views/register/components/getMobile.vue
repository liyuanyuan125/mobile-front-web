<template>
  <div class="wrap">
    <p class="tit">广告主申请入驻</p>
    <div class="gologin">
      已有帐号？
      <i @click.stop="goLogin">立即登录</i>
    </div>
    <div class="radiobox">
      <label
        v-for="item in radioType"
        :key="item.value"
        :data-type="item.value"
        @click.self="changeRadioType($event)"
      >
        <i
          :class="['radio',{check:userType==item.value}]"
          @click.stop="changeRadioType($event)"
          :data-type="item.value"
        ></i>
        {{item.name}}
      </label>
    </div>
    <dl class="fillinfo">
      <dd v-show="userType == '1'">
        <div class="inputctrl">
          <input
            class="text"
            type="text"
            v-model.trim="companyName"
            v-on:input="changeBtnStatus"
            placeholder="企业名称 (中文、字母、数字,2~100字)"
          />
          <i class="del" v-show="companyName.length" @click="clearTxt('companyName')"></i>
        </div>
      </dd>
      <dd>
        <div class="inputctrl">
          <input
            class="text"
            type="text"
            v-model.trim="userName"
            placeholder="姓名 (中文、字母、数字,2~6字)"
            v-on:input="changeBtnStatus"
          />
          <i class="del" v-show="userName.length" @click="clearTxt('userName')"></i>
        </div>
      </dd>
      <dd>
        <div class="inputctrl">
          <input
            class="text"
            type="number"
            v-model="userMobile"
            placeholder="手机号"
            v-on:input="changeBtnStatus"
            oninput="if(value.length > 11)value = value.slice(0, 11)"
            ref="getPhoneNumber"
            pattern="[0-9]*"
          />
          <i class="del" v-show="userMobile.length" @click="clearTxt('userMobile')"></i>
        </div>
      </dd>
      <dd>
        <div class="inputctrl">
          <input
            class="text"
            type="number"
            v-model="recommendMobile"
            placeholder="推荐人手机号码 (选填)"
            oninput="if(value.length > 11)value = value.slice(0, 11)"
            v-on:input="changeBtnStatus"
            ref="getPhoneNumber"
            pattern="[0-9]*"
          />
          <i class="del" v-show="recommendMobile.length" @click="clearTxt('recommendMobile')"></i>
        </div>
      </dd>
      <dt>
        <i @click.stop="changeAgreeStatus" :class="{checked:isAgree}"></i>
        <router-link to="/help/agreement">《广告主合作协议》</router-link>
      </dt>
    </dl>
    <div class="subbuttonbox">
      <button :class="{disabled:!btnStatus}" @click="getVerifyCode">获取验证码</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { validataTel } from '@/fn/validateRules'
import {
  setRequestId,
  setUserType,
  setCompanyName,
  setUserName,
  setUserMobile,
  setRecommendPhone
} from '../store'
import { handleUploadImage } from '@/util/native'
import { getSmsCode } from '@/api/theater'
import { toast } from '@/util/toast'
import { handleGoBack } from '@/util/native'

@Component
export default class GetMobile extends ViewBase {
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>

  // 注册类型
  radioType: any = [
    {
      name: '企业',
      value: '1'
    },
    {
      name: '个人',
      value: '2'
    }
  ]
  userType: string = '1' // 注册类型
  companyName: string = '' // 公司名称
  userName: string = '' // 用户名称
  userMobile: string = '' // 用户手机号
  recommendMobile: string = '' // 推荐人手机号
  isAgree: boolean = true // 是否同意用户协议
  btnStatus: boolean = false

  // 清除
  clearTxt(name: string) {
    switch (name) {
      case 'companyName':
        this.companyName = ''
        break
      case 'userName':
        this.userName = ''
        break
      case 'userMobile':
        this.userMobile = ''
        break
      case 'recommendMobile':
        this.recommendMobile = ''
    }
    this.changeBtnStatus()
  }

  // 选择注册类型
  changeRadioType(e: any) {
    const idx = e.target.dataset.type
    this.userType = idx
    // 如果是个人时，将公司名称清空
    if (idx === '2') {
      this.companyName = ''
    }
  }

  // 是否同意用户协议
  changeAgreeStatus() {
    this.isAgree = !this.isAgree
  }

  // 监听 input 改变提按钮状态
  changeBtnStatus() {
    // 推荐手机号为空或不为空时格式正式确都是true
    const recomVali = this.recommendMobile == '' || !validataTel(this.recommendMobile)
    if (this.userType === '2') {
      // 个人
      this.btnStatus =
        this.userName != '' &&
        !validataTel(this.userMobile) &&
        recomVali &&
        this.isAgree
    } else {
      // 企业
      this.btnStatus =
        this.companyName != '' &&
        this.userName != '' &&
        !validataTel(this.userMobile) &&
        recomVali &&
        this.isAgree
    }
  }

  // 获取验证码
  async getVerifyCode() {
    if (!this.btnStatus) {
      return
    }
    if (!this.chectkInfo()) {
      return
    } else {
      try {
        const res = await getSmsCode({
          phoneNum: this.userMobile,
          requestType: 1 // 1:注册   2:修改密码
        })
        // 0 ===获取验证码成功
        // 1 ===获取验证码失败
        if (res.code == 0) {
          // this.changePage(this.page)
          // 更新store的值
          setRequestId(res.data.requestId)
          setUserType(this.userType)
          setUserName(this.userName)
          setUserMobile(this.userMobile)
          setRecommendPhone(this.recommendMobile)
          if (this.userType === '1') {
            setCompanyName(this.companyName)
          }
          this.changePage(1)
        } else {
          toast(res.msg)
        }
      } catch (ex) {
        this.handleError(ex)
      }
    }
  }

  // 验证信息
  chectkInfo() {
    // 验证信息是否含有特殊符号或空格
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
    console.log(reg.test(this.companyName))
    if (!reg.test(this.companyName)) {
      toast('企业名称仅支持中文、字母、数字')
      return false
    } else if (this.companyName.length < 2 || this.companyName.length > 100) {
      toast('企业名称字数允许2-100个字')
      return false
    } else if (!reg.test(this.userName)) {
      toast('姓名仅支持中文、字母、数字')
      return false
    } else if (this.userName.length < 2 || this.userName.length > 100) {
      toast('姓名字数允许2-100个字')
      return false
    } else {
      return true
    }
  }

  // 去登录
  async goLogin() {
    const obj = {
      params: {
        isCloseWindow: true,
        refreshWindow: true
      }
    }
    await handleGoBack(obj)
  }

  // 查看广告主协议
  goAgreeMent() {
    this.$router
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
