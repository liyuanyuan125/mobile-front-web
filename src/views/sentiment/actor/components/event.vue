<template>
  <div class="event-content">
    <div class="title">事件分析
      <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
    </div>
    <ul>
      <li v-for="item in list" :key="item.eventId" class="flex-box flex-between">
        <div>
          <p :class="item.timesColor">{{item.creatTime}}</p>
          <h5 class="texts">{{item.eventName}}</h5>
          <p class="flex-box">
            <span v-for="it in item.interactiveList" class="counts flex-box">
              <img :src="it.url" width="15" />
              <i>{{it.text}}</i>
            </span>
          </p>
        </div>
        <div>
          <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
        </div>
      </li>
    </ul>
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
  get list() {
    const time1 = Math.abs(moment(1582897820984).diff(moment(), 'day'))
    const creatTime = time1 < 11 ? `${time1}天前` : moment(1583154943041).format('YYYY-MM-DD')
    const timesColor = time1 < 11 ? 'col-days' : 'col-date'
    return [
      {
        eventId: 1,
        eventName: '四川一辅警开奔驰强行闯关被辞',
        creatTime,
        timesColor,
        target: ['正面'],
        interactiveList: [
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '10万+'
          },
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '200万+'
          },
        ]
      },
      {
        eventId: 2,
        eventName: 'xxx',
        creatTime,
        timesColor,
        target: ['正面'],
        interactiveList: [
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '10万+'
          },
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '80万+'
          },
        ]
      },
   ]
  }

}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '../less/com.less';

.event-content {
  margin: 20px 0;
  background-color: #fff;
  padding: 60px 30px 68px;
}
.col-days {
  color: #7ca4ff;
  font-size: 26px;
}
.col-date {
  color: rgba(71, 64, 59, .5);
  font-size: 26px;
}
li {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
  margin-top: 30px;
  .texts {
    padding: 20px 0;
  }
  .counts {
    color: rgba(48, 48, 48, 0.5);
    font-size: 24px;
    padding-right: 20px;
    img {
      margin-right: 15px;
    }
  }
}
</style>
