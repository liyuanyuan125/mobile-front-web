<template>
  <div class="user-content">
    <div class="title">用户分析
      <router-link class="to-more" to="" ><Icon name="arrow" size="14" /></router-link>
    </div>
    <UserPortrait :userAges="userDetail.userAges" :userGender="userDetail.userGender" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon, Toast } from 'vant'
import UserPortrait from '@/views/common/user/userPortrait.vue'


@Component({
  components: {
    Icon,
    UserPortrait,
  }
})
export default class Main extends Vue {

  userDetail: any = {
    userAges: [
      {
        type: '男',
        value: 40.9,
      },
      {
        type: '女',
        value: 59.1,
      }
    ],
    userGender: [
      {
        type: '≥19岁',
        value: 40.9,
      },
      {
        type: '20-24',
        value: 59.1,
      },
      {
        type: '25-29',
        value: 40.9,
      },
      {
        type: '30-34',
        value: 40.9,
      },
      {
        type: '35-39',
        value: 40.9,
      },
      {
        type: '≥40岁',
        value: 40.9,
      },
    ]
  }

}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '../less/com.less';

.user-content {
  // height: 200px;
  background-color: #fff;
  padding: 60px 30px 10px;
}
</style>
