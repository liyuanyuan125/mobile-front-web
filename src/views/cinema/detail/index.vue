<template>
  <div>
    <DataNull v-if="cinemaErr" />
    <div class="viewpage" v-if="detail && !cinemaErr">
      <div class="viewer">
        <div class="fixbar" :style="{opacity:scrollTop}">
          <TopBar
            :title="detail.cinemaInfo.cinemaName"
            :styleline="'background:#A0BBF9;box-shadow:0 0 20px rgba(111,131,153,.5)'"
            barColor="black"
          />
        </div>
        <TopBar barColor="black" />
        <CinemaInfo :cinemaInfo="detail.cinemaInfo" />
        <CinemaData :cinemaData="detail.cinemaData" />
        <WatchTimes :cinemaTrend="detail.viewPerson" />
        <CinemaPortrait :portrait="portrait" />
        <!-- <div class="joinplan">
        <button>加入投放</button>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopBar from '@/components/topBar'
import CinemaInfo from './components/cinemaInfo.vue'
import CinemaData from './components/cinemaData.vue'
import CinemaPortrait from './components/cinemaPortrait.vue'
import WatchTimes from './components/watchTimes.vue'
import { example } from './components/example'
import { getCinemaDetail, getCinemaDetailLogined } from '@/api/advertiser'
import { autoLogin } from '@/api/theater'
import { toast } from '@/util/toast'
import { setNavBarStatus } from '@/util/native'
import DataNull from '@/components/dataNull'

@Component({
  components: {
    TopBar,
    CinemaInfo,
    CinemaData,
    WatchTimes,
    CinemaPortrait,
    DataNull
  }
})
export default class CinemaDetail extends Vue {
  detail: any = null
  portrait: any = null
  cinemaId: string = ''
  scrollTop: number = 0
  cinemaErr: boolean = false
  isShowData: boolean = false // 是显示示例还是显示数据

  created() {
    const cid = this.$route.params.cinemaId
    this.cinemaId = cid
    this.getCinemaDetail(cid)
    document.body.style.background = '#FBFBFB'
  }

  // 隐藏导航
  async hideNavBarStatus(color: string) {
    const objectData = {
      isShowNavBar: false,
      statusBarColor: color
    }
    const obj = { params: objectData }
    await setNavBarStatus(obj)
  }

  mounted() {
    window.addEventListener('scroll', this.getScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.getScroll)
  }

  // 获取影院详情 10103
  async isLogin() {
    try {
      const res: any = await autoLogin({})
      if (res.code === 0) {
        return true
      } else {
        return false
      }
    } catch (ex) {
      toast(ex)
    }
  }

  // 获取未影院详情 10103
  async getCinemaDetail(cinemaId: string) {
    const login = await this.isLogin()
    try {
      let res: any
      if (login) {
        res = await getCinemaDetail({ cinemaId })
      } else {
        res = await getCinemaDetailLogined({ cinemaId })
      }
      if (res.code === 0) {
        this.detail = res.data
        this.isShowData = res.data.showData
        if (res.data.showData) {
          // 已认证的用户显示真实数据
          this.portrait = {
            userAges: res.data.userAges,
            userGender: res.data.userGender,
            userMarital: res.data.userMarital,
            consumePerfer: res.data.consumePerfer
          }
        } else {
          // 未验证用户显示示例
          this.portrait = {
            userAges: example.userAges,
            userGender: example.userGender,
            userMarital: example.userMarital,
            consumePerfer: example.consumePerfer
          }
        }
        this.hideNavBarStatus('#A0BBF9')
      } else {
        this.cinemaErr = true
        this.hideNavBarStatus('#FBFBFB')
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }

  // 监听滚动显示顶部导航
  getScroll() {
    const topNum =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    this.scrollTop = topNum > 0 ? 1 : 0
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
