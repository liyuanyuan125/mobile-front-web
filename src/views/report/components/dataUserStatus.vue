<template>
  <div class="userStatus">
    <h3 v-if="userAges">年龄占比</h3>
    <div class="userage">
      <UserAge v-if="userAges" :ageOption="userAges" />
    </div>
    <h3 v-if="userGender">性别占比</h3>
    <div class="usergender">
      <UserGender v-if="userGender" :genderOption="userGender" :bgColor="bgColor" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import UserAge from '../echarts/userAge.vue'
import UserGender from '../echarts/userGender.vue'

@Component({
  components: {
    UserAge,
    UserGender
  }
})
export default class DataUserStatus extends ViewBase {
  @Prop({ type: Array }) userAges!: any
  @Prop({ type: Array }) userGender!: any
  bgColor: any = ['#85B9FF', '#FF8080']
  // mounted() {
  //   console.log(this.userAges, this.userGender)
  // }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
