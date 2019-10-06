<template>
  <div class="movieinfo">
    <div class="moviebox">
      <img
        src="http://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/bm4s9v3lqfo000804kc0.jpg"
        alt="电影名称"
        class="img"
      />
      <h3>小小的愿望</h3>
      <h5>The Last Wish</h5>
      <p>中国大陆 / 剧情 / 喜剧</p>
      <p>2019-09-12 中国大陆上映</p>
      <div class="exponentbox">
        <strong>64.43</strong>
        <p class="ques">鲸娱指数</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class MovieInfo extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
