<template>
  <div class="event-content">
    <ModuleHeader :title="title" :link="hasMore ? link : null" />
    <ul v-if="list.length" class="eventlist">
      <li
        v-for="(item,index) in list.slice(0,3)"
        :key="item.eventId +''+ index"
        @click="goEventDetail(item)"
      >
        <p class="datebox">
          <span class="days" v-if="item.creatDay">{{item.creatDay}}</span>
          <span class="date" v-else>{{item.creatDate}}</span>
          <i
            v-for="(el,i) in (item.targetList || []).slice(0,3)"
            :key="el.targetCode+''+i"
            :style="{color:el.color,borderColor:el.color}"
            class="target"
          >{{el.targetName}}</i>
        </p>
        <h5 class="texts van-ellipsis">{{item.eventName}}</h5>
        <p class="flex-box">
          <span
            v-for="(it,index) in item.interactiveList.slice(0,3)"
            :key="it.interactiveUrl.url +''+ index"
            :style="{display:it.interactiveValue ? '' :'none' }"
            class="counts flex-box"
          >
            <span v-if="it.interactiveValue">
              <img :src="it.interactiveUrl.url" width="15" />
              <i>{{it.interactiveValue}}</i>
            </span>
          </span>
        </p>
      </li>
    </ul>
    <DataEmpty v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import moment from 'moment'
import ModuleHeader from '@/components/moduleHeader'
import { openAppLink, AppLink } from '@/util/native'
import { datetimeParse } from '@/fn/dateUtil'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    ModuleHeader,
    DataEmpty
  }
})
export default class EventList extends Vue {
  @Prop({ type: Object }) params!: any
  /** 事件list */
  @Prop({ type: Object, default: {} }) eventList!: any
  @Prop({ type: String, default: '营销事件' }) title!: any
  @Prop({ type: Object }) link!: AppLink

  get list() {
    const list =
      this.eventList && this.eventList.eventList ? this.eventList.eventList : []
    list.length &&
      list.map((it: any) => {
        const time1 = Math.abs(moment(it.createTime).diff(moment(), 'day'))
        // 前10天显示 N 天前
        it.creatDay = time1 > 10 ? null : datetimeParse(it.createTime)
        it.creatDate = moment(it.createTime).format('YYYY-MM-DD')
        // 处理标签颜色
        it.targetList = it.targetList == null ? [] : it.targetList
        if (it.targetList && it.targetList.length) {
          for (const item of it.targetList) {
            // 1 热点  0 负面
            switch (item.targetCode) {
              case 1:
                item.color = '#FF6262'
                break
              case 0:
                item.color = '#9374DB'
                break
              default:
                item.color = '#666'
            }
          }
        }
        return {
          ...it
        }
      })
    return list
  }

  // 原需求是，本业务事件大于3个才显示更多箭头
  get hasMore() {
    const isCount =
      this.eventList && this.eventList.hasMore ? this.eventList.hasMore : false
    return isCount
  }

  // 去营销事件详情面
  goEventDetail(item: any) {
    this.$router.push({
      name: 'sentimenteventmarketing',
      params: {
        eventId: item.eventId
      },
      query: {
        title: item.eventName
      }
    })
  }
}
</script>

<style lang='less' scoped>
.event-content {
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 0;
}

.module-header {
  padding: 0 30px;
}
.eventlist {
  padding: 30px 30px 0;
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
