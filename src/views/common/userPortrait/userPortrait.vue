<template>
  <section class="user-portrait-module">
    <ModuleHeader title="用户画像" class="module-header"/>

    <ModuleHeader title="性别占比" tag="h4" class="sex-rate"/>

    <SexChart :data="sexChartData" :width="345" class="sex-chart"/>

    <div class="van-hairline--top hairline"></div>

    <ModuleHeader title="年龄占比" tag="h4" class="age-rate"/>

    <VerticalBar :data="ageData" class="age-chart"/>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ModuleHeader from '@/components/moduleHeader'
import SexChart from '@/components/cakeChart/sexChart.vue'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'
import { NameValue } from './types'

@Component({
  components: {
    ModuleHeader,
    SexChart,
    VerticalBar
  }
})
export default class UserPortrait extends Vue {
  /** 性别数据 */
  @Prop({ type: Array, default: () => [] }) sexData!: NameValue[]

  /** 年龄数据 */
  @Prop({ type: Array, default: () => [] }) ageData!: VerticalBarItem[]

  get sexChartData() {
    const data = {
      data: this.sexData,
      title: '性别占比'
    }
    return data
  }
}
</script>

<style lang="less" scoped>
.user-portrait-module {
  background-color: #fff;
  padding: 60px 30px 50px;
}

.sex-rate {
  margin-top: 32px;
}

.hairline {
  margin-top: -48px;
}

.age-rate {
  padding-top: 45px;
}

.age-chart {
  margin-top: 40px;
}
</style>
