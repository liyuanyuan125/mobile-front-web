<template>
  <div>
      <div class="title">平台热度
        <router-link class="to-more" :to="{
          name: 'platform-detail',
          params: {
            id: params.id,
            name: params.name,
            type: params.type,
            startTime: params.startTime,
            endTime: params.endTime
          }
        }" >查看更多<van-icon name="arrow" class="arrow" size="15" /></router-link>
      </div>
      <!-- <ModuleHeader 
       title="平台热度"
       tag="h5" 
       moreText="查看更多"
       :link="{ page: 'platform-detail',
       params: {
            id: params.id,
            name: params.name,
            type: params.type,
            startTime: params.startTime,
            endTime: params.endTime
        }}"/> -->
      <ul class="platform-item">
        <li class="flex-box flex-between" v-for="item in platformList" :key="item.platformId">
          <div class="flex-box">
            <img :src="item.platformLogo.url" >
            <div class="item-centers">
              <p class="values flex-box flex-between"><span v-for="it in item.platformValueList" :key="it.name">{{it.name}} {{it.value}}</span></p>
              <p class="texts">{{item.platformNotice}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import ModuleHeader from '@/components/moduleHeader'

@Component({
  components: {
    [Icon.name]: Icon,
    ModuleHeader
  }
})
export default class Main extends Vue {
  /** 平台热度list */
  @Prop({ type: Array, default: () => []}) platformList!: any
  /** 类型，id，天数， 开始/结束时间 五个参数 跳转更多二级页 */
  @Prop({ type: Object }) params!: any
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';
@import '~@/components/hotLine/platform.less';
.title {
  padding-top: 50px;
}
</style>
