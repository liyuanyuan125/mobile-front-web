<template>
  <div class="page">
    <Swipe :show-indicators="false" :loop="false">
      <SwipeItem 
         style="width: 250px" 
         v-for="(item, index) in dataList" 
         :key="item.cityName + index">
        <div class="items">
          <h3 class="bar-title">{{item.cityName}}</h3>
          <p class="bar-name">客单价预测</p>
          <VerticalBar :data="item.perTicketSalesList" hideY class="pane"/>
          <p class="bar-name pad-top">购买力预测</p>
          <div>
            <div class="flex-box progress-items" v-for="(it, ind) in item.buyingPowerList" :key="it.name+ind">
              <span class="van-ellipsis left-pro">{{it.name}}</span>
              <Progress :percentage="it.value" class="per" color="#C6D5F7" stroke-width="10px" />
              <span class="bar-value">{{it.value}}%</span>
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

  get dataList() {
    const data = this.cityConsum.map((it: any) => {
      const perTicketSalesList = (it.perTicketSalesList || []).map((sal: any) => {
        return {
          ...sal,
          value: (sal.value / 100).toFixed(1)
        }
      })
      const buyingPowerList = (it.buyingPowerList || []).map((buy: any) => {
        return {
          ...buy,
          value: (buy.value / 100).toFixed(1)
        }
      })
      return {
        ...it,
        perTicketSalesList,
        buyingPowerList
      }
    })
    return data
  }
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
    margin-right: 30px;
  }
  .per {
    width: 160px;
  }
  .bar-value {
    font-size: 26px;
    margin-left: 30px;
  }
}
</style>
