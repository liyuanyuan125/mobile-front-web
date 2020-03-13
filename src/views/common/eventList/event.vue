<template>
  <div class="event-content">
    <div class="title">
      {{eventName}}
      <router-link class="to-more" to>
        <van-icon name="arrow" size="20" />
      </router-link>
    </div>
    <ul>
      <li v-for="item in List" :key="item.eventId" class="flex-box flex-between">
        <div>
          <p :class="item.timesColor">{{item.creatTime}}</p>
          <h5 class="texts">{{item.eventName}}</h5>
          <p class="flex-box">
            <span v-for="it in item.interactiveList" :key="it.url" class="counts flex-box">
              <img :src="it.url" width="15" />
              <i>{{it.text}}</i>
            </span>
          </p>
        </div>
        <!-- <div>
          <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
        </div>-->
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'

@Component({
  components: {
    [Icon.name]: Icon
  }
})
export default class Main extends Vue {
  /** 事件title */
  @Prop({ type: String, default: '事件跟踪' }) eventName!: string
  /** 更多事件分析 跳转参数 */
  @Prop({ type: Object }) params!: any
  /** 事件list */
  @Prop({ type: Array, default: () => [] }) eventList!: any

  get List() {
    const list = this.eventList.map((it: any) => {
      const time1 = Math.abs(moment(it.creatTime).diff(moment(), 'day'))
      const creatTime =
        time1 < 11 ? `${time1}天前` : moment(1583154943041).format('YYYY-MM-DD')
      const timesColor = time1 < 11 ? 'col-days' : 'col-date'
      return {
        ...it,
        creatTime,
        timesColor
      }
    })
    return list
  }
}
</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';

.col-days {
  color: #7ca4ff;
  font-size: 26px;
}
.col-date {
  color: rgba(71, 64, 59, 0.5);
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
