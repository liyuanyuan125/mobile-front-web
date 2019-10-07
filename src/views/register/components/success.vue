<template>
  <div class="regsuccess" ref="successbox">
    <div class="flexone">
      <div class="bgbox">
        <div class="textbox">
          <h4>注册成功</h4>
          <p>
            完善信息,我们将为您推荐更适
            <br />合的广告投放方案.
          </p>
        </div>
      </div>
    </div>
    <div class="flexsec">
      <div>
        <button>完善信息</button>
        <button class="holdon">稍后再说</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { handleUploadImage } from '@/util/native'

@Component
export default class SuccessPage extends ViewBase {
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>
  mounted() {
    const exp: any = this.$refs.successbox
    exp.style.height = document.body.clientHeight + 'px'
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
