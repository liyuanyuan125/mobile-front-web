<template>
  <div class="statistics">
    <dl>
      <dd>
        <p>
          <b>67.2</b>
        </p>
        <p class="desc">曝光人次 (千)</p>
      </dd>
      <dd>
        <p>
          <b>67.2</b>
        </p>
        <p class="desc">曝光场次</p>
      </dd>
      <dd>
        <p>
          <b>67.2</b>
        </p>
        <p class="desc">支出金额 (万)</p>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class Statistics extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
