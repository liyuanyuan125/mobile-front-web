<template>
  <!-- 用户地域分布 -->
  <div class="viewpage">
    <SentimentBar :title="title" :titleShow="true" />
    <div class="tabs">
      <span
        v-for="item in tabButton"
        :key="item.type"
        :class="item.type === tabIndex ? 'on' : ''"
      >{{item.name}}</span>
    </div>
    <div>
      <BarGraphRow :dataOption="regionData" :canvasHei="canvasHei" v-if="regionData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import BarGraphRow from './components/barGraphRow.vue'
import { regionList } from './data'
import { toast } from '@/util/toast'

@Component({
  components: {
    SentimentBar,
    BarGraphRow
  }
})
export default class UserRegion extends ViewBase {
  title: string = '用户地域分布' // 页面 titlt
  regionData: any = null
  canvasHei: string = '600px'
  tabIndex: number = 1
  tabButton: any = [
    {
      type: 1,
      name: '省份分布'
    },
    {
      type: 2,
      name: '城市分布'
    }
  ]

  created() {
    const query: any = {
      id: this.$route.query.id,
      pageIndex: 1,
      type: this.$route.query.type || 1, // 1=省 2=城市
      objType: this.$route.query.objType // 1=用户地域分布  2=高消费偏好地区
    }
    this.getData(query)
  }

  // 获取数据
  async getData(query: any) {
    const source = Number(this.$route.query.src)
    const result: any = await regionList(source, query)
    // 处理页面 title
    this.title = result.brandName + '用户地域分布'
    // 处理数据
    this.formatData(result.dataList)
  }

  // 格式化数据
  formatData(dataList: any[]) {
    const xData = []
    const yData = []
    for (const item of dataList) {
      yData.push(item.name)
      xData.push((item.value / 100).toFixed(1))
    }
    this.canvasHei = dataList.length * 35 + 'px'
    this.regionData = {
      xData,
      yData,
      labelFormatter: '{c}%'
    }
  }
}
</script>

<style lang="less" scoped>
.viewpage {
  padding: 148px 40px 50px;
}
.tabs {
  text-align: center;
  span {
    height: 60px;
    border-radius: 30px;
    opacity: 0.4;
    border: 2px solid rgba(180, 193, 211, 1);
    font-size: 26px;
    color: rgba(46, 47, 90, 1);
    line-height: 60px;
    display: inline-block;
    padding: 0 28px;
    margin: 0 5px;
  }
  .on {
    background: rgba(124, 164, 255, 1);
  }
}
</style>
