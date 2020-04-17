<template>
  <component :is="tag" class="module-header">
    <em class="module-title">{{title}}</em>

    <Tip :text="tip" :size="tipSize" class="module-tip" v-if="tip"/>

    <span class="module-more" @click="handleMore" v-if="link">
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
import Tip from '@/components/tip'

const tipSizeMap = {
  h1: 20,
  h2: 20,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 16,
}

@Component({
  components: {
    Icon,
    Tip
  }
})
export default class ModuleHeader extends Vue {
  /** 标题，默认空 */
  @Prop({ type: String, default: '' }) title!: string

  /** 提示文字，默认空 */
  @Prop({ type: String, default: '' }) tip!: string

  /** H5 页面链接，默认空 */
  @Prop({ type: [ String, Object ], default: '' }) link!: RawLocation | AppLink

  /** html 标签，默认 h3 */
  @Prop({ type: String, default: 'h3' }) tag!: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  /** 更多文字，默认空 */
  @Prop({ type: String, default: '' }) moreText!: string

  get tipSize() {
    const size = tipSizeMap[this.tag]
    return size
  }

  handleMore() {
    const link = this.link as any
    if (link) {
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
  align-items: center;
  height: 44px;
  line-height: 44px;
}

.module-title {
  font-size: 40px;
  font-weight: 400;

  h4.module-header & {
    font-size: 32px;
  }
}

.module-tip {
  position: relative;
  opacity: .5;
  vertical-align: top;
}

.module-more {
  flex: 1;
  text-align: right;
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
  position: relative;
  top: 5px;
  color: #c8c6c4;
}
</style>
