<template>
  <div class="plat-content">
    <TopBar barColor="black" title="奔驰平台热度" />
      <ul class="platform-item">
        <li class="flex-box flex-between" v-for="item in platformList" :key="item.platformId">
          <div class="flex-box">
            <img :src="item.platformLogo.url" >
            <div class="item-centers">
              <p class="values flex-box flex-between"><span v-for="it in item.platformValueList" :key="it.name">{{it.name}} {{it.value}}</span></p>
              <p class="texts">{{item.platformNotice}}</p>
            </div>
          </div>

          <router-link to="" class="arrow">
            <van-icon name="arrow" size="14" />
          </router-link>
        </li>
      </ul>
      <div class="submit-button">
        <router-link to="" class="to-link" >查看详细报告</router-link>
      </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import TopBar from '@/components/topBar'
import { toast } from '@/util/toast'
import { brandPlatList } from './data'

@Component({
  components: {
    [Icon.name]: Icon,
    TopBar
  }
})
export default class Main extends Vue {
  /** 平台热度 id, 类型，名字，时间 */
  @Prop({ type: Number, default: 0}) id!: number
  @Prop({ type: String, default: ''}) type!: string
  @Prop({ type: String, default: ''}) name!: string
  @Prop({ type: String, default: ''}) startTime!: string
  @Prop({ type: String, default: ''}) endTime!: string

  platformList = []
  mounted() {
    this.list()
  }

  async list() {
    try {
      const {data: {platformList}} = await brandPlatList({
        brandId: 1,
        pageIndex: 2,
        startTime: 20200304,
        endTime: 20200310
      })
      this.platformList = platformList
    } catch (ex) {
      toast(ex)
    }
  }
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';
@import '~@/components/hotLine/platform.less';
.plat-content {
  padding: 0 30px 30px;
}
.platform-item {
  li {
    border-top: solid 1px @c-divider;
    border-bottom: none;
    &:last-child {
      border-bottom: solid 1px @c-divider;
    }
  }
}

</style>
