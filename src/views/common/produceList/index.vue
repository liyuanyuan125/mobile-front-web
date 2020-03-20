<template>
  <!-- 电影电视剧详情页 出品发行公司 -->
  <div class="producemod">
    <ModuleHeader title="出品发行" :link="link" />
    <dl class="companylist">
      <dd v-for="(item,index) in produceList" :key="item + index">{{item}}</dd>
    </dl>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DetailItem } from './types'
import ModuleHeader from '@/components/moduleHeader'
import { AppLink } from '@/util/native'

@Component({
  components: {
    ModuleHeader
  }
})
export default class ProduceList extends Vue {
  /** 发行公司 */
  @Prop({ type: Array }) produceList!: string[]
  @Prop({ type: Object }) link!: AppLink

  mounted() {
    // todo
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
