<template>
  <div class="home">
    <div class="loading" v-if="loading">加载中</div>
    <div class="img-box" v-if="imageUrl">
      <img :src="imageUrl">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { post } from '@/fn/ajax'
import ViewBase from '@/util/ViewBase'

@Component
export default class Home extends ViewBase {
  loading = false

  imageUrl = ''

  async mounted() {
    this.loading = true
    try {
      const { data } = await post('/captcha/images')
      this.imageUrl = data.imageCaptcha.url
    } catch (ex) {
      this.handleError(ex)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  margin-top: 28px;
}
</style>
