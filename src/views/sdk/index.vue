<template>
  <div class="viewpage">
    <div class="select">
      <select v-model="dataIndex">
        <option
          v-for="(item,index) in list"
          :key="item.name"
          :value="index"
        >{{item.index + 1}}.{{item.name}}</option>
      </select>
    </div>
    <OpenAppLinkClient :dataBase="list[dataIndex]" v-show="dataIndex === 0"></OpenAppLinkClient>
    <GetApiSignature :dataBase="list[dataIndex]" v-show="dataIndex === 1"></GetApiSignature>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Demo from '@/components/demo'
import data from './data'
import GetApiSignature from './components/getApiSignature.vue'
import OpenAppLinkClient from './components/openAppLinkClient.vue'

@Component({
  components: {
    GetApiSignature,
    OpenAppLinkClient
  }
})
export default class JSsdk extends Vue {
  list: any = data
  dataIndex: number = 0
  created() {
    const ua = navigator.userAgent
    const isApp = ua.indexOf('JYDataCinema') > -1
  }

  // 执行方法
  carryAction(name: string) {}
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
