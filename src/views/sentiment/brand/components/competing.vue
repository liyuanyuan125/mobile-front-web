<template>
  <div class="compet-content">
    <div class="title">竞品分析
      <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
    </div>
    <ul>
      <li class="flex-box">
        <div class="parse-left">
          <img :src="list[0].rivaCover.url"/>
          <p>{{list[0].rivalName}}</p>
        </div>
        <div class="parse-right flex-box">
          <div>
            <p class="col_8f flex-box">
              <span class="pad-right">昨日热度</span>
              <span>昨日互动量</span>
            </p>
            <h5 class="flex-box numbers">
              <span class="pad-right">{{list[0].yesterHeatCount}}</span>
              <span>{{list[0].yesterInteractCount}}</span>
            </h5>
          </div>
        </div>
      </li>
      <li class="flex-box">
        <div class="parse-left">
          <img :src="list[1].rivaCover.url"/>
          <p>{{list[1].rivalName}}</p>
        </div>
        <div class="parse-right flex-box">
          <div>
            <h5 class="flex-box numbers">
              <span class="pad-right trend-head">
                {{list[1].yesterHeatTrend}}
                <i>低1</i>
              </span>
              <span class="trend-interact">
                {{list[1].yesterInteractTrend}}
                <i>高2</i>
              </span>
            </h5>
            <p class="event-name">{{list[1].eventName}}{{list[1].eventCreatTime}}</p>
          </div>
        </div>
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
  list = [
    {
      rivaCover: {
        url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
        source: 'jydata'
      },
      rivalId: null,
      rivalName: '当前品牌',
      yesterHeatCount: 2333,
      yesterHeatTrend: 22,
      yesterInteractCount: 2222,
      yesterInteractTrend: 233,
      eventName: '',
      eventCreatTime: 12233333,
    },
    {
      rivaCover: {
        url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
        source: 'cccc'
      },
      rivalId: 10, // 有id则有事件 跳转到二级详情页
      rivalName: '竞品品牌',
      yesterHeatCount: 2333,
      yesterHeatTrend: 22,
      yesterInteractCount: 2222,
      yesterInteractTrend: 233,
      eventName: '宝马发布新3系PH',
      eventCreatTime: moment(1583743918613).format('YYYY-MM-DD'), // moment().valueOf()转为时间戳
    },
  ]

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
.col_8f {
  color: @c-sub-text;
  padding: 20px 0 35px 0;
}
li {
  color: #000;
  font-size: 26px;
  padding: 40px 0;
  border-bottom: solid 1px rgba(216, 216, 216, 0.5);
}
.parse-left {
  width: 160px;
  text-align: center;
  margin-right: 30px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.parse-right {
  span {
    display: inline-block;
    min-width: 140px;
  }
  .pad-right {
    margin-right: 150px;
  }
  .numbers {
    font-size: 36px;
    i {
      font-weight: 0;
      font-size: 26px;
    }
  }
  .trend-head {
    color: #7ca4ff;
  }
  .trend-interact {
    color: #ff6262;
  }
  .event-name {
    background-color: #f9f9f9;
    border-radius: 20px;
    font-size: 26px;
    padding: 17px 10px 17px 36px;
    margin-top: 30px;
    position: relative;
    &::before {
      display: block;
      width: 16px;
      height: 16px;
      content: '';
      background: #f7a345;
      border-radius: 50%;
      position: absolute;
      left: 10px;
      top: 26px;
      z-index: 2;
    }
  }
}

</style>
