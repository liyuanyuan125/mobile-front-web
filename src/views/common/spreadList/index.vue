<template>
  <!-- 传播路径 营网事件详情页和营销事件详情页 -->
  <div class="eventspread">
    <ModuleHeader title="传播路径" :link="link" />
    <dl class="spreadlist">
      <!-- <dd v-for="(item,index) in produceList" :key="item + index" class="van-ellipsis">{{item}}</dd> -->
      <dd>
        <img
          src="https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png"
          class="platformlogo"
        />
        <div class="spread">
          <p class="datebox">
            <span class="days">10天前</span>
            <!-- <span class="date" v-else>{{item.creatDate}}</span> -->
            <i class="target">热点</i>
          </p>
          <h5 class="texts">冲奥片"乔乔的异想世界"曝豪华卡司幕后</h5>
          <p class="flex-box">
            <span class="counts flex-box">
              <img
                src="https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png"
                width="15"
              />
              <i>100万</i>
            </span>
          </p>
        </div>
      </dd>
      <dd>
        <img
          src="https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png"
          class="platformlogo"
        />
        <div class="spread">
          <p class="datebox">
            <span class="days">10天前</span>
            <!-- <span class="date" v-else>{{item.creatDate}}</span> -->
            <i class="target">热点</i>
          </p>
          <h5 class="texts">冲奥片"乔乔的异想世界"曝豪华卡司幕后</h5>
          <p class="flex-box">
            <span class="counts flex-box">
              <img
                src="https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png"
                width="15"
              />
              <i>100万</i>
            </span>
          </p>
        </div>
      </dd>
      <dd>
        <img
          src="https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png"
          class="platformlogo"
        />
        <div class="spread">
          <p class="datebox">
            <span class="days">10天前</span>
            <!-- <span class="date" v-else>{{item.creatDate}}</span> -->
            <i class="target">热点</i>
          </p>
          <h5 class="texts">冲奥片"乔乔的异想世界"曝豪华卡司幕后</h5>
          <p class="flex-box">
            <span class="counts flex-box">
              <img
                src="https://aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/ICON/aiqiyishipin.png"
                width="15"
              />
              <i>100万</i>
            </span>
          </p>
        </div>
      </dd>
    </dl>
    <!-- <dataEmpty v-else /> -->
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { datetimeParse } from '@/fn/dateUtil'
import { DetailItem } from './types'
import ModuleHeader from '@/components/moduleHeader'
import { AppLink } from '@/util/native'
import dataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    ModuleHeader,
    dataEmpty
  }
})
export default class SpreadList extends Vue {
  /** 传播路径 */
  @Prop({ type: Array }) dataList!: string[]
  @Prop({ type: Object }) link!: AppLink

  get list() {
    const list = this.dataList ? this.dataList : []
    list.length &&
      list.map((it: any) => {
        const time1 = Math.abs(moment(it.createTime).diff(moment(), 'day'))
        // 前10天显示 N 天前
        it.creatDay = datetimeParse(it.createTime)
        it.creatDate = moment(it.createTime).format('YYYY-MM-DD')
        // 处理标签颜色
        if (it.targetList && it.targetList.length) {
          for (const item of it.targetList) {
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
        }
        return {
          ...it
        }
      })
    return list
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
}
</style>
