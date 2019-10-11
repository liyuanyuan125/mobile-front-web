<template>
  <div class="viewpage" v-if="detail">
    <div class="viewer">
      <TopBar />
      <CinemaInfo :cinemaInfo="detail.cinemaInfo" />
      <CinemaData :cinemaData="detail.cinemaData" />
      <CinemaPortrait :portrait="portrait" />
      <div class="joinplan">
        <button>加入投放</button>
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
import { getCinemaDetail } from '@/api/advertiser'
import { toast } from '@/util/toast'

@Component({
  components: {
    TopBar,
    CinemaInfo,
    CinemaData,
    CinemaPortrait
  }
})
export default class CinemaDetail extends Vue {
  detail: any = null
  portrait: any = null
  cinemaId: string = ''

  beforeMount() {
    const cid = this.$route.params.cinemaId
    this.cinemaId = cid
    this.getCinemaDetail(cid)
    document.body.style.background = '#FBFBFB'
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
      } else {
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
