<template>
  <div class="compet-content">
    <div class="title">作品分析</div>
    <Movie v-if='movieAnalysis.length == 0' :data='movieAnalysis' />
    <Series v-if='tvAnalysis.length == 0' :data='tvAnalysis' />
    <Music v-if='musicAnalysis.length == 0' :data='musicAnalysis' />
    <Brand v-if='brandAnalysis.length == 0' :data='brandAnalysis' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue , Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'
import Movie from './movie.vue'
import Series from './series.vue'
import Music from './music.vue'
import Brand from './brand.vue'

@Component({
  components: {
    Icon,
    Movie,
    Series,
    Music,
    Brand,
  }
})
export default class Main extends Vue {
  @Prop({ type: Object, default: []}) worksAnalysis!: any

  movieAnalysis: any = this.worksAnalysis.movieAnalysis || {}
  tvAnalysis: any = this.worksAnalysis.tvAnalysis || {}
  musicAnalysis: any = this.worksAnalysis.musicAnalysis || {}
  brandAnalysis: any = this.worksAnalysis.brandAnalysis || {}



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
