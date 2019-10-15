<template>
  <div class="viewpage" v-if="detail">
    <div class="viewer">
      <div class="fixbar" :style="{opacity:scrollTop}">
        <TopBar :title="detail.movieInfo.movieNameCn" :styleline="'background:#60a3e9'" />
      </div>
      <TopBar />
      <MovieInfo :movieInfo="detail.movieInfo" />
      <BoxOffice :movieData="detail.movieData" :hasShowTime="hasShowTime" />
      <WatchTimes
        :viewData="detail.viewPerson"
        :wantSeeData="detail.wantSeePerson"
        :hasShowTime="hasShowTime"
      />
      <UserPortrait :userAges="detail.userAges" :userGender="detail.userGender" />
      <ChiefPeople :chiefData="detail.chiefPeople" />
      <!-- <canvas id="myCanvas" width="10" height="10" />
      <ul>
        <li v-for="(item,index) in rgbArr" :key="index" :style="{background: 'rgba('+item+')'}">
          <img
            src="http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg"
          />
          复仇者联盟
        </li>
      </ul>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopBar from '@/components/topBar'
import MovieInfo from './components/movieInfo.vue'
import BoxOffice from './components/boxOffice.vue'
import WatchTimes from './components/watchTimes.vue'
import UserPortrait from './components/userPortrait.vue'
import ChiefPeople from './components/chiefPeople.vue'
import { getMovieDetail } from '@/api/advertiser'
import { toast } from '@/util/toast'

@Component({
  components: {
    TopBar,
    MovieInfo,
    BoxOffice,
    WatchTimes,
    UserPortrait,
    ChiefPeople
  }
})
export default class MovieDetail extends Vue {
  backgroundRGA: string = ''
  rgbArr: any = []
  detail: any = null
  movieId: string = ''
  hasShowTime: boolean = true
  scrollTop: number = 0

  mounted() {
    window.addEventListener('scroll', this.getScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.getScroll)
  }

  beforeMount() {
    const mid = this.$route.params.movieId
    this.movieId = mid
    this.getMovieDetail(mid)
    document.body.style.background = '#FBFBFB'
  }

  // 获取电影资料
  async getMovieDetail(movieId: string) {
    try {
      const res: any = await getMovieDetail({ movieId })
      if (res.code === 0) {
        this.detail = res.data
        this.hasShowTime = res.data.movieInfo.isShowTime
      } else {
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }

  // 监听滚动显示顶部导航
  getScroll() {
    // this.indexNumTop = $('#index_num').offset().top
    const topNum =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    this.scrollTop = topNum > 0 ? 1 : 0
    // if (topNum > 100) {
    //   window.removeEventListener('scroll', this.getScroll)
    // } else {
    //   window.addEventListener('scroll', this.getScroll)
    // }
  }

  getRGBList() {
    const c: any = document.getElementById('myCanvas')
    const ctx = c.getContext('2d')
    const img = new Image()
    img.crossOrigin = ''
    img.src =
      'http://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/bm4s9v3lqfo000804kc0.jpg'
    // img.src =
    //   'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg'

    img.onload = () => {
      // 将图片画到canvas上面上去！
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const imgData = ctx.getImageData(0, 0, 5, 5).data
      const rgba = []
      for (let i = 0; i < imgData.length; i += 4) {
        const colorItem = imgData.slice(i, i + 4)
        const formated = this.formatColor(colorItem)
        this.rgbArr.push(formated)
      }
    }
  }

  formatColor(rgba: any) {
    let formater
    if (rgba.length) {
      const newRgb = []
      for (let item of rgba) {
        if (item > 200) {
          item = item / 2
          newRgb.push(item)
        } else {
          newRgb.push(item)
        }
      }
      formater = newRgb
    }
    return formater
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
