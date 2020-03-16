<template>
  <div class='main'>
    <div style='padding-bottom: 50px;border-bottom: 1px solid rgba(216, 216, 216, 1);'>
       <selectTime ref="reftimes" :days="chgdays"/>
       <LineGraph style='margin-top: 30px;' :lineData="lineDatas" />
    </div>
      
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
  chgdays: any = 'last_7_day'
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
  padding-bottom: 0;
}
.title {
  height: 34px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 34px;
  margin-top: 48px;
}
/deep/ .line-title {
  div {
    height: 40px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 60px;
  }
}
</style>
