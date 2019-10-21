<template>
  <div class="movieinfo">
    <div class="moviebox">
      <img :src="coverImg" :alt="movieInfo.movieNameCn" class="img" />
      <img
        src="@/assets/person-default.png"
        :alt="movieInfo.movieNameCn"
        v-if="!coverImg"
        class="img"
      />
      <h3>{{movieInfo.movieNameCn}}</h3>
      <h5>{{movieInfo.movieNameEn}}</h5>
      <p>{{movieInfo.country}} {{genreName}}</p>
      <p>{{movieInfo.releaseDesc}}</p>
      <div class="exponentbox" v-if="movieInfo.score">
        <strong>{{movieInfo.score}}</strong>
        <p class="ques" @click="showNote">鲸鱼指数</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { imgProxy } from '@/fn/imgProxy'
import { alert } from '@/util/toast'

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
    if (coverUrl.source == 'piaoshen') {
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

  // 显示说明
  showNote() {
    alert({
      title: '关于鲸鱼指数',
      message:
        '影片在一定周期内的综合表现指标，由想看数/票房，口碑，全网资讯量及讨论，搜索等互动量加权计算得出',
      showConfirmButton: true
    })
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
