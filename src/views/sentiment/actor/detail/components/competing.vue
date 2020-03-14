<template>
  <div class="compet-content">
    <div class="title">相似艺人
      <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
    </div>
    <ul>
      <li class='li-item'>
        <div class='li-left'>
          <div>
            <img src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg" alt="">
          </div>
        </div>
        <div class='li-right'>111</div>
      </li>
      <li class='li-item'>
        <div class='li-left'>
          <div>
            <img src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg" alt="">
          </div>
        </div>
        <div class='li-right'>111</div>
      </li>
    </ul>
    <div class="submit-button">
      <router-link to="" class="to-link" >查看详细报告</router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'

@Component({
  components: {
    [Icon.name]: Icon,
  }
})
export default class Main extends Vue {

  mounted() {
    // console.log(moment(1583743918613).format('YYYY-MM-DD'))
    // console.log(moment().valueOf()) // 1583743918613
  }
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';

.compet-content {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 60px 30px 10px;
}
.li-item {
  height: 300px;
  border: 1px solid red;
  padding-top: 7%;
  .li-left {
    width: 35%;
    height: 100%;
    float: left;
    div {
      width: 200px;
      height: 200px;
      margin: auto;
      border-radius: 5px;
      border: 1px solid red;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
  .li-right {
    float: left;
    width: 65%;
    height: 100%;
  }
}

</style>
