<template>
  <div class="viewpage">
    <GetMobile :changePage="changePage" v-show="stepOne" :guestShow="guestShow" />
    <VerifyCode :changePage="changePage" v-show="stepSec" :pageOn="stepSec" />
    <SetPassWord :changePage="changePage" v-show="stepThr" />
    <SuccessPage :changePage="changePage" v-show="stepFor" :guestShow="guestShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import GetMobile from './components/getMobile.vue'
import VerifyCode from './components/verifyCode.vue'
import SetPassWord from './components/setPassWord.vue'
import SuccessPage from './components/success.vue'
import { submitApplicationInfo } from '@/api/theater'
import { toast } from '@/util/toast'

@Component({
  components: {
    GetMobile,
    VerifyCode,
    SetPassWord,
    SuccessPage
  }
})
export default class Application extends Vue {
  stepOne: boolean = true
  stepSec: boolean = false
  stepThr: boolean = false
  stepFor: boolean = false
  guestShow: boolean = false

  created() {
    // bne9ska23akgpsoe1gl0
    const g: any = this.$route.query.g
    if (g) {
      this.guestShow = true
    }
  }

  // 切换页面
  changePage(page: number) {
    switch (page) {
      case 1:
        this.stepOne = false
        this.stepSec = true
        break
      case 2:
        this.stepSec = false
        this.stepThr = true
        break
      case 3:
        this.stepThr = false
        this.stepFor = true
        break
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./less/main.less');
</style>