<template>
  <div class="hot-content">
    <hotLine 
      :lineDatas="lineDatas"
      :platformList="platformHeat"
      :params="params"
      v-if="this.yDate.length"
      ref="hots"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getList } from '@/api/kol'
import { toast } from '@/util/toast'
import { hotLine } from '@/components/hotLine'


@Component({
  components: {
    hotLine
  }
})

export default class Main extends Vue {
  @Prop({ type: Number, default: 0}) id!: number

  xDate = []
  yDate = []
  eventList = []

  platformHeat = []
  get params() {
    return {
      type: 2, // 1 品牌 2 艺人 3 电影 4 音乐-单曲 5 音乐-专辑  6 剧集
      id: this.$route.params.actorId,
      name: '奔驰', // 天数
      startTime: 20200304, // this.startTime,
      endTime: 20200310 // this.endTime
    }
  }

  get startTime() {
    return (this.$refs.hots as any).startTime
  }

  get endTime() {
    return (this.$refs.hots as any).endTime
  }

  get lineDatas() {
    return {
      title: '综合分析',
      xDate: this.xDate, // 格式 ['20201212', '20121122', '20121122','20121122','20121122','20121122','20121122']
      eventList: this.eventList,
      yDate: [
        {
          data: this.yDate, // 格式 [333,33333,303333333,33333,333,33333,303333333]
          name: '热点'
        }
      ]
   }
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
        brandId: 1, // this.id
        startTime: 20200304, // this.endTime
        endTime: 20200310 // this.endTime
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
