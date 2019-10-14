<template>
  <div class="boxoffice">
    <dl v-if="hasShowTime">
      <dd>
        <p>
          <b>{{movieData.wantSeeShow}}</b>
          {{movieData.wantSeeShowUnit}}
        </p>
        <p class="desc">累计想看人数</p>
      </dd>
      <dd>
        <p>
          <b>{{movieData.realTimeBoxOffice}}</b>
          {{movieData.realTimeBoxOfficeUnit}}
        </p>
        <p class="desc">今日实时票房</p>
      </dd>
      <dd>
        <p>
          <b>{{movieData.totalBoxOffice}}</b>
          {{movieData.totalBoxOfficeUnit}}
        </p>
        <p class="desc">累计票房</p>
      </dd>
    </dl>
    <dl v-if="!hasShowTime">
      <dd>
        <p>
          <b>{{movieData.wantSeeShow}}</b>
          {{movieData.wantSeeShowUnit}}
        </p>
        <p class="desc">累计想看人数</p>
      </dd>
      <dd>
        <p>
          <b>{{movieData.newWantSeeShow}}</b>
          {{movieData.newWantSeeShowUnit}}
        </p>
        <p class="desc">昨日新增想看人数</p>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class BoxOffice extends ViewBase {
  @Prop({ type: Object }) movieData!: any
  @Prop({ type: Boolean }) hasShowTime!: boolean
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
