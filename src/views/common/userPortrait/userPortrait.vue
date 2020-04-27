<template>
  <section class="user-portrait-module">
    <ModuleHeader title="用户画像" class="module-header"/>

    <div class="sex-wrap">
      <ModuleHeader title="性别占比" tag="h4" class="sex-rate"/>
      <SexChart :data="sexChartData" :width="345" class="sex-chart" v-if="sexChartData"/>
      <DataEmpty v-if="sexEmpty" />
    </div>

    <div class="van-hairline--top hairline"></div>

    <div class="age-wrap">
      <ModuleHeader title="年龄占比" tag="h4" class="age-rate"/>
      <VerticalBar
        :data="ageData"
        :digits="2"
        class="age-chart"
        v-if="ageData && ageData.length > 0"
      />
      <DataEmpty v-if="ageEmpty" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ModuleHeader from '@/components/moduleHeader'
import SexChart from '@/components/cakeChart/sexChart.vue'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'
import { NameValue } from './types'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    ModuleHeader,
    SexChart,
    VerticalBar,
    DataEmpty
  }
})
export default class UserPortrait extends Vue {
  /** 性别数据 */
  @Prop({ type: Array, default: null }) sexData!: NameValue[]

  /** 年龄数据 */
  @Prop({ type: Array, default: null }) ageData!: VerticalBarItem[]

  get sexChartData() {
    const list = this.sexData || []
    const data = list.length > 0 ? { data: list, title: '性别占比' } : null
    return data
  }

  get sexEmpty() {
    return this.sexData && this.sexData.length == 0
  }

  get ageEmpty() {
    return this.ageData && this.ageData.length == 0
  }
}
</script>

<style lang="less" scoped>
.user-portrait-module {
  background-color: #fff;
  padding: 60px 30px 50px;
}

.module-header,
.sex-rate {
  position: relative;
  z-index: 88;
}

.sex-wrap,
.age-wrap {
  min-height: 400px;
}

.sex-wrap {
  .datanull {
    margin-bottom: 80px;
  }
}

.sex-rate {
  margin-top: 32px;
}

.sex-chart {
  margin-top: -70px;
}

.hairline {
  margin-top: -48px;
}

.age-rate {
  padding-top: 70px;
}

.age-chart {
  margin-top: 70px;
}
</style>
