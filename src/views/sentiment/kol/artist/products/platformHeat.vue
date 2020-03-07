<template>
  <div class='main'>
      <div class='title'>平台热度对比</div>
      <div class='but'>
        <Button class='fans' :class="{'chgbgc': publicPk == 1}" type="primary" @click='chgpublicPk(1)'>粉丝数</Button>
        <Button class='chg' :class="{'chgbgc': publicPk == 2}" type="primary" @click='chgpublicPk(2)'>新增互动数</Button>
      </div>
      <div class='fanlist'>
        <div class='rowfans'>
          <LineGraph :lineData="lineDatas" />
        </div>
        <div class='rowfans'>
          <LineGraph :lineData="lineDatas" />
        </div>
        <div class='rowfans'>
          <LineGraph :lineData="lineDatas" />
        </div>
      </div>
      
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import LineGraph from '@/components/charts/hots/index.vue'
import selectTime from '@/components/charts/hots/selectTime.vue'
import { Button } from 'vant'

@Component({
  components: {
    LineGraph,
    selectTime,
    Button,
  }
})
export default class KolPage extends ViewBase {
  lineDatas = {
    title: '微博',
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

  publicPk: any = 1

  // 切换平台热度对比
  chgpublicPk(num: any) {
    this.publicPk = num
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
.fanlist {
  width: 100%;
  display: flex;
  overflow: scroll;
  -webkit-flex-wrap:nowrap;
  flex-wrap:nowrap;
  -webkit-justify-content:space-between;
  justify-content:space-between;
}
.rowfans {
  -webkit-flex:1 0 auto;
  flex:1 0 auto;
  margin-top: 30px;
  width: 600px;
  height: 522px;
  background: rgba(242, 243, 246, 1);
  border-radius: 20px;
  opacity: 0.5;
  padding: 30px;
  margin-right: 30px;;
}
.but {
  margin-top: 30px;
}
/deep/ .van-button--primary {
  width: 180px;
  height: 60px;
  background:rgba(255, 255, 255, 1);
  color: #303030;
  border-radius: 30px;
  border: 2px solid rgba(235, 235, 235, 1);
  font-size: 26px;
}
.chg {
  margin-left: 20px;
}
.chgbgc {
  background: #88AAF6;
  color: #fff;
}
</style>
