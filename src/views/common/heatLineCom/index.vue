<template>
   <div>
     <div class="over-min-height">
       <p class="hot-title">{{lineTitle}}</p>
       <van-loading color="#1989fa" size="30" v-if="!overLoading" class="heat-loading" />
       <dubline 
          :lineData="lineDatas" 
          v-else-if="overLoading && lineDatas.xDate.length" 
          :key="lineDatas.title"
          :events="getEvents"
        />
       <DataEmpty v-else="overLoading && lineDatas.xDate.length == 0"/>
     </div>
     <div class="heat">
       <platForm 
         :platformList="platformList" 
         :params="params"
         class="platfrom"/>
     </div>
     
   </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { platForm, dubline } from '@/components/hotLine'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import moment from 'moment'
import { Loading } from 'vant'

@Component({
  components: {
    platForm,
    dubline,
    DataEmpty,
    [Loading.name]: Loading
  }
})
export default class Main extends Vue {
  /** 热度分析+平台信息 list */
  @Prop({ type: Array, default: () => []}) overAllList!: any
  @Prop({ type: Array, default: () => []}) platformList!: any
  @Prop({ type: Object}) params!: any
  @Prop({ type: String, default: '综合热度'}) lineTitle!: string
  @Prop({ type: Boolean, default: true}) overLoading: any


  get getEvents() {
    // 定义eventList数据
    const click = ({ id, name }: any) => {
      this.$router.push({
        name: 'sentimenteventmarketing',
        params: {eventId: id},
        query: {title: name}
        }
      )
    }
    const obj: any = {}
    const result = (this.overAllList || []).map( (it: any ) => {
      const date = moment(it.date).format('MM-DD')
      obj[date] = it.eventList || []
    })
    return {
      click,
      ...obj,
    }
  }

  get lineDatas() {
    const xDate = (this.overAllList || []).map((it: any) => it.date)
    const yDate = (this.overAllList || []).map((it: any) => it.value || 0)
    return {
      title: this.lineTitle,
      xDate,
      yDate: [
        {
          data: yDate,
          name: '热度值'
        }
      ]
    }
  }
}

</script>

<style lang='less' scoped>
.heat-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -15px;
  margin-top: -15px;
}
.over-min-height {
  min-height: 390px;
  position: relative;
}
.heat {
  padding: 0 30px;
}
.platfrom {
  border-top: solid 1px rgba(216, 216, 216, 0.5);
}
.hot-title {
  font-size: 34px;
  color: #303030;
  padding-left: 30px;
}
</style>
