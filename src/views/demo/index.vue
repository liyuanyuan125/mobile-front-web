<template>
  <div class="demo-page">
    将内页放在单独的目录里
    <Demo title="你好，Vue"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Demo from '@/components/demo'

@Component({
  components: {
    Demo
  }
})
export default class DemoPage extends Vue {
}
</script>

<style lang="less" scoped>
.demo-page {
  width: 600px;
  margin: auto;
}
</style>
