<template>
  <div class="compet-content">
    <ModuleHeader title="竞品分析"  tag="h6"/>
    <ul>
      <li class="flex-box" v-for="item in getRivalList" :key="item.rivalId">
        <div class="parse-left">
          <img :src="item.rivalCover.url" alt=""/>
          <p>{{item.rivalName}}</p>
        </div>
        <div class="parse-right flex-box">
          <!-- 当前品牌 -->
          <div v-if="!item.eventName">
            <p class="col_8f flex-box">
              <span class="pad-right">昨日热度</span>
              <span>昨日互动量</span>
            </p>
            <h5 class="flex-box numbers">
              <span class="pad-right">{{item.yesterHeatCount}}</span>
              <span>{{item.yesterInteractCount}}</span>
            </h5>
          </div>
          <!-- 竞品显示内容 -->
          <div v-else>
            <h5 class="flex-box numbers">
              <span class="pad-right trend-head">
                {{item.yesterHeatCount}}
                <i>{{item.yesterHeatTrend}}</i>
              </span>
              <span class="trend-interact">
                {{item.yesterInteractCount}}
                <i>{{item.yesterInteractTrend}}</i>
              </span>
            </h5>
            <p class="event-name">{{item.eventName}} {{item.eventCreatTime}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="submit-button">
      <router-link :to="{name: 'sentimentbrand-analyze', params: {ids: ids.join('')}}" class="to-link" >查看详细报告</router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'
import ModuleHeader from '@/components/moduleHeader'

@Component({
  components: {
    [Icon.name]: Icon,
    ModuleHeader
  }
})
export default class Main extends Vue {
  @Prop({ type: Array, default: () => []}) rivalList: any
  // 查看详情报告ids参数
  ids: any = []
  get getRivalList() {
    const list = (this.rivalList || []).map((it: any) => {
      this.ids.push(it.brandId)
      const yesterHeatTrend = it.yesterHeatTrend < 0 ? `低${Math.abs(it.yesterHeatTrend)}` : `高${it.yesterHeatTrend}`
      const yesterInteractTrend = it.yesterInteractTrend < 0 ?
      `低${Math.abs(it.yesterInteractTrend)}` : `高${it.yesterInteractTrend}`

      return {
        ...it,
        eventCreatTime: moment(it.eventCreatTime).format('YYYY-MM-DD'),
        yesterHeatTrend,
        yesterInteractTrend
      }
    })
    return list
  }
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';

.compet-content {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 60px 30px 10px;
  border-top: 20px solid #f7f6f9;
}
.col_8f {
  color: @c-sub-text;
  padding: 20px 0 35px 0;
}
li {
  color: #000;
  font-size: 26px;
  padding: 40px 0;
  border-bottom: solid 1px rgba(216, 216, 216, 0.5);
}
.parse-left {
  width: 160px;
  text-align: center;
  margin-right: 30px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.parse-right {
  span {
    display: inline-block;
    min-width: 140px;
  }
  .pad-right {
    margin-right: 150px;
  }
  .numbers {
    font-size: 36px;
    font-weight: 400;
    i {
      font-weight: 0;
      font-size: 26px;
      display: block;
    }
  }
  .trend-head {
    i {
      color: #7ca4ff;
    }
  }
  .trend-interact {
    i {
      color: #ff6262;
    }
  }
  .event-name {
    background-color: #f9f9f9;
    border-radius: 20px;
    font-size: 26px;
    padding: 17px 10px 17px 36px;
    margin-top: 30px;
    position: relative;
    &::before {
      display: block;
      width: 16px;
      height: 16px;
      content: '';
      background: #f7a345;
      border-radius: 50%;
      position: absolute;
      left: 10px;
      top: 26px;
      z-index: 2;
    }
  }
}

</style>
