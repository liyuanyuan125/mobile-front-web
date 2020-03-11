<template>
  <div class="user-content">
    <div class="title">用户分析
      <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon, Toast } from 'vant'

@Component({
  components: {
    [Icon.name]: Icon
  }
})
export default class Main extends Vue {
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '../less/com.less';

.user-content {
  background-color: #fff;
  padding: 60px 30px 10px;
}
</style>
