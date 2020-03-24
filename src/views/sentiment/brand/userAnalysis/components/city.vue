<template>
  <div class="page">
    <Swipe>
      <SwipeItem style="width: 250px" v-for="(item, index) in cityConsum" :key="item.cityName + index">
        <div class="items">
          <h3 class="bar-title">{{item.cityName}}</h3>
          <p class="bar-name">客单价预测</p>
          <VerticalBar :data="item.perTicketSalesList" class="pane"/>
          <p class="bar-name pad-top">购买力预测</p>
          <div>
            <div class="flex-box progress-items" v-for="(it, ind) in item.buyingPowerList" :key="it.name+ind">
              <span class="van-ellipsis left-pro">{{it.name}}</span>
              <Progress percentage="90" class="per" color="#C6D5F7" stroke-width="10px" />
              <span>{{it.value}}%</span>
            </div>
          </div>
        </div>
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Progress, Swipe, SwipeItem } from 'vant'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'
@Component({
  components: {
    VerticalBar,
    Progress,
    Swipe,
    SwipeItem
  }
})
export default class Main extends Vue {
  @Prop({ type: Array, default: () => []}) cityConsum: any
  ageData: VerticalBarItem[] = [
    { name: '小于19岁', value: 8.8 },
    { name: '20-24', value: 17.6 },
    { name: '25-29', value: 32.8 },
    { name: '30-34', value: 28.0 },
  ]
}

</script>

<style lang='less' scoped>
.page {
  padding-top: 50px;
}
.items {
  background: #f9f9f9;
  padding: 30px 30px 100px;
  color: #8f8f8f;
  border-radius: 20px;
  margin-right: 30px;
  .bar-title {
    color: #303030;
    font-size: 30px;
    padding-bottom: 30px;
  }
  .bar-name {
    font-size: 26px;
    padding-bottom: 40px;
  }
}
/deep/ .van-progress__pivot {
  display: none;
}
.pad-top {
  padding-top: 100px;
}
.progress-items {
  display: flex;
  align-items: center;
  .left-pro {
    width: 104px;
    font-size: 26px;
  }
  .per {
    width: 160px;
  }
}
</style>
