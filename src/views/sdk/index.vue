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
    <OpenAppLinkClient :dataBase="list[dataIndex]" v-if="dataIndex === 0" />
    <GetApiSignature :dataBase="list[dataIndex]" v-if="dataIndex === 1" />
    <HandleUploadImage :dataBase="list[dataIndex]" v-if="dataIndex === 2" />
    <HandleGoBack :dataBase="list[dataIndex]" v-if="dataIndex === 3" />
    <HandleDialTel :dataBase="list[dataIndex]" v-if="dataIndex === 4" />
    <SetNavBarStatus :dataBase="list[dataIndex]" v-if="dataIndex === 5" />
    <GetNativeNetStatus :dataBase="list[dataIndex]" v-if="dataIndex === 6" />
    <ShowShare :dataBase="list[dataIndex]" v-if="dataIndex === 7" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Demo from '@/components/demo'
import data from './data'
import GetApiSignature from './components/getApiSignature.vue'
import OpenAppLinkClient from './components/openAppLinkClient.vue'
import HandleUploadImage from './components/handleUploadImage.vue'
import HandleGoBack from './components/handleGoBack.vue'
import HandleDialTel from './components/handleDialTel.vue'
import SetNavBarStatus from './components/setNavBarStatus.vue'
import GetNativeNetStatus from './components/getNativeNetStatus.vue'
import ShowShare from './components/showShare.vue'

@Component({
  components: {
    GetApiSignature,
    OpenAppLinkClient,
    HandleUploadImage,
    HandleGoBack,
    HandleDialTel,
    SetNavBarStatus,
    GetNativeNetStatus,
    ShowShare
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
