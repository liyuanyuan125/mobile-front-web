<template>
   <div>
     <section class="items">
        <!-- 综合热度对比 -->
        <div>
          <echartLines :lineData="lineData" v-if="overAllHeat.length" :colors="colors"/>
          <DataEmpty v-else/>
        </div>
        <div class="van-hairline--top item-hairline"></div>
        <h2 class="platform-title">平台热度对比</h2>
        <div class="tabbar">
          <span 
           v-for="item in tabs" 
           :key="item.key"
           :class="{active: item.key == tabIndex}"
           @click="() => tabIndex = item.key"
           >{{item.text}}</span>
        </div>
        <van-swipe class="my-swipe"  
          :show-indicators="false" 
          :loop="false" 
          :width="getClientWei"
          v-if="interactData.length"
        >
          <van-swipe-item v-for="(item, index) in interactData" :key="'a' + index" >
            <echartLines :lineData="item" :colors="colors" :key="index + item.platformName" />
          </van-swipe-item>
        </van-swipe>
        <DataEmpty v-else/>
     </section>
     
   </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import echartLines from '@/components/hotLines'
import { Swipe, SwipeItem } from 'vant'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import moment from 'moment'
const format = 'YYYY-MM-DD'
const colors = ['#88AAF6', '#4CC8D0', '#C965DD']

@Component({
  components: {
    echartLines,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    DataEmpty,
  }
})
export default class Main extends Vue {
  /** 热度分析对比 */
  @Prop({ type: Array, default: () => []}) overAllHeat: any
  /** 选择日期天数 */
  @Prop({ type: Number, default: 7}) daysNum!: number
  /** 热度分析对比title */
  @Prop({ type: String, default: '综合热度分析'}) lineTitle!: string
  /** 线条颜色配置 */
  @Prop({ type: Array, default: () => colors }) colors!: any
  /** 新增物料数data */
  @Prop({ type: Array, default: () => []}) materialList!: any
  /** 新增互动数data */
  @Prop({ type: Array, default: () => []}) interactList!: any
  /** 平台热度对比tab */
  @Prop({ type: Array, default: () => []}) tabs!: any

  tabIndex: any = null
  xDate: any = []

  // 选择天数遍历出对应的日期集合
  get selectDaysList() {
    const dateAry = [] // 对应日期 X轴
    const yDate = [] // 对应的值 Y轴
    for ( let i = 1; i <= this.daysNum; i++) {
      dateAry.push(moment().subtract(i, 'days').format('YYYY-MM-DD'))
    }
    return dateAry.reverse()
  }

  get interactData() {
    return this.changeListData()
  }

  get lineData() {
    if (this.overAllHeat.length == 0) {
      return {}
    } else {
      const yDate = (this.overAllHeat || []).map((it: any) => {
        const {rivalName, data} = it
        const obj: any = {};
        (data || []).map((item: any) => {
          const forDate = moment(item.date).format('YYYY-MM-DD')
          obj[forDate] = item.value
        })

        // yDate数据重新处理
        const yDateval: any[] = []
        this.selectDaysList.map((t: any) => {
          yDateval.push(obj[t] || 0) // date匹配后台给的value值，无则为0
        })

        return {
          name: rivalName,
          list: yDateval
        }
      })
      return {
        title: this.lineTitle,
        xDate: this.selectDaysList, // X轴日期
        yDate, // Y轴数据
      }
    }
  }

  get getClientWei() {
    const clientWidth = (document.documentElement.clientWidth || document.body.clientWidth) - 10
    return this.interactData.length == 1 ? clientWidth : 300
  }

  mounted() {
    this.tabIndex = 0
  }

  // 处理公共逻辑
  changeListData() {
    const list = this.tabIndex == 0 ? this.materialList : this.interactList
    const result = list.map((item: any) => {
      const {platformName, dataList} = item
      const yDate = (dataList || []).map((it: any) => {
        const {rivalName, data} = it
        const obj: any = {};
        (data || []).map((t: any) => {
          const forDate = moment(t.date).format('YYYY-MM-DD')
          obj[forDate] = t.value
        })

        // yDate数据重新处理
        const yDateval: any[] = []
        this.selectDaysList.map((t: any) => {
          yDateval.push(obj[t] || 0) // date匹配后台给的value值，无则为0, null 则会出现x轴不显示
        })

        return {
          name: rivalName,
          list: yDateval
        }
      })

      return {
        title: platformName,
        xDate: this.selectDaysList, // X轴日期
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
  background: #fff;
}
.platform-title {
  font-size: 34px;
  color: #303030;
  padding: 50px 0 40px;
  // border-top: solid 1px #d8d8d8;
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
