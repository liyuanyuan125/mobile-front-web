<template>
  <div class="event-content">
    <ModuleTitle title="营销事件" />
    <ul class="eventlist">
      <li v-for="(item,index) in List" :key="item.eventId + index">
        <p class="datebox">
          <span class="days">{{item.creatDay}}</span>
          <!-- <span class="date">{{item.creatTime}}</span> -->
          <i
            v-for="el in item.target"
            :key="el.targetCode"
            :style="{color:el.color,borderColor:el.color}"
            class="target"
          >{{el.targetName}}</i>
        </p>
        <h5 class="texts">{{item.eventName}}</h5>
        <p class="flex-box">
          <span
            v-for="(it,index) in item.interactiveList"
            :key="it.interactiveUrl.url + index"
            class="counts flex-box"
          >
            <img :src="it.interactiveUrl.url" width="15" />
            <i>{{it.interactiveValue}}</i>
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import moment from 'moment'
import ModuleTitle from '@/components/sentimentTitle'

@Component({
  components: {
    ModuleTitle
  }
})
export default class EventList extends Vue {
  @Prop({ type: Object }) params!: any
  /** 事件list */
  @Prop({ type: Array, default: () => [] }) eventList!: any

  get List() {
    const list = this.eventList.map((it: any) => {
      const time1 = Math.abs(moment(it.creatTime).diff(moment(), 'day'))
      // 前10天显示 N 天前
      const days = time1 == 0 ? '今天' : `${time1}天前`
      const creatDay = time1 < 11 ? `${days}` : moment(it.creatTime).format('YYYY-MM-DD')
      // 处理标签颜色
      for (const item of (it.target || [])) {
        switch (item.targetCode) {
          case '1':
            item.color = '#FF6262'
            break
          case '2':
            item.color = '#9374DB'
            break
          default:
            item.color = '#666'
        }
      }
      return {
        ...it,
        creatDay
      }
    })
    return list
  }
}
</script>

<style lang='less' scoped>
.event-content {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 0;
}
.eventlist {
  padding: 0 30px;
  li {
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 20px;
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
    .texts {
      padding: 14px 0;
      font-size: 32px;
      line-height: 50px;
      font-weight: normal;
    }
    .counts {
      color: rgba(48, 48, 48, 0.4);
      font-size: 26px;
      width: 33%;
      line-height: 30px;
      img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
  .datebox {
    font-size: 26px;
    line-height: 32px;
  }
  .days {
    color: #88aaf6;
    font-size: 26px;
    margin-right: 30px;
    font-weight: bold;
  }
  .date {
    color: #9f9c9a;
    font-size: 26px;
  }
  .target {
    border: 2px solid #666;
    border-radius: 4px;
    font-size: 22px;
    line-height: 29px;
    padding: 0 11px;
    margin-left: 30px;
  }
}
</style>
