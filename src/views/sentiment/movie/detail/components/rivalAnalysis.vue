<template>
  <!--竞品分析 -->
  <div class="rival mod">
    <ModuleHeader title="同档期影片分析" />
    <div v-if="list.length && list.length >1">
      <dl>
        <dd v-for="(item,index) in list.slice(0,3)" :key="item.rivalId + index">
          <div class="rivalbox" @click="goRivalDetail(item,index)">
            <img :src="item.coverImg" :alt="item.rivalName" class="img" />
            <h4 class="van-ellipsis">{{item.rivalName}}</h4>
            <div class="params">
              <div class="flex">
                <p class="tit">热度</p>
                <strong
                  style="font-family: DIN Alternate;"
                >{{item.heatCount ? item.heatCount : '-'}}</strong>
                <div v-if="index > 0">
                  <p
                    class="trend"
                    v-if="item.heatTrend"
                    :style="{color:item.heatTrend > 0 ? '#FF6262': '#88AAF6'}"
                  >{{item.heatTrend > 0 ? '高'+item.heatTrendShow : '低' + item.heatTrendShow}}</p>
                  <p v-else class="trend">-</p>
                </div>
              </div>
              <div class="flex">
                <p class="tit">新增物料</p>
                <strong
                  style="font-family: DIN Alternate;"
                >{{item.materialsAdd ? item.materialsAdd : '-'}}</strong>
                <div v-if="index > 0">
                  <p
                    class="trend"
                    v-if="item.materialsTrend"
                    :style="{color:item.materialsTrend > 0 ? '#FF6262': '#88AAF6'}"
                  >{{item.materialsTrend > 0 ? '高' + item.materialsTrendShow : '低' + item.materialsTrendShow}}</p>
                  <p class="trend" v-else>-</p>
                </div>
              </div>
            </div>
            <div class="eventbox" v-if="item.eventName">
              <span class="tit van-ellipsis">{{item.eventName}}</span>
              <span class="date" v-if="item.eventCreatTime">{{item.eventCreatTime}}</span>
            </div>
          </div>
        </dd>
      </dl>
      <div class="golink">
        <router-link :to="{path:'/sentiment/movie/rivalAnalysis',query:{ids:rivalIds}}">查看详细报告</router-link>
      </div>
    </div>
    <dataEmpty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import ModuleHeader from '@/components/moduleHeader'
import moment from 'moment'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { imgFixed } from '@/fn/imgProxy'
import { roleNumber } from '@/fn/validateRules'

@Component({
  components: {
    ModuleHeader,
    dataEmpty
  }
})
export default class RivalAnalysis extends ViewBase {
  @Prop({ type: Array }) rivalList!: any[]

  rivalIds: string = ''

  get list() {
    const list = this.rivalList
    const ids = []
    if (list && list.length > 1) {
      for (const item of this.rivalList) {
        ids.push(item.rivalId)
        item.eventCreatTime = moment(item.eventCreatTime).format('YYYY-MM-DD')
        item.coverImg = imgFixed(item.rivalCover, 200, 260, 4)
        item.heatTrendShow = roleNumber(Math.abs(item.heatTrend))
        item.materialsTrendShow = roleNumber(Math.abs(item.materialsTrend))
      }
      this.rivalIds = ids.slice(0, 3).join(',')
      return list
    } else {
      return []
    }
  }

  // 去往竞品详情页
  goRivalDetail(item: any, index: number) {
    if (index) {
      this.$router.push({
        name: 'sentimentmovie',
        params: {
          movieId: item.rivalId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rival {
  padding: 50px 0;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  dl {
    padding: 30px 30px 0;
  }
  dd {
    margin-top: 40px;
    &:first-child {
      margin-top: 10px;
    }
  }
  .golink {
    padding-top: 50px;
    text-align: center;
    a {
      color: #88aaf6;
      font-size: 28px;
      border: 2px solid #88aaf6;
      width: 400px;
      line-height: 86px;
      display: inline-block;
      border-radius: 45px;
    }
  }
}
.module-header {
  padding: 0 30px;
}
.rivalbox {
  position: relative;
  min-height: 260px;
  padding-left: 240px;
  .img {
    background: url('../../../../../assets/moviedefault.png') no-repeat center;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 260px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  h4 {
    font-size: 36px;
    font-weight: normal;
    line-height: 1.3;
  }
  .params {
    display: flex;
    margin-top: 20px;
    .flex {
      width: 50%;
      line-height: 1;
    }
    .tit {
      font-size: 26px;
      color: rgba(48, 48, 48, 0.4);
    }
    strong {
      display: block;
      font-size: 42px;
      margin-top: 10px;
    }
    .trend {
      font-size: 26px;
      margin-top: 15px;
    }
  }
  .eventbox {
    display: flex;
    background-color: #f8f9fa;
    line-height: 60px;
    padding: 0 20px;
    margin-top: 26px;
    span {
      white-space: nowrap;
    }
    span.tit {
      font-size: 26px;
      color: rgba(48, 48, 48, 0.8);
      flex: 1;
    }
    span.date {
      text-align: right;
      font-size: 22px;
      color: rgba(48, 48, 48, 0.4);
    }
  }
}
</style>
