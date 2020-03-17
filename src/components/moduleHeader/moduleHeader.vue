<template>
  <component :is="tag" class="module-header">
    <em class="module-title">{{title}}</em>
    <span class="module-more" v-if="link" @click="handleMore">
      <i class="more-text" v-if="moreText">{{moreText}}</i>
      <Icon name="arrow" size="20" class="more-icon"/>
    </span>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'
import { openAppLink, AppLink } from '@/util/native'
import { RawLocation } from 'vue-router'

@Component({
  components: {
    Icon
  }
})
export default class ModuleHeader extends Vue {
  /** 标题，默认空 */
  @Prop({ type: String, default: '' }) title!: string

  /** H5 页面链接，默认空 */
  @Prop({ type: [ String, Object ], default: '' }) link!: RawLocation | AppLink

  /** html 标签，默认 h3 */
  @Prop({ type: String, default: 'h3' }) tag!: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  /** 更多文字，默认空 */
  @Prop({ type: String, default: '' }) moreText!: string

  handleMore() {
    const link = this.link as any
    if (link != null) {
      // 含有 page 值的被认为是 AppLink
      const isAppLink = typeof link.page === 'string'
      isAppLink ? openAppLink(link) : this.$router.push(link)
    }
  }
}
</script>

<style lang="less" scoped>
.module-header {
  position: relative;
  display: flex;
  line-height: 40px;
}

.module-title {
  font-size: 40px;
  font-weight: 500;
  flex: 1;

  h4.module-header & {
    font-size: 30px;
  }
}

.more-text {
  position: relative;
  top: 2px;
  vertical-align: top;
  color: #8f8f8f;
  font-size: 26px;
  font-weight: 400;
}

.more-icon {
  color: #c8c6c4;
}
</style>
