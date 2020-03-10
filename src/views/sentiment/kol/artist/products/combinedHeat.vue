<template>
  <div class='main'>
      <!-- <div class='title'>综合热度对比</div> -->
       <selectTime ref="reftimes"/>
       <LineGraph :lineData="lineDatas" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import LineGraph from '@/components/charts/hots/index.vue'
import selectTime from '@/components/charts/hots/selectTime.vue'


@Component({
  components: {
    LineGraph,
    selectTime
  }
})
export default class KolPage extends ViewBase {
  lineDatas = {
    title: '综合热度对比',
    xDate: ['01-05', '01-05', '01-05', '01-05', '01-10', '01-15', '01-20'],
    yDate: [
      {
        data: [80, 932, 901, 934, 1290, 130, 1320],
        name: '刘诗诗1'
      },
      {
        data: [820, 932, 901, 914, 1290, 130, 1320],
        name: '刘诗诗2'
      },
      {
        data: [100, 32, 901, 934, 1290, 1330, 120],
        name: '刘诗诗3'
      },
    ],
  }

}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  background: #fff;
  padding: 53px 30px;
}
.title {
  height: 34px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 34px;
  margin-top: 48px;
}
</style>
