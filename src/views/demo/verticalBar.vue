<template>
  <div class="demo-page">
    <VerticalBar
      :data="data"
      class="chart"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'

@Component({
  components: {
    VerticalBar
  }
})
export default class extends Vue {
  data: VerticalBarItem[] = [
    { name: '小于19岁', value: 8.8 },
    { name: '20-24', value: 17.6 },
    { name: '25-29', value: 32.8 },
    { name: '30-34', value: 28.0 },
    { name: '35-39', value: 9.2 },
    { name: '大于40岁', value: 3.1 },
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
