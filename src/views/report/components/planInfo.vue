<template>
  <div class="userinfo">
    <div class="userbox">
      <img v-if="companyLogo" :src="companyLogo" :alt="planInfo.planName" class="img" />
      <img v-if="!companyLogo" src="../assets/default.png" :alt="planInfo.planName" class="img" />
      <h3>{{planInfo.planName}}</h3>
      <p>{{planInfo.videoName}} | {{planInfo.videoLength}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class BaseInfo extends ViewBase {
  @Prop({ type: Object }) planInfo!: any

  companyLogo: string = ''

  mounted() {
    const url = this.planInfo.companyLogo.url
    this.companyLogo = url
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
