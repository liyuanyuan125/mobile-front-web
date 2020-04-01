<template>
  <!-- 用户地域分布 -->
  <div class="viewpage">
    <SentimentBar :title="title" :titleShow="true" />
    <div class="tabs">
      <span
        v-for="item in tabButton"
        :key="item.type"
        @click="changeTab(item.type)"
        :class="item.type === tabIndex ? 'on' : ''"
      >{{item.name}}</span>
    </div>
    <div v-if="regionData">
      <BarGraphRow :dataOption="regionData" :canvasHei="canvasHei" v-if="regionData" />
    </div>
    <dataEmpty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { BarGraphRow } from '@/components/barGraphRow'
import { regionList } from './data'
import { toast } from '@/util/toast'
import dataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    SentimentBar,
    BarGraphRow,
    dataEmpty
  }
})
export default class UserRegion extends ViewBase {
  source: number = 0 // 数据来源
  query: any = {
    id: 0,
    pageIndex: 1,
    type: 1, // 1=省 2=城市
    objType: 1 // 1=用户地域分布  2=高消费偏好地区
  }
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
    this.source = Number(this.$route.query.src)
    this.query = {
      id: this.$route.query.id,
      pageIndex: 1,
      type: this.$route.query.type || 1,
      objType: this.$route.query.objType
    }
    this.getData()
  }

  // 获取数据
  async getData() {
    const res: any = await regionList(this.source, this.query)

    // 处理数据
    if (res && res.dataList) {
      this.formatData(res.dataList)
    }
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
      xData, // X轴数据
      yData, // Y轴name
      labelFormatter: '{c}%', // 最右侧的数值
      size: 11 // 条形的高度
    }
  }

  // 切换省市
  changeTab(type: number) {
    if (this.tabIndex !== type) {
      this.tabIndex = type
      this.query = Object.assign({}, this.query, { type })
      this.getData()
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
  padding-bottom: 40px;
  span {
    height: 60px;
    border-radius: 30px;
    border: 2px solid rgba(180, 193, 211, 0.4);
    font-size: 26px;
    color: rgba(46, 47, 90, 1);
    line-height: 60px;
    display: inline-block;
    padding: 0 28px;
    margin: 0 5px;
  }
  .on {
    background: #7ca4ff;
    border-color: #7ca4ff;
    color: #fff;
  }
}
</style>
