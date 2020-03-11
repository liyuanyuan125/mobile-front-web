<template>
  <div class="demo-page">
    <VsList
      :data="data"
      class="chart"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VsList, { VsItem } from '@/components/vsList'

@Component({
  components: {
    VsList
  }
})
export default class extends Vue {
  data: VsItem[] = [
    { name: '奔驰', rate1: 63.6, rate2: 44.4 },
    { name: '兰博基尼', rate1: 39.6, rate2: 60.4 },
    { name: '林肯', rate1: 20.2, rate2: 79.8 },
    { name: '雪佛兰', rate1: 2.2, rate2: 97.8 },
    { name: '玛莎拉蒂名字很长', rate1: 98.8, rate2: 1.2 },
  ]
}
</script>

<style lang="less" scoped>
.demo-page {
  padding: 20px;
}

.chart {
  width: 100%;
}
</style>
