<template>
  <div>
    <SentimentBar :attribute="topbar" />
    <BaseInfoArea :baseInfo="movieInfo" :overView="movieOverView" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import BaseInfoArea from './components/movieInfo.vue'
// import hotLine from '@/components/hotLine'

@Component({
  components: {
    SentimentBar,
    BaseInfoArea
  }
})
export default class MoviePage extends ViewBase {
  // topbar
  topbar = {
    title: '流浪地球',
    diggShow: true,
    pkShow: true
  }
  movieInfo = {
    movieNameCn: '流浪地球',
    movieNameEn: 'The Wandering Earth',
    coverUrl: {
      url:
        'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg',
      source: 'piaoshen'
    },
    duration: '115分钟',
    genreName: '剧情 / 喜剧',
    releaseDate: '2020-02-22 中国大陆上映',
    movieId: '100038',
    favorable: 'B+'
  }
  movieOverView = {
    heatRanking: 'NO.125',
    commnetTrend: 121344,
    commentCount: '1,324',
    materialsTrend: -132332,
    materialsCount: '1,213.3万',
    heatTrend: 0
  }
}
</script>

<style lang="less" scoped>
</style>
