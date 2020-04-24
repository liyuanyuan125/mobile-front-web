<template>
  <van-image
    :src="src"
    :error-icon="defaultImage"
    class="avatar"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Image } from 'vant'
import { AvatarType } from './types'

const assetsMap = {
  music: require('./assets/music.png'),
  brand: require('./assets/brand.png'),
  movie: require('./assets/movie.png'),
  tv: require('./assets/tv.png'),
  actor: require('./assets/actor.png'),
}

@Component({
  components: {
    [Image.name]: Image
  }
})
export default class Cover extends Vue {
  @Prop({ type: String, default: '' }) src!: string

  /** 预定义类型 */
  @Prop({ type: String, default: 'music' }) type!: AvatarType

  /** 明确的默认头像，若指定该字段，则 type 的值忽略 */
  @Prop({ type: String, default: '' }) default!: string

  get defaultImage() {
    const image = this.default  || assetsMap[this.type]
    return image
  }
}
</script>

<style lang="less" scoped>
.avatar {
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
