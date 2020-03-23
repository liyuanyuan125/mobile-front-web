<template>
   <div class="heat">
     <div>
       <dubline :lineData="lineDatas" v-if="lineDatas.xDate.length" :key="lineDatas.title"/>
       <DataEmpty v-else/>
     </div>
     <div>
       <platForm :platformList="platformList" v-if="platformList.length" :params="params" class="platfrom"/>
       <DataEmpty v-else/>
     </div>
     
   </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { platForm, dubline } from '@/components/hotLine'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

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

  get lineDatas() {
    const xDate = (this.overAllList || []).map((it: any) => it.date)
    const yDate = (this.overAllList || []).map((it: any) => it.value)
    const eventList = (this.overAllList || []).map((it: any) => it.eventList || [])
    return {
      title: '综合分析',
      xDate,
      eventList,
      yDate: [
        {
          data: yDate,
          name: '热点'
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
  border-top: solid 1px #d8d8d8;
}
</style>
