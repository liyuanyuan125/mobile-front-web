<template>
  <!-- 传播路径 营网事件详情页和营销事件详情页 -->
  <div class="eventspread">
    <ModuleHeader title="传播路径" :link="dataList.length < 3 ? null : link" />
    <dl class="spreadlist" v-if="dataList.length">
      <dd v-for="(item,index) in list" :key="item.spreadId + index" @click="openWithoutApp(item)">
        <img
          :src="item.platformInfo.imgUrl"
          class="platformlogo"
          :alt="item.platformInfo.platformName"
        />
        <div class="spread">
          <div class="datebox">
            <p>
              <span class="days" v-if="item.topicInfo.publishTime">10天前</span>
              <span class="date" v-else>{{item.topicInfo.creatDate}}</span>
              <i
                class="target"
                v-for="it in item.markList"
                :key="it.markType"
                :style="{color:it.color,borderColor:it.color}"
              >{{it.markValue}}</i>
            </p>
            <p class="user">
              {{item.userInfo.userName}}
              <img
                :src="item.userInfo.imgUrl"
                :alt="item.userInfo.userName"
              />
            </p>
          </div>
          <h5 class="texts">{{item.topicInfo.content}}</h5>
          <p class="flex-box">
            <span class="counts flex-box" v-for="(ele,index) in item.interactiveList" :key="index">
              <img :src="ele.interactUrl" width="15" />
              <i>{{ele.interactiveValue}}</i>
            </span>
          </p>
        </div>
      </dd>
    </dl>
    <dataEmpty v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { datetimeParse } from '@/fn/dateUtil'
import { DetailItem } from './types'
import ModuleHeader from '@/components/moduleHeader'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { imgFixed } from '@/fn/imgProxy'
import { openAppLink, AppLink } from '@/util/native'

@Component({
  components: {
    ModuleHeader,
    dataEmpty
  }
})
export default class SpreadList extends Vue {
  /** 传播路径 */
  @Prop({ type: Array }) dataList!: any[]
  @Prop({ type: Object }) link!: AppLink

  get list() {
    const list = this.dataList ? this.dataList : []
    list.length &&
      list.map((it: any) => {
        const time1 = Math.abs(moment(it.topicInfo.publishTime).diff(moment(), 'day'))
        // 前10天显示 N 天前
        it.topicInfo.creatDay = datetimeParse(it.createTime)
        it.topicInfo.creatDate = moment(it.createTime).format('YYYY-MM-DD')
        // 处理图片
        it.platformInfo.imgUrl = imgFixed(it.platformInfo.avatarUrl)
        it.userInfo.imgUrl = imgFixed(it.userInfo.avatarUrl)
        // 处理标签颜色
        if (it.markList && it.markList.length) {
          for (const item of it.markList) {
            switch (item.markType) {
              case 1:
                item.color = '#FF6262'
                break
              case 2:
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

  // app外打开url
  openWithoutApp(item: any) {
    const link: AppLink = {
      page: 'h5Page',
      url: encodeURIComponent(item.topicInfo.sourceLink),
      isOpenByBrowser: true // 设置 url 是否在 app外打开
    }
  }
}
</script>

<style lang='less' scoped>
// 主创人员
.eventspread {
  background: #fff;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 0 0;
  .module-header {
    padding: 0 30px;
  }

  .spreadlist {
    margin: 50px 30px;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: 22px;
      top: 20px;
      bottom: 0;
      border-left: 1px dashed #979797;
      z-index: 1;
    }
  }

  dd {
    margin-bottom: 30px;
    position: relative;
    padding-left: 62px;
    z-index: 2;
    .platformlogo {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 12px solid #fff;
      position: absolute;
      left: -12px;
      top: 18px;
      box-sizing: content-box;
    }
  }
  .spread {
    background: rgba(242, 243, 246, 0.5);
    border-radius: 20px;
    padding: 30px;
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
    .datebox {
      font-size: 26px;
      line-height: 32px;
      display: flex;
      p:first-child {
        flex: 1;
      }
      .user {
        font-size: 26px;
        color: rgba(71, 64, 59, 0.5);
        line-height: 40px;
        img {
          width: 40px;
          height: 40px;
          margin-left: 10px;
          vertical-align: middle;
          border-radius: 50%;
          margin-top: -2px;
        }
      }
    }
    .days {
      color: #88aaf6;
      font-size: 26px;
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
}
</style>
