<template>
  <div class="event-content">
    <div class="title">事件分析
      <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
    </div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'

@Component({
  components: {
    [Icon.name]: Icon,
  }
})
export default class Main extends Vue {
}

</script>

<style lang='less' scoped>
@import '~@/less/lib.less';
@import '../com.less';

.event-content {
  margin: 20px 0;
  background-color: #fff;
  padding: 60px 30px 10px;
}
</style>
