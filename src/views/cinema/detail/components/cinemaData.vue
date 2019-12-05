<template>
  <div class="cinemadata">
    <dl>
      <dd>
        <b>{{cinemaData.hallCountShow ? cinemaData.hallCountShow : '-'}}</b>
        <p class="desc">影厅数</p>
      </dd>
      <dd>
        <b>{{cinemaData.seatCountShow ? cinemaData.seatCountShow : '-'}}</b>
        <p class="desc">座位数</p>
      </dd>
      <dd>
        <b>{{cinemaData.showPerson ? cinemaData.showPerson : '-'}}</b>
        <p class="desc">近30天日均人次</p>
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
export default class CinemaData extends ViewBase {
  @Prop({ type: Object }) cinemaData!: any
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
