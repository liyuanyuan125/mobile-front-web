<template>
  <div class="download" ref="downloabox">
    <div class="flexone">
      <div class="logo"></div>
      <div class="formdata">
        <dl>
          <dd>
            <div class="inputctrl">
              <input
                class="text"
                type="number"
                v-model="userMobile"
                placeholder="请输入手机号"
                oninput="if(value.length > 11)value = value.slice(0, 11)"
                ref="getPhoneNumber"
                pattern="[0-9]*"
              />
            </div>
          </dd>
          <dd>
            <div class="codewrap">
              <div class="inputctrl" style="width:50%">
                <input
                  class="text"
                  ref="verifyVal"
                  type="number"
                  pattern="[0-9]*"
                  v-model="code"
                  placeholder="请输入验证码"
                  oninput="if(value.length > 6)value = value.slice(0, 6)"
                  onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))&&(/[^+-.*]/.test(event.key))"
                  @keyup="butLight"
                />
              </div>
              <button
                class="codebtn"
                :disabled="again"
                @click="getSmsCode"
              >{{this.again ? `${this.time}s后重发`:codeMsg}}</button>
            </div>
          </dd>
          <dd>
            <button class="sub" @click="checkSmsCode">立即获取APP</button>
          </dd>
        </dl>
      </div>
    </div>
    <div class="flexsec">
      <div class="bg"></div>
    </div>
    <div class="sharetip" v-show="isShowWX" @click="closeWX"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getDLSmsCode, checkDLSmsCode, submitDLSmsCode } from '@/api/advertiser'
import { validataTel } from '@/fn/validateRules'
import { toast } from '@/util/toast'

@Component({
  components: {}
})
export default class DownloadCinema extends Vue {
  isShowWX: boolean = false
  dlUrl: string = ''
  timer: any = null
  userMobile: string = '' // 用户手机号
  code: string = '' // 验证码
  guid: string = ''
  codeMsg: string = '获取验证码'
  uid: any = ''
  time: any = 60 // 倒计时
  again: boolean = false // 是否重新发送

  mounted() {
    document.title = '鲸鱼数据'
    document.documentElement.style.backgroundColor = '#A5BEF8'
    this.uid = this.$route.query.fromuid
    const dw: any = this.$refs.downloabox
    dw.style.minHeight = document.documentElement.clientHeight + 'px'
    const prd = location.href.indexOf('jydata') > -1
    if (prd) {
      const hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?b801b33c94b9bf63b69243906991f317'
      const s: any = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }
  }

  destroy() {
    clearInterval(this.timer)
  }

  // 获取验证码 getDLSmsCode
  async getSmsCode() {
    const checkMobile = validataTel(this.userMobile)
    if (!checkMobile) {
      try {
        const res = await getDLSmsCode({
          mobile: this.userMobile
        })
        if (res.code == 0) {
          this.guid = res.data
          // 验证码倒计时
          this.again = true
          this.timeFunc()
        } else {
          toast(res.msg)
        }
      } catch (ex) {
        throw ex
      }
    } else {
      toast('请输入正确的手机号')
    }
  }

  // 验证验证码 getDLSmsCode
  async checkSmsCode() {
    if (!this.code || this.code.length !== 6) {
      toast('请正确填写验证')
      this.getInputFocus()
    } else {
      try {
        const res = await checkDLSmsCode({
          mobile: this.userMobile,
          guid: this.guid,
          smsCode: this.code
        })
        if (res.code == 0) {
          // 提交log
          this.subGuestInfo()
        } else {
          toast(res.msg)
        }
      } catch (ex) {
        throw ex
      }
    }
  }

  // 提交验证信息
  async subGuestInfo() {
    try {
      const res = await submitDLSmsCode({
        mobile: this.userMobile,
        uid: this.uid
      })
      if (res.code == 0) {
        this.wxDownload()
      } else {
        toast(res.msg)
      }
    } catch (ex) {
      throw ex
    }
  }

  // 倒讲时
  timeFunc() {
    // 倒计时开始时，input 框就获取焦点
    this.getInputFocus()
    const init: any = '60'
    let t: any = init
    this.timer = setInterval(() => {
      if (t == 1) {
        this.again = false // 重新发送显示
        this.time = init // 显示时间重置
        clearInterval(this.timer)
      } else {
        t = t - 1
        this.time = t
      }
    }, 1000)
  }

  // 验证码框获取焦点
  getInputFocus() {
    const vfocus: any = this.$refs.verifyVal
    vfocus.focus()
  }

  butLight() {
    // this.button = !validataCode(this.value)
  }

  // 根据环境判断下载路径
  wxDownload() {
    const ua = navigator.userAgent.toLowerCase()
    const isWeixin = ua.indexOf('micromessenger') > -1
    const bIsAndroid = ua.indexOf('android') > -1 ? true : false
    if (bIsAndroid) {
      if (isWeixin) {
        this.isShowWX = true
      } else {
        location.href =
          'https://aiads-file.oss-cn-beijing.aliyuncs.com/APK/JyData_P_df_v1.0.2_release.apk'
      }
    } else {
      location.href = 'https://itunes.apple.com/cn/app/id1478240682?mt=8'
    }
  }

  // 关闭微信弹框
  closeWX() {
    this.isShowWX = !this.isShowWX
  }
}
</script>

<style lang="less" scoped>
.download {
  background: url('./assets/adbg.jpg') no-repeat center 0 #a5bef8;
  background-size: contain;
  display: flex;
  flex-direction: column;

  .flexone {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    height: 735px;

    .logo {
      background: url('./assets/adlogo.png') no-repeat center 0;
      background-size: auto 100%;
      height: 120px;
      width: 100%;
    }

    .formdata {
      width: 100%;
      dl {
        padding: 0 95px;
      }
      dd {
        width: 100%;
        margin-top: 35px;
      }
      .sub {
        background: #3757ad;
        line-height: 100px;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 34px;
        border-radius: 50px;
      }
    }
  }

  .flexsec {
    .bg {
      background: url('./assets/demo.png') no-repeat center 0;
      background-size: auto 595px;
      height: 595px;
      position: relative;
      &::after {
        background-image: linear-gradient(rgba(165, 190, 248, 0), #a5bef8);
        width: 100%;
        height: 180px;
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }
}
.inputctrl {
  background: #fff;
  position: relative;
  border: #8aa9ef 4px solid;
  box-sizing: content-box;
  border-radius: 50px;
  padding: 0 31px;

  .text {
    background: none;
    width: 100%;
    height: 30px;
    font-size: 30px;
    color: #404d66;
    padding: 31px 0;
  }

  .text::-webkit-input-placeholder {
    color: #afbed4;
    opacity: 0.5;
    line-height: normal;
  }

  .text[disabled] {
    opacity: 0.5;
  }

  .del {
    position: absolute;
    top: 50%;
    right: 0;
    width: 30px;
    height: 30px;
    background-size: 100%;
    margin-top: -15px;
  }
}
.codewrap {
  display: flex;
}
.codebtn {
  background: #a5bef8;
  border: 4px solid #3656ac;
  display: block;
  color: #3757ad;
  font-size: 30px;
  border-radius: 50px;
  line-height: 92px;
  width: 230px;
  text-align: center;
  margin-left: 15px;
}
.codebtn[disabled] {
  opacity: 0.5;
}
</style>
