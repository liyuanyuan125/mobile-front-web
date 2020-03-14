<template>
  <!-- 电影电视剧详情页 出品发行公司 -->
  <div class="producemod">
    <h3>
      出品发行
      <van-icon name="arrow" size="20" color="#c8c6c4" />
    </h3>
    <dl class="companylist">
      <dd v-for="(item,index) in produceList" :key="item + index">{{item}}</dd>
    </dl>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'

@Component({
  components: {
    [Icon.name]: Icon
  }
})
export default class ProduceList extends Vue {
  /** 发行公司 */
  @Prop({ type: Array }) produceList!: string[]

  mounted() {
    // todo
  }
}
</script>

<style lang='less' scoped>
// 主创人员
.producemod {
  background: #fff;
  border-bottom: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 0;

  h3 {
    font-size: 40px;
    line-height: 40px;
    padding: 0 0 30px 30px;
    font-weight: normal;
    position: relative;
    i {
      position: absolute;
      right: 30px;
      top: 0;
    }
  }

  .companylist {
    padding: 0 30px;
    margin-top: 5px;
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
