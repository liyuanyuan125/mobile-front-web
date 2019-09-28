<template>
  <div class="viewpage">
    <div class="viewer">
      <TopBar />
      <UserInfo />
      <PutProgress />
      <Statistics />
      <DataTrend />
      <DataTotal />
      <UserStatus />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopBar from '@/components/topBar'
import UserInfo from './components/userInfo.vue' // 用户信息
import Statistics from './components/statistics.vue' // 数据统计
import PutProgress from './components/putProgress.vue' // 投放进度
import DataTrend from './components/dataTrend.vue' // 数据趋势
import DataTotal from './components/dataTotal.vue' // 影院和电影统计
import UserStatus from './components/userStatus.vue' // 年龄和性别占比

@Component({
  components: {
    TopBar,
    UserInfo,
    PutProgress,
    Statistics,
    DataTrend,
    DataTotal,
    UserStatus
  }
})
export default class ResultReport extends Vue {
  backgroundRGA: string = ''
  rgbArr: any = []

  mounted() {
    // this.getRGBList()
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
    // img.src =
    //   'https://picagent.piaoshen.com/picture/cut_picture?uri=http%3A%2F%2Fpiaoshen.oss-cn-beijing.aliyuncs.com%2Fimages%2Fmovie%2F2019%2F05%2F06%2F190506000002357372.jpg&width=200&height=300&clipType=4'
    img.onload = () => {
      // 将图片画到canvas上面上去！
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const imgData = ctx.getImageData(0, 0, 5, 5).data
      const rgba = []
      for (let i = 0; i < imgData.length; i += 4) {
        const colorItem = imgData.slice(i, i + 4)
        const formated = this.formatColor(colorItem)
        this.rgbArr.push(formated)
        console.log(imgData, this.rgbArr)
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
