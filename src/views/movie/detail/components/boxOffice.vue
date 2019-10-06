<template>
  <div class="boxoffice">
    <dl>
      <dd>
        <p>
          <b>67.2</b>万
        </p>
        <p class="desc">累计想看人数</p>
      </dd>
      <dd>
        <p>
          <b>67.2</b>万
        </p>
        <p class="desc">今日实时票房</p>
      </dd>
      <dd>
        <p>
          <b>67.2</b>亿
        </p>
        <p class="desc">累计票房</p>
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
export default class BoxOffice extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
