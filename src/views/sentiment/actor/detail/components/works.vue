<template>
  <div class="compet-content">
    <ModuleHeader title="作品分析" :link="link" />
    <Movie v-if='movieAnalysis.movieCount' :data='movieAnalysis' />
    <Series v-if='tvAnalysis.tvCount' :data='tvAnalysis' />
    <Music v-if='musicAnalysis.musicCount' :data='musicAnalysis' />
    <Brand v-if='brandAnalysis.brandCount' :data='brandAnalysis' />
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
import ModuleHeader from '@/components/moduleHeader'


@Component({
  components: {
    Icon,
    Movie,
    Series,
    Music,
    Brand,
    ModuleHeader
  }
})
export default class Main extends Vue {
  @Prop({ type: Object, default: []}) worksAnalysis!: any
  @Prop({ type: Object }) link!: any

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
