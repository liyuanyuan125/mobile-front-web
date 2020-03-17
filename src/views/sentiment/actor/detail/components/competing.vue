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
        <div class='li-right'>
          <div class='name'>玄彬</div>
          <div class='hot'>
            <ul>
              <li>
                <p class='hot1'>昨日热度</p>
                <p class='hot2'>80345</p>
              </li>
              <li>
                <p class='hot1'>昨日互动量</p>
                <p class='hot2'>224</p>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class='li-item-pk'>
        <div class='li-left'>
          <div>
            <img src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg" alt="">
          </div>
        </div>
        <div class='li-right'>
          <div class='name'>玄彬</div>
          <div class='hot'>
            <ul>
              <li>
                <p class='hot1'>热度</p>
                <p class='hot2'>80345</p>
                <p class='blue'>低19</p>
              </li>
              <li>
                <p class='hot1'>全网粉丝数</p>
                <p class='hot2'>224</p>
                <p class='blue'>高504</p>
              </li>
            </ul>
          </div>
          <div class='content'>
            <div class='left'>Swisse品牌代言人</div>
            <div class='right'>2020-02-14</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="submit-button">
      <router-link :to="{ name:'sentimentkolproducts', params: { actorIdList: '1 , 2, 3' } }" class="to-link" >查看详细报告</router-link>
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
.li-item, .li-item-pk {
  height: 290px;
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
    padding-left: 20px;
    .name {
      width: 100%;
      height: 55px;
      font-size: 36px;
      font-weight: 500;
      color: rgba(48, 48, 48, 1);
      line-height: 65px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hot {
      height: 110px;
      ul {
        padding-top: 30px;
        li {
          float: left;
          width: 50%;
        }
        .hot1 {
          font-size: 26px;
          font-weight: 300;
          color: rgba(48, 48, 48, 1);
          line-height: 26px;
        }
        .hot2 {
          font-size: 46px;
          font-weight: bold;
          color: rgba(48, 48, 48, 1);
          line-height: 46px;
          margin-top: 10px;
        }
      }
    }
  }
}
.li-item-pk {
  height: 350px;
  .li-left {
    div {
      width: 200px;
      height: 260px;
      margin: auto;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
  .content {
    width: 90%;
    height: 60px;
    background: rgba(242, 243, 246, 0.5);
    margin-top: 30px;
    font-size: 26px;
    font-weight: 300;
    color: rgba(48, 48, 48, 1);
    line-height: 40px;
    padding: 12px 0 11px 20px;
    .left {
      width: 50%;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .right {
      width: 40%;
      float: right;
      font-size: 22px;
      font-weight: 300;
      color: rgba(48, 48, 48, 1);
    }
  }
}
.blue {
  font-size: 26px;
  font-weight: 600;
  color: rgba(136, 170, 246, 1);
}
.red {
  font-size: 26px;
  font-weight: 600;
  color: rgba(255, 98, 98, 1);
}
.submit-button {
  margin-top: 0;
}
</style>
