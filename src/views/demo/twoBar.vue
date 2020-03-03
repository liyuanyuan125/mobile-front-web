<template>
  <div class="demo-page">
    <TwoBar :data="dataSex" class="two-bar"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TwoBar, { TwoBarItem } from '@/components/twoBar'

@Component({
  components: {
    TwoBar
  }
})
export default class extends Vue {
  dataSex: TwoBarItem[] = [
    { name: '男', rate: 41.9, color: '#88AAF6' },
    { name: '女', rate: 100 - 41.9, color: '#F18F8F' },
  ]
}
</script>

<style lang="less" scoped>
.demo-page {
  padding: 20px;
}

.two-bar {
  width: 300px;
}
</style>
