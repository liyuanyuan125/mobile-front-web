<template>
  <section class="sex-vs-module">
    <ModuleHeader title="性别分布" tag="h4" class="module-header"/>
    <VsList :data="data" class="sex-chart"/>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ModuleHeader from '@/components/moduleHeader'
import VsList, { VsItem } from '@/components/vsList'

@Component({
  components: {
    ModuleHeader,
    VsList
  }
})
export default class SexVs extends Vue {
  /** 性别数据 */
  @Prop({ type: Array, default: () => [] }) data!: VsItem[]
}
</script>

<style lang="less" scoped>
.sex-vs-module {
  background-color: #fff;
  padding: 60px 30px 50px;
}

.sex-chart {
  margin-top: 32px;
}
</style>
