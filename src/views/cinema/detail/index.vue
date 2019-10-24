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
import { getCinemaDetail } from '@/api/advertiser'
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

  // 获取报告详情 10103
  async getCinemaDetail(cinemaId: string) {
    try {
      const res: any = await getCinemaDetail({ cinemaId })
      if (res.code === 0) {
        this.detail = res.data
        this.portrait = {
          userAges: res.data.userAges,
          userGender: res.data.userGender,
          userMarital: res.data.userMarital,
          consumePerfer: res.data.consumePerfer
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
