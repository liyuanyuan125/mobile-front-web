<template>
  <div class="userStatus">
    <h3 v-if="cityTier">线城市占比</h3>
    <div class="userage">
      <UserGender v-if="formatCityTier" :genderOption="formatCityTier" />
    </div>
    <h3 v-if="cityProfile">城市分布占比</h3>
    <div class="usergender">
      <BarGraphRow v-if="cityProfile" :dataOption="cityProfile" />
    </div>
    <div class="morecity">查看全部城市</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraphRow from '../echarts/barGraphRow.vue'
import UserGender from '../echarts/userGender.vue'

@Component({
  components: {
    BarGraphRow,
    UserGender
  }
})
export default class DataCity extends ViewBase {
  @Prop({ type: Array }) cityTier!: any
  @Prop({ type: Array }) cityProfile!: any

  formatCityTier: any = []

  // 处理一下数据
  formatData() {
    for (const item of this.cityTier) {
      this.formatCityTier.push({
        name: item.tier,
        value: item.value
      })
    }
  }
  created() {
    this.formatData()
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
.morecity {
  font-size: 30px;
  line-height: 28px;
  color: #7aa0f5;
  text-align: center;
  padding: 0 0 60px 0;
}
</style>
