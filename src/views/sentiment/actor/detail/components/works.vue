<template>
  <div class="compet-content" >
    <ModuleHeader title="作品分析" :link="(Object.keys(worksAnalysis).length > 0 && (Object.keys(movieAnalysis).length > 0 || Object.keys(tvAnalysis).length > 0 || Object.keys(musicAnalysis).length > 0 || Object.keys(brandAnalysis).length > 0)) ? link : null" />
    <Movie v-if='Object.keys(worksAnalysis).length > 0 && Object.keys(movieAnalysis).length > 0' :data='movieAnalysis' />
    <Series v-if='Object.keys(worksAnalysis).length > 0 && Object.keys(tvAnalysis).length > 0' :data='tvAnalysis' />
    <Music v-if='Object.keys(worksAnalysis).length > 0 && Object.keys(musicAnalysis).length > 0' :data='musicAnalysis' />
    <Brand v-if='Object.keys(worksAnalysis).length > 0 && Object.keys(brandAnalysis).length > 0' :data='brandAnalysis' />
    <dataEmpty v-if='Object.keys(worksAnalysis).length == 0 || (Object.keys(brandAnalysis).length == 0 && Object.keys(movieAnalysis).length == 0 && Object.keys(tvAnalysis).length == 0 && Object.keys(musicAnalysis).length == 0 )' />
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
import dataEmpty from '@/views/common/dataEmpty/index.vue'



@Component({
  components: {
    Icon,
    Movie,
    Series,
    Music,
    Brand,
    ModuleHeader,
    dataEmpty
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
  padding: 40px 30px 10px;
}

</style>
