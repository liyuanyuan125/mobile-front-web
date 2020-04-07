<template>
  <!--影片用户分析受众下的观影偏好 -->
  <div class="progressbox">
    <moduleHeaer :title="title" />
    <div v-if="progressData.length">
      <div class="contrast-progress" v-for="(item,index) in progressData" :key="item.name + index">
        <span class="proleft van-ellipsis">{{item.name}}</span>
        <div class="progress">
          <Progress :percentage="item.value" color="#7CA4FF" stroke-width="10" />
        </div>
        <div class="proright" style="fontFamily:'DIN Alternate'">{{item.value}}%</div>
      </div>
    </div>
    <dataEmpty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Progress } from 'vant'
import moduleHeaer from '@/components/moduleHeader'
import dataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    Progress,
    moduleHeaer,
    dataEmpty
  }
})
export default class ProgressList extends ViewBase {
  @Prop({ type: Array }) progressData!: any[]
  @Prop({ type: String }) title!: any[]
}
</script>

<style lang="less" scoped>
.progressbox {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 30px;
  h3 {
    font-size: 40px;
    line-height: 40px;
    padding-bottom: 30px;
  }
}
.contrast-progress {
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  .progress {
    flex: 1;
    margin: 0 30px;
  }
  .proleft {
    font-size: 26px;
    width: 140px;
  }
  /deep/ .van-progress__pivot {
    display: none;
  }
  .proright {
    color: #88aaf6;
    font-size: 30px;
    font-weight: bold;
    text-align: right;
    width: 90px;
    white-space: nowrap;
  }
}
</style>
