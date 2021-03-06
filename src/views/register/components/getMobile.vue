<template>
  <div class="wrap">
    <p class="tit">入驻申请</p>
    <div class="gologin" v-if="!guestShow">
      已有帐号？
      <i @click.stop="goLogin">立即登录</i>
    </div>
    <!-- <div class="radiobox">
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
    </div>-->
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
            placeholder="姓名 (中文、字母、数字,2~50字)"
            v-on:input="changeBtnStatus"
            :disabled="guestShow"
          />
          <i class="del" v-show="userName.length && !guestShow" @click="clearTxt('userName')"></i>
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
            :disabled="guestShow"
          />
          <i class="del" v-show="userMobile.length  && !guestShow" @click="clearTxt('userMobile')"></i>
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
            :disabled="guestShow"
          />
          <i
            class="del"
            v-show="recommendMobile.length  && !guestShow"
            @click="clearTxt('recommendMobile')"
          ></i>
        </div>
      </dd>
      <dt>
        <i @click.stop="changeAgreeStatus" :class="{checked:isAgree}"></i>
        <span @click.stop="changeAgreeStatus">已阅读并同意</span>
        <a @click.stop="changeAgreeStatus">《入驻协议》</a>
      </dt>
    </dl>
    <div class="agreement" v-show="isShowAgree">
      <div class="outer">
        <div class="inner" ref="inner">
          <div ref="ment">
            <Agreement />
          </div>
        </div>
        <div class="chargebtn">
          <button :disabled="disabledAgree" @click="changeAgree">已阅读并同意</button>
        </div>
      </div>
    </div>
    <div class="subbuttonbox">
      <button :class="{disabled:!btnStatus}" @click="getVerifyCode" :disabled="doubleClick">获取验证码</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { validataTel } from '@/fn/validateRules'
import { isJyApp } from '@/fn/ua'
import {
  setRequestId,
  setUserType,
  setCompanyName,
  setUserName,
  setUserMobile,
  setRecommendPhone,
  setGuestId
} from '../store'
import { handleUploadImage } from '@/util/native'
import { getSmsCode, getGuestInfo } from '@/api/theater'
import { toast } from '@/util/toast'
import { handleGoBack } from '@/util/native'
import Agreement from '../../help/agreement/index.vue'

@Component({
  components: {
    Agreement
  }
})
export default class GetMobile extends ViewBase {
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>
  @Prop({ type: Boolean }) guestShow!: boolean

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
  userType: string = '1' // 注册类型 1=公司 2=个人
  companyName: string = '' // 公司名称
  userName: string = '' // 用户名称
  userMobile: string = '' // 用户手机号
  recommendMobile: string = '' // 推荐人手机号
  isAgree: boolean = false // 是否同意用户协议
  btnStatus: boolean = false
  disabledAgree: boolean = true
  isShowAgree: boolean = false
  doubleClick: boolean = false // 防止用户双击

  created() {
    const agree = this.$route.hash
    if (agree == '#agreement') {
      this.isAgree = true
    }
    // 是否是从crm后台过来的
    if (this.guestShow) {
      const g: any = this.$route.query.g
      this.getGuest(g)
      this.guestShow = true
    }
  }

  mounted() {
    // 处理用户合约
    const inner: any = this.$refs.inner
    inner.addEventListener('scroll', this.agreeScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.agreeScroll)
  }

  // 计算弹出框是否滚到底
  agreeScroll() {
    const inner: any = this.$refs.inner
    const ment: any = this.$refs.ment
    const innerTop = inner.scrollTop // 滚动的位置
    const innerHeight = inner.offsetHeight // 外层的高度
    const mentHeight = ment.offsetHeight // 内容的高度
    if (innerTop + 100 > mentHeight - innerHeight) {
      this.disabledAgree = false
    }
  }
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
    // 当切换了类型后，重新监听一下数据
    this.changeBtnStatus()
    // 如果是个人时，将公司名称清空
    if (idx === '2') {
      this.companyName = ''
    }
  }

  // 是否同意用户协议
  changeAgreeStatus() {
    if (this.isAgree === false) {
      this.isShowAgree = true
    } else {
      this.isAgree = !this.isAgree
      this.changeBtnStatus()
    }
  }

  // 已阅读并同意用户协议
  changeAgree() {
    this.isShowAgree = false // 关闭弹框
    this.isAgree = !this.isAgree // 勾选复选框
    this.changeBtnStatus()
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

  // 根据密文获取用户信息
  async getGuest(uid: string) {
    try {
      const res = await getGuestInfo({ uid })
      if (res.code == 0) {
        this.userName = res.data.guestContactName
        this.userMobile = res.data.guestMobile
        this.companyName = res.data.guestCompanyName
        this.recommendMobile = res.data.businessMobile
        setRequestId(res.data.requestId)
        setUserType(this.userType)
        setUserName(this.userName)
        setUserMobile(this.userMobile)
        setRecommendPhone(this.recommendMobile)
        setCompanyName(this.companyName)
        setGuestId(res.data.guestId)
      } else {
        toast(res.msg)
        // setTimeout(async () => {
        //   await this.goLogin()
        // }, 1500)
      }
    } catch (ex) {
      this.handleError(ex)
    }
  }

  // 获取验证码
  async getVerifyCode() {
    this.doubleClick = true
    if (!this.btnStatus) {
      return
    }
    if (!this.chectkInfo()) {
      return
    } else {
      try {
        const res = await getSmsCode({
          phoneNum: this.userMobile,
          requestType: 1, // 1:注册   2:修改密码
          companyName: this.companyName
        })
        // 0 ===获取验证码成功
        // 1 ===获取验证码失败
        if (res.code == 0) {
          this.doubleClick = false
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
          if (res.code === 8007228 && isJyApp()) {
            // 已注册并且是在 app 里，返回登录页
            setTimeout(async () => {
              await this.goLogin()
            }, 1500)
          }
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
    if (this.userType === '1') {
      if (!reg.test(this.companyName)) {
        toast('企业名称仅支持中文、字母、数字')
        return false
      } else if (this.companyName.length < 2 || this.companyName.length > 100) {
        toast('企业名称字数允许2-100个字')
        return false
      }
    }
    if (this.userName.length < 2 || this.userName.length > 50) {
      toast('姓名字数允许2-50个字')
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
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
