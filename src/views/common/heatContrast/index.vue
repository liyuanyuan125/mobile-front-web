<template>
   <div>
     <selectTime ref="reftimes"/>
     <echartLines 
     :lineData="lineData"
     :overAllHeat="overAllHeat"
     :colors="colors"/>
     <h2>平台热度对比</h2>
   </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { selectTime } from '@/components/hotLine'
import echartLines from '@/components/hotLines'

@Component({
  components: {
    echartLines,
    selectTime
  }
})
export default class Main extends Vue {
  @Prop({ type: Object}) lineData!: any
  @Prop({ type: Object}) overAllHeat: any
  @Prop({ type: Array, default: () => []}) colors!: any

  get startTime() {
    return (this.$refs.reftimes as any).beginDate
  }

  get endTime() {
    return (this.$refs.reftimes as any).endDate
  }
}

</script>

<style lang='less' scoped>

</style>
