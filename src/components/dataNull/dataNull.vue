<template>
  <div class="dataempty" ref="dataempty">
    <TopBar barColor="black" />
    <div class="nodata">
      <i></i>
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { handleGoBack } from '@/util/native'
import TopBar from '@/components/topBar'

@Component({
  components: {
    TopBar
  }
})
export default class DataNull extends Vue {
  /**
   * 属性示例
   */
  // @Prop({ type: String, default: '' }) title!: string

  mounted() {
    const empty = this.$refs.dataempty as HTMLDivElement
    empty.style.height = document.documentElement.clientHeight + 'px'
  }
}
</script>

<style scoped lang="less">
.dataempty {
  position: relative;
}
.nodata {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  i {
    background: url('../../assets/icon-null.png') no-repeat center;
    background-size: contain;
    width: 193px;
    height: 165px;
    display: block;
  }
  p {
    font-size: 35px;
    margin-top: 30px;
  }
}
</style>
