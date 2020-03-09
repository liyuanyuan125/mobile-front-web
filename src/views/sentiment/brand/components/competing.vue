<template>
  <div class="compet-content">
    <div class="title">竞品分析
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
  list = [
    {
      rivaCover: {
        url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
        source: 'cccc'
      },
      rivalName: '品牌',
    }
  ]
}

</script>

<style lang='less' scoped>
@import '~@/less/lib.less';
@import '../com.less';

.compet-content {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 60px 30px 10px;
}
</style>
