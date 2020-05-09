<template>
  <!-- 电影电视剧详情页 出品发行公司 -->
  <div class="producemod">
    <ModuleHeader
      title="出品发行"
      :link="produceList.length ? link : null"
      @click.native="talkingData"
    />
    <dl class="companylist" v-if="produceList.length">
      <dd v-for="(item,index) in produceList" :key="item + index" class="van-ellipsis">{{item}}</dd>
    </dl>
    <dataEmpty v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DetailItem } from './types'
import ModuleHeader from '@/components/moduleHeader'
import { AppLink } from '@/util/native'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { talkingdataDetailHandle } from '@/util/TDEvent'

@Component({
  components: {
    ModuleHeader,
    dataEmpty
  }
})
export default class ProduceList extends Vue {
  /** 发行公司 */
  @Prop({ type: Array }) produceList!: string[]
  @Prop({ type: Object }) link!: AppLink

  // talkingdata 埋点统计
  talkingData() {
    if (this.produceList.length) {
      talkingdataDetailHandle(this.link.businessType, '出品发行_查看更多')
    }
  }
}
</script>

<style lang='less' scoped>
// 主创人员
.producemod {
  background: #fff;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 0;
  .module-header {
    padding: 0 30px;
  }

  .companylist {
    padding: 0 30px;
    margin-top: 30px;
  }

  dd {
    border-bottom: 1px solid rgba(216, 216, 216, 0.6);
    line-height: 100px;
    font-size: 30px;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
