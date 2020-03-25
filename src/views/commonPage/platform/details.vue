<template>
  <div class="plat-content">
    <SentimentBar :title="title" :titleShow="true" />
      <ul class="platform-item">
        <li class="flex-box flex-between"
          v-for="item in platformList" 
          :key="item.platformId"
          @click="goPlatformDetail(item)"
        >
          <div class="flex-box">
            <img :src="item.platformLogo.url" alt="" >
            <div class="item-centers">
              <p class="values flex-box flex-between"><span v-for="it in item.platformValueList" :key="it.name">{{it.name}} {{it.value}}</span></p>
              <p class="texts">{{item.platformNotice}}</p>
            </div>
          </div>
          <router-link to="" class="arrow">
            <van-icon name="arrow" size="20" />
          </router-link>
        </li>
      </ul>
      <!-- <div class="submit-button">
        <router-link to="" class="to-link" >查看详细报告</router-link>
      </div> -->
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { toast } from '@/util/toast'
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
    SentimentBar
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
      this.platformList = res.data.platformList || []
    } catch (ex) {
      toast(ex)
    }
  }
  // 去原生app评台详情页
  goPlatformDetail(item: any) {
    const url: AppLink = {
      page: 'platformHotDetail',
      businessType: this.type,
      businessObjectId: this.id,
      platformCode: item.platformId,
      startTime: this.startTime,
      endTime: this.endTime
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

</style>
