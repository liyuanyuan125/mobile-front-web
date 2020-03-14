<template>
  <div class='main'>
      <!-- <div class='title'>口碑评论对比</div> -->
       <selectTime ref="reftimes" title="口碑评论对比" :days="chgdays"/>
      <div>
        <div class='but'>
          <Button class='fans' :class="{'chgbgc': publicPk == 1}" type="primary" @click='chgpublicPk(1)'>负面评论</Button>
          <Button class='chg' :class="{'chgbgc': publicPk == 2}" type="primary" @click='chgpublicPk(2)'>正面评论</Button>
          <Button class='chg' :class="{'chgbgc': publicPk == 3}" type="primary" @click='chgpublicPk(3)'>中性评论</Button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import selectTime from '@/components/charts/hots/selectTime.vue'
import { Button } from 'vant'



@Component({
  components: {
    selectTime,
    Button,
  }
})
export default class KolPage extends ViewBase {
  chgdays: any = 'last_7_day'

  publicPk: any = 1

  // 切换口碑评论对比
  chgpublicPk(num: any) {
    this.publicPk = num
  }

}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  background: #fff;
  padding: 60px 30px;
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
.but {
  margin-top: 30px;
}
/deep/ .van-button--primary {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  color: #303030;
  border-radius: 30px;
  border: 2px solid rgba(235, 235, 235, 1);
  font-size: 26px;
}
.chg {
  margin-left: 20px;
}
.chgbgc {
  background: #88aaf6;
  color: #fff;
}
</style>
