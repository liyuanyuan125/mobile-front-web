<template>
  <div class="compet-content">
    <ModuleHeader title="竞品分析" />
    <div v-if="getRivalList.length">
      <ul>
        <li
          class="flex-box"
          v-for="(item, index) in getRivalList"
          v-if="index < 3"
          :key="item.rivalId"
          @click="goRivalDetail(item,index)"
        >
          <div class="parse-left">
            <img :src="item.rivalCover.url" alt />
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
                  <i
                    class="col_7ca4ff"
                    v-if="item.yesterHeatTrend"
                  >{{changeNum(item.yesterHeatTrend)}}</i>
                  <i v-else>-</i>
                </span>
                <span class="trend-interact">
                  {{item.yesterInteractCount}}
                  <i
                    class="col_ff6262"
                    v-if="item.yesterInteractTrend"
                  >{{changeNum(item.yesterInteractTrend)}}</i>
                  <i v-else>-</i>
                </span>
              </h5>
              <p class="event-name">
                <span>{{item.eventNameStr}}</span>
                <i>{{item.eventCreatTime}}</i>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="submit-button">
        <router-link
          :to="{name: 'sentimentbrand-analyze', query: {ids: idsString}}"
          class="to-link"
        >查看详细报告</router-link>
      </div>
    </div>
    <DataEmpty v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'
import ModuleHeader from '@/components/moduleHeader'
import { imgFixed } from '@/fn/imgProxy'
import { readableNumber } from '@/util/dealData'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    [Icon.name]: Icon,
    ModuleHeader,
    DataEmpty
  }
})
export default class Main extends Vue {
  @Prop({ type: Array, default: () => [] }) rivalList: any
  // 查看详情报告ids参数
  ids: any = []
  get idsString() {
    return this.ids.join(',')
  }

  get getRivalList() {
    const list = (this.rivalList || []).map((it: any, index: number) => {
      this.ids.push(it.rivalId)

      const eventNameStr =
        it.eventName && it.eventName.length > 10
          ? it.eventName.slice(0, 10) + '...'
          : it.eventName
      return {
        ...it,
        eventCreatTime: moment(it.eventCreatTime).format('YYYY-MM-DD'),
        eventNameStr,
        coverImg: imgFixed(it.rivalCover, 80, 80)
      }
    })
    return list
  }

  changeNum(num: number) {
    return num < 0 ? `低${readableNumber(Math.abs(num))}` : `高${readableNumber(num)}`
  }

  // 去往竞品详情页
  goRivalDetail(item: any, index: number) {
    if (index) {
      this.$router.push({
        name: 'sentiment-brand',
        params: {
          id: item.rivalId
        }
      })
    }
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
    object-fit: cover;
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
    .col_7ca4ff {
      color: #7ca4ff;
    }
  }
  .trend-interact {
    .col_ff6262 {
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
