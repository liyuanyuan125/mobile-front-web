<template>
  <div class="plat-min-height">
      <ModuleHeader title="平台热度" class="formatmodule" v-if="dataList.length < 3"/>
      <ModuleHeader title="平台热度"  class="formatmodule" :link="link" v-else/>

      <loadingCom v-if="!platLoing" />
      <ul class="platform-item" v-else-if="platLoing && platformList.length">
        <li
          class="flex-box flex-between"
          v-for="(item, index) in dataList"
          :key="item.platformId"
          v-if="index < 3"
          @click="goPlatformDetail(item)"
        >
          <div class="flex-box">
            <div class="plat-left">
              <img :src="item.coverImg" v-if="item.coverImg" />
              <img v-else src="@/assets/platform-default-icon.png" width="60" height="60" />
              <div class="name van-ellipsis">{{item.platformName}}</div>
            </div>
            
            <div class="item-centers">
              <p class="values flex-box flex-between">
                <span v-for="(it, index) in item.platformValueList" :key="it.name" v-if="index < 2">
                  {{it.name}} {{it.value || '-'}}
                </span>
              </p>
              <p class="texts">{{item.platformNotice}}</p>
            </div>
          </div>
        </li>
      </ul>
    <DataEmpty v-else="platLoing && platformList.length == 0"/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import ModuleHeader from '@/components/moduleHeader'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import { openAppLink, AppLink } from '@/util/native'
import { imgFixed } from '@/fn/imgProxy'
import loadingCom from '@/components/loading/index.vue'

@Component({
  components: {
    [Icon.name]: Icon,
    ModuleHeader,
    DataEmpty,
    loadingCom
  }
})
export default class Main extends Vue {
  /** 平台热度list */
  @Prop({ type: Array, default: () => [] }) platformList!: any
  /** 类型，id，天数， 开始/结束时间 五个参数 跳转更多二级页 */
  @Prop({ type: Object }) params!: any
  @Prop({ type: Boolean, default: true}) platLoing: any

  get dataList() {
   const list = (this.platformList || []).map((it: any) => {
     return {
       ...it,
       coverImg: imgFixed(it.platformLogo, 60, 60)
     }
    })
    return list
  }
  get link() {
    return {
      name: 'platform-detail',
      params: this.params
    }
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
.plat-min-height {
  min-height: 360px;
  position: relative;
}
.title {
  padding-top: 50px;
}
.formatmodule {
  margin-top: 50px;
  /deep/ .module-title {
    color: #303030;
    font-size: 34px !important;
    line-height: 40px;
  }
}
.plat-left {
  width: 120px;
  text-align: center;
  .name {
    font-size: 20px;
    color: #4a4a4a;
  }
}
</style>
