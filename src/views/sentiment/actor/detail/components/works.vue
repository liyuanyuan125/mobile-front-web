<template>
  <div class="compet-content">
    <div class="title">作品分析</div>
    <Movie />
    <Series />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'
import Movie from './movie.vue'
import Series from './series.vue'

@Component({
  components: {
    Icon,
    Movie,
    Series,
  }
})
export default class Main extends Vue {

  movieList: any = null

  mounted() {
    this.getMovieList()
  }

  async getMovieList() {
    // console.log('1')
  }

}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';

.compet-content {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 60px 30px 10px;
}

</style>
