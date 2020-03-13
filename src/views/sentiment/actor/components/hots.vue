<template>
  <div class="hot-content">
    <selectTime ref="reftimes"/>
    <hotLine :lineData="lineDatas" v-if="xDate.length > 1" />
    <platFormList 
      :platformList="platformHeat"
      :params="params"
      v-if="platformHeat.length > 1" 
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { getList } from '@/api/brand'
import { toast } from '@/util/toast'

import hotLine from '@/components/hotLine/line.vue'
import platFormList from '@/components/hotLine/platform.vue'
import selectTime from '@/components/hotLine/selectTime.vue'


@Component({
  components: {
    hotLine,
    selectTime,
    platFormList
  }
})

export default class Main extends Vue {
  xDate = []
  yDate = []
  eventList = []

  platformHeat = []
  get params() {
    return {
      type: 'brand', // 类型： 品牌，电影，音乐等
      id: 1,
      name: '哈哈哈', // 天数
      startTime: this.reftimes.beginDate,
      endTime: this.reftimes.endDate
    }
  }

  get lineDatas() {
    return {
      title: '综合热度',
      xDate: this.xDate, // 格式 ['20201212', '20121122', '20121122','20121122','20121122','20121122','20121122']
      eventList: this.eventList,
      yDate: [
        {
          data: this.yDate, // 格式 [333,33333,303333333,33333,333,33333,303333333]
          name: '热度值'
        }
      ]
   }
  }

  get reftimes() {
    return (this.$refs.reftimes as any)
  }

  mounted() {
    this.getHotList()
  }

  async getHotList() {
    try {
      const { data: {
        overAllHeatList,
        platformHeatList
      } } = await getList({
        brandId: 1,
        startTime: 20200304, // this.reftimes.beginDate
        endTime: 20200310 // this.reftimes.endDate
      })
      this.xDate = (overAllHeatList || []).map((it: any) => it.date)
      this.yDate = (overAllHeatList || []).map((it: any) => it.value)
      this.eventList = (overAllHeatList || []).map((it: any) => it.eventList)
      this.platformHeat = platformHeatList || []
    } catch (ex) {
      toast(ex)
    }
  }
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
.hot-content {
  background-color: #fff;
  padding: 70px 30px 40px;
  color: @c-text;
}
</style>
