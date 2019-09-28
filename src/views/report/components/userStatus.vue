<template>
  <div class="userStatus">
    <h3>年龄占比</h3>
    <div>
      <UserAge />
    </div>
    <h3>性别占比</h3>
    <div>
      <UserGender />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import UserAge from '../echarts/userAge.vue'
import UserGender from '../echarts/userGender.vue'

@Component({
  components: {
    UserAge,
    UserGender
  }
})
export default class UserStatus extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
