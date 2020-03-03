<template>
  <div class='pages'>
      <!-- <div  class='back'></div> -->
      <!-- <h4 >我是kol艺人详情hah呜呜呜a→</h4> -->
      <!-- http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg -->
      <div class='maintop'>
        <div class="reBack"></div>
        <div class='title'>{{title}}&nbsp;用户分析</div>
        <div class='search'></div>
      </div>
      <div class='age'>
        <UserPortrait :userAges="detail.userAges" :userGender="detail.userGender" />
      </div>
      
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import UserPortrait from './components/userPortrait.vue'
import { getMovieDetail } from '@/api/advertiser'
import { toast } from '@/util/toast'

@Component({
  components: {
    UserPortrait,
  }
})
export default class KolPage extends ViewBase {
  title  = '欧阳娜娜'

  detail: any = null

  created() {
    const mid = this.$route.params.kolId
    this.getDetail()
    document.body.style.background = '#FBFBFB'
  }

  async getDetail() {
    try {
        this.detail = {
          userAges: [
            {
              range: '男',
              value: 40.9,
            },
            {
              range: '女',
              value: 59.1,
            }
          ],
          userGender: [
            {
              type: '男',
              value: 40.9,
            },
            {
              type: '女',
              value: 59.1,
            }
          ]
        }
    } catch (ex) {
      toast(ex)
    }
  }

}
</script>

<style lang="less" scoped>
@import './less/main.less';
.pages {
  width: 100%;
}
.left {
  float: left;
}
.right {
  float: right;
}
.maintop {
  width: 750px;
  height: 188px;
  padding-top: 39px;
  background: rgba(247,247,249,1);
  div {
    display: inline-block;
    // float: left;
  }
  .title {
    width: 300px;
    height: 50px;
    font-size: 36px;
    font-weight: 500;
    color: rgba(48,48,48,1);
    line-height: 50px;
    margin-left: 28%;
  }
  .reBack {
    width: 88px;
    height: 88px;
    position: absolute;
    left: 0;
    top: 19px;
    &::after {
      content: '';
      width: 22px;
      height: 22px;
      border-left: 4px solid #000;
      border-bottom: 4px solid #000;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  .search {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    float: right;
    margin-right: 5%;
  }
}


</style>
