<template>
  <van-image
    :src="src"
    :error-icon="defaultImage"
    class="cover"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Image } from 'vant'

@Component({
  components: {
    [Image.name]: Image
  }
})
export default class Cover extends Vue {
  @Prop({ type: String, default: '' }) src!: string

  defaultImage = require('./assets/default.png')
}
</script>

<style lang="less" scoped>
.cover {
  width: 100%;
  height: 100%;
  /deep/ .van-image__error {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
