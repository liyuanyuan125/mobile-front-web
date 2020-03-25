<template>
  <div>
    <ModuleHeader title="平台热度" class="formatmodule" :link="link" />
    <ul class="platform-item">
      <li
        class="flex-box flex-between"
        v-for="item in platformList"
        :key="item.platformId"
        @click="goPlatformDetail(item)"
      >
        <div class="flex-box">
          <img :src="item.platformLogo.url" />
          <div class="item-centers">
            <p class="values flex-box flex-between">
              <span v-for="it in item.platformValueList" :key="it.name">{{it.name}} {{it.value}}</span>
            </p>
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
import { openAppLink, AppLink } from '@/util/native'

@Component({
  components: {
    [Icon.name]: Icon,
    ModuleHeader
  }
})
export default class Main extends Vue {
  /** 平台热度list */
  @Prop({ type: Array, default: () => [] }) platformList!: any
  /** 类型，id，天数， 开始/结束时间 五个参数 跳转更多二级页 */
  @Prop({ type: Object }) params!: any

  link: any = {
    name: 'platform-detail',
    params: this.params
  }

  // 去原生app评台详情页
  goPlatformDetail(item: any) {
    let url: AppLink = {
      page: 'platformHotDetail',
      businessType: this.params.type,
      businessObjectId: this.params.id,
      platformCode: item.platformId,
      startTime: this.params.startTime,
      endTime: this.params.endTime
    }
    // 100=全网事件 101=营销事件 app端将事件和业务的平台详情页分成了两个页
    if (this.params.type === 100 || this.params.type === 101) {
      url = {
        page: 'eventPlatformHotDetail',
        eventType: this.params.type,
        eventId: this.params.id,
        platformCode: item.platformId
      }
    }

    openAppLink(url)
  }
}
</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';
@import '~@/components/hotLine/platform.less';
.title {
  padding-top: 50px;
}
.formatmodule {
  margin-top: 50px;
  .module-title {
    font-size: 34px !important;
    line-height: 40px;
    font-weight: normal;
  }
}
</style>
