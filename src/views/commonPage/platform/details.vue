<template>
  <div class="plat-content">
    <SentimentBar :title="title" :titleShow="true" />

      <loadingCom v-if="!flag" />
      <ul class="platform-item" v-else-if="flag && platformList.length">
        <li class="flex-box flex-between"
          v-for="item in platformList" 
          :key="item.platformId"
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
          <router-link to="" class="arrow">
            <van-icon name="arrow" size="20" />
          </router-link>
        </li>
      </ul>
      <DataEmpty v-else="flag && platformList.length == 0"/>

      <!-- <div class="submit-button">
        <router-link to="" class="to-link" >查看详细报告</router-link>
      </div> -->
      
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { imgFixed } from '@/fn/imgProxy'
import { toast } from '@/util/toast'
import loadingCom from '@/components/loading/index.vue'
import {
  brandPlatList,
  actorPlatList,
  songPlatList,
  tvPlatList,
  moviePlatList,
  eventPlatList,
  marketPlatList
} from './data'
import { openAppLink, AppLink } from '@/util/native'

@Component({
  components: {
    [Icon.name]: Icon,
    SentimentBar,
    DataEmpty,
    loadingCom
  }
})
export default class Main extends Vue {
  /** 平台热度 id, 类型，名字，时间 */
  @Prop({ type: Number, default: 0}) id!: number
  @Prop({ type: Number, default: ''}) type!: number
  @Prop({ type: String, default: ''}) name!: string
  @Prop({ type: Number, default: ''}) startTime!: number
  @Prop({ type: Number, default: ''}) endTime!: number

  platformList = []
  flag = false


  get title() {
    return this.name ? `${this.name}平台热度` : '平台热度'
  }

  mounted() {
    this.list()
  }

  async handleTypes() {
    // 1 品牌 2 艺人 3 电影 5 音乐-单曲  4 剧集 100=全网事件 101=营销事件
    const query = {
      sourceId: this.id,
      pageIndex: 1,
      startTime: this.startTime,
      endTime: this.endTime
    }
    switch (this.type) {
      case 1: return await brandPlatList(query)
      case 2: return await actorPlatList(query)
      case 3: return await moviePlatList(query)
      case 4: return await tvPlatList(query)
      case 5: return await songPlatList(query)
      case 100: return await eventPlatList(query)
      case 101: return await marketPlatList(query)
    }
  }

  async list() {
    try {
      const res: any = await this.handleTypes()
      this.platformList = (res.data.platformList || []).map((it: any) => {
        return {
          ...it,
          coverImg: imgFixed(it.platformLogo, 60, 60)
        }
      })
      this.flag = true
    } catch (ex) {
      toast(ex)
      this.flag = true
    }
  }
  // 去原生app评台详情页
  goPlatformDetail(item: any) {
    let url: AppLink = {
      page: 'platformHotDetail',
      businessType: this.type,
      businessObjectId: this.id,
      platformCode: item.platformId,
      startTime: this.startTime,
      endTime: this.endTime
    }

    // 100=全网事件 101=营销事件 app端将事件和业务的平台详情页分成了两个页
    if (this.type === 100 || this.type === 101) {
      url = {
        page: 'eventPlatformHotDetail',
        eventType: this.type,
        eventId: this.id,
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
.plat-content {
  padding: 100px 30px 30px;
}
.platform-item {
  li {
    border-bottom: solid 1px @c-divider;
    &:last-child {
      border-bottom: solid 1px @c-divider;
    }
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
