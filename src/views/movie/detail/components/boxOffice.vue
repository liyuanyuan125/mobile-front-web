<template>
  <div class="boxoffice">
    <dl v-if="hasShowTime">
      <dd>
        <p>
          <b>{{movieData.wantSeeShow}}</b>
        </p>
        <p class="desc">累计想看人数{{movieData.wantSeeShowUnit ? `(${movieData.wantSeeShowUnit})` : ''}}</p>
      </dd>
      <dd>
        <p>
          <b>{{movieData.realTimeBoxOffice}}</b>
        </p>
        <p
          class="desc"
        >今日实时票房{{movieData.realTimeBoxOfficeUnit ? `(${movieData.realTimeBoxOfficeUnit})` : ''}}</p>
      </dd>
      <dd>
        <p>
          <b>{{movieData.totalBoxOffice}}</b>
        </p>
        <p
          class="desc"
        >累计票房{{movieData.totalBoxOfficeUnit ? `(${movieData.totalBoxOfficeUnit})` : ''}}</p>
      </dd>
    </dl>
    <dl v-if="!hasShowTime">
      <dd>
        <p>
          <b>{{movieData.wantSeeShow}}</b>
        </p>
        <p class="desc">累计想看人数{{movieData.wantSeeShowUnit ? `(${movieData.wantSeeShowUnit})` : ''}}</p>
      </dd>
      <dd>
        <p>
          <b>{{movieData.newWantSeeShow}}</b>
        </p>
        <p
          class="desc"
        >昨日新增想看人数{{movieData.newWantSeeShowUnit ? `(${movieData.newWantSeeShowUnit})` : ''}}</p>
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
