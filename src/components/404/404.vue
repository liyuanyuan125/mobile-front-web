<template>
  <div>
    <SentimentBar :title="title" titleShow />
    <div class="page403" v-if="pageCode === 10403">
      <span></span>
      <p>
        你还未开通该模块的服务
        <br />请联系客服开通 4006050606
      </p>
    </div>
    <div class="page404" v-if="pageCode !== 10403 || pageCode !== 10405">
      <span></span>
      <p>报歉，你查找的信息不存在</p>
    </div>
    <div class="page405" v-if="pageCode === 10405">
      <span></span>
      <p>
        该信息已经后台关闭
        <br />暂时无法查看
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { handleGoBack } from '@/util/native'
import SentimentBar from '@/views/common/sentimentBar/index.vue'

@Component({
  components: {
    SentimentBar
  }
})
export default class TopBar extends Vue {
  /**
   * 属性示例
   * -10000 未登录
   * 10404  页面不存在
   * 10405  页面被禁用
   * 10403  无权限
   */
  @Prop({ type: Number, default: 10404 }) code!: number

  title: string = '' // 页面 title
  pageCode: number = 0 // 页面码

  created() {
    switch (this.code) {
      case 10403:
        this.title = '未开通服务'
        break
      case 10405:
        this.title = '信息已被关闭'
        break
      default:
        this.title = '信息不存在'
    }
  }
}
</script>

<style scoped lang="less">
.topbar {
  height: 88px;
  line-height: 88px;
  position: relative;
}
.title {
  color: #fff;
  font-size: 32px;
  text-align: center;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 88px;
  overflow: hidden;
}
.reBack {
  width: 88px;
  height: 88px;
  position: absolute;
  left: 0;
  top: 0;
  &::after {
    content: '';
    width: 22px;
    height: 22px;
    border-left: 4px solid #fff;
    border-bottom: 4px solid #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
.black {
  .title {
    color: #1e386f;
  }
  .reBack {
    &::after {
      border-color: #1e386f;
    }
  }
}
</style>
