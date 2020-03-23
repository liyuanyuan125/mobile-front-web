<template>
   <div>
     <section class="items">
       <selectTime ref="reftimes"/>
        <echartLines :lineData="lineData" :colors="colors"/>
        <h2 class="platform-title">平台热度对比</h2>
        <div class="tabbar">
          <span 
           v-for="item in tabs" 
           :key="item.key"
           :class="{active: item.key == tabIndex}"
           @click="() => tabIndex = item.key"
           >{{item.text}}</span>
        </div>
        <van-swipe class="my-swipe"  :show-indicators="false" :loop="false" :width="300">
          <van-swipe-item v-for="(item, index) in interactData" >
            <echartLines :lineData="item" :colors="colors" />
          </van-swipe-item>
        </van-swipe>
     </section>
     
   </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { selectTime } from '@/components/hotLine'
import echartLines from '@/components/hotLines'
import { Swipe, SwipeItem } from 'vant'
import moment from 'moment'
const format = 'YYYY-MM-DD'

@Component({
  components: {
    echartLines,
    selectTime,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  }
})
export default class Main extends Vue {
  @Prop({ type: Object}) overAllHeat: any
  /** 线条颜色配置 */
  @Prop({ type: Array, default: () => []}) colors!: any
  /** 新增物料数data */
  @Prop({ type: Array, default: () => []}) interactList!: any
  /** 新增互动数data */
  @Prop({ type: Array, default: () => []}) materialList!: any
  /** 平台热度对比tab */
  @Prop({ type: Array, default: () => []}) tabs!: any

  tabIndex: any = null
  xDate: any = []
  get interactData() {
    return this.changeListData()
  }

  get startTime() {
    return (this.$refs.reftimes as any).beginDate
  }

  get endTime() {
    return (this.$refs.reftimes as any).endDate
  }
  // 综合热度数据处理 title，xdata，ydata
  get lineData() {
    this.xDate = (this.overAllHeat.dateList[0].data || []).map((it: any) => moment(it.date).format('MM-DD'))
    const yDate = (this.overAllHeat.dateList || []).map((it: any) => {
      const {rivalName, data} = it
      return {
        name: rivalName,
        list: (data || []).map((ite: any) => ite.value)
      }
    })
    return {
      title: this.overAllHeat.title,
      xDate: this.xDate,
      yDate
    }
  }

  mounted() {
    this.tabIndex = 0
  }

  // 处理公共逻辑
  changeListData() {
    const list = this.tabIndex == 0 ? this.interactList : this.materialList
    const result = list.map((item: any) => {
      const {platformName, dataList} = item

      const yDate = dataList.map((it: any) => {
        return {
          name: it.rivalName,
          list: it.data.map((ite: any) => ite.value)
        }
      })
      return {
        key: this.tabIndex == 0 ? 'interact' : 'materia',
        title: platformName,
        xDate: this.xDate,
        yDate,
      }
    })
    return result
  }

  @Watch('tabIndex', {immediate: true, deep: true})
  handleTab() {
    this.changeListData()
  }
}

</script>

<style lang='less' scoped>
.items {
  padding: 0 30px;
}
.platform-title {
  font-size: 34px;
  color: #303030;
  padding: 50px 0 40px;
  border-top: solid 1px #d8d8d8;
}
.tabbar {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  span {
    width: 180px;
    line-height: 60px;
    border-radius: 30px;
    font-size: 26px;
    color: #2e2f5a;
    text-align: center;
    background: #fff;
    border: 2px solid rgba(180, 193, 211, .5);
    margin-right: 10px;
    &.active {
      background: #7ca4ff;
      color: #fff;
    }
  }
}
.my-swipe {
  .van-swipe-item {
    padding-right: 30px;
    .content-wrap {
      background: #f9f9f9;
      border-radius: 20px;
      padding: 40px 20px 0 20px;
    }
  }
}
</style>
