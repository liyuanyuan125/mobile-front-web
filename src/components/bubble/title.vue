<template>
  <div
    v-bind="$attrs"
    v-on="$listeners"
    class="title">
      <div class="title-more" v-if="title.length >= 8">
        <div>
          <p>{{title.substring(0, 4)}}</p>
          <p>{{title.substring(4, title.length)}}</p>
        </div>
        <i :class="`iconfont icon-${type}`"></i>
      </div>
      <div v-else>
        {{title}}<i :class="`iconfont icon-${type}`"></i>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Title extends Vue {
  @Prop({ default: '' }) title!: string

  @Prop({ default: 'wenhao'}) type!: string

}
</script>

<style lang="less" scoped>
@import '../../assets/iconfont/iconfont.less';
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  i {
    width: 24px;
    color: #fff;
  }
  .title-more {
    display: flex;
    align-items: flex-end;
  }
}


</style>
