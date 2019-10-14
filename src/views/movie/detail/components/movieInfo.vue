<template>
  <div class="movieinfo">
    <div class="moviebox">
      <img :src="coverImg" :alt="movieInfo.movieNameCn" class="img" />
      <h3>{{movieInfo.movieNameCn}}</h3>
      <h5>{{movieInfo.movieNameEn}}</h5>
      <p>{{movieInfo.country}} {{genreName}}</p>
      <p>{{movieInfo.releaseDesc}}</p>
      <div class="exponentbox" v-if="movieInfo.score">
        <strong>{{movieInfo.score}}</strong>
        <p class="ques">鲸娱指数</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { imgProxy } from '@/fn/imgProxy'

@Component({
  components: {}
})
export default class MovieInfo extends ViewBase {
  @Prop({ type: Object }) movieInfo!: any

  coverImg: string = ''
  genreName: string = '' // 电影类型

  mounted() {
    // 处理封面图
    const coverUrl = this.movieInfo.coverUrl
    if (coverUrl.type == 'piaoshen') {
      this.coverImg = coverUrl.url ? imgProxy(coverUrl.url, 160, 210) : ''
    } else {
      this.coverImg = coverUrl.url
    }
    // 处理电影类型
    const genre = this.movieInfo.genreNameList
    const genreList = []
    if (genre.length) {
      for (const item of genre) {
        genreList.push(item.genreName)
      }
      const bias = this.movieInfo.country ? ' / ' : ''
      this.genreName = bias + genreList.join(' / ')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
