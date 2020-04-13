<template>
   <div>
     <div>
       <p class="hot-title">{{lineTitle}}</p>
       <dubline 
          :lineData="lineDatas" 
          v-if="lineDatas.xDate.length" 
          :key="lineDatas.title"
          :events="getEvents"
        />
       <DataEmpty v-else/>
     </div>
     <div class="heat">
       <platForm 
         :platformList="platformList" 
         :params="params" 
         class="platfrom"/>
       <!-- <DataEmpty v-else/> v-if="platformList.length"  -->
     </div>
     
   </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { platForm, dubline } from '@/components/hotLine'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import moment from 'moment'

@Component({
  components: {
    platForm,
    dubline,
    DataEmpty
  }
})
export default class Main extends Vue {
  /** 热度分析+平台信息 list */
  @Prop({ type: Array, default: () => []}) overAllList!: any
  @Prop({ type: Array, default: () => []}) platformList!: any
  @Prop({ type: Object}) params!: any
  @Prop({ type: String, default: '综合热度'}) lineTitle!: string


  get getEvents() {
    // 定义eventList数据
    const click = ({ id, name }: any) => {
      this.$router.push({name: 'sentimenteventmarketing', params: {eventId: id}})
    }
    const obj: any = {}
    const result = (this.overAllList || []).map( (it: any ) => {
      const date = moment(it.date).format('MM-DD')
      obj[date] = it.eventList || []
    })
    return {
      click,
      ...obj,
      // '03-05': [
      //   {eventName: '事件名字事件名字', eventId: 12938},
      //   {eventName: 'eventname-2', eventId: 12938},
      //   {eventName: '事件名字事件名字', eventId: 12938},
      //   {eventName: 'eventname-2', eventId: 12938},
      // ],
    }
  }

  get lineDatas() {
    const xDate = (this.overAllList || []).map((it: any) => it.date)
    const yDate = (this.overAllList || []).map((it: any) => it.value)
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
