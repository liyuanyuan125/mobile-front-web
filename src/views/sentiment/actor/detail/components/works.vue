<template>
  <div class="compet-content">
    <div class="title">作品分析</div>
    <Movie :data='worksAnalysis.data.movieAnalysis' />
    <Series :data='worksAnalysis.data.tvAnalysis' />
    <Music :data='worksAnalysis.data.musicAnalysis' />
    <Brand :data='worksAnalysis.data.brandAnalysis' />
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
  @Prop({ type: Array, default: []}) worksAnalysis!: any

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
