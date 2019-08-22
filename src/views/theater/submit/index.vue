<template>
  <div class="submit">
    <div class="bg">
      <em :class="show == '1' ? 'check' : 'ready'"></em>
    </div>
    <div class="text">
      <div class="mid">{{show == '1' ? '账号申请已提交，请等待审核人员审核通过.' : '您已开通鲸娱帐号,如需开通广告商平台帐号请与工作人员联系.'}}</div>
      <div class="tip">
        <p>联系客服</p>
        <p>QQ: 1728252212</p>
        <p>电话: 13718668880</p>
        <p>邮箱: webcpy@163.com</p>
      </div>
      <button>确定</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class SubmitPage extends Vue {
    show: any = ''

    mounted() {
      this.show = this.$route.query.show
    }

  }
</script>

<style lang="less" scoped>
  @import 'less/common.less';
</style>
