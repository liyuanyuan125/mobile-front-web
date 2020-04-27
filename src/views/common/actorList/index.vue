<template>
  <!-- 电影电视剧详情页 主创人员 -->
  <div class="actormod">
    <ModuleHeader title="主创人员" :link="personList.length ? link : null" @click.native="talkingData" />
    <div class="actorlist" v-if="personList.length">
      <dl ref="chief">
        <dd
          v-for="(item,index) in personList"
          :key="item.actorName + index"
          @click="goActorDetail(item.actorId)"
        >
          <i class="img">
            <img :src="item.coverImg" :alt="item.actorName" />
          </i>
          <h5 class="van-ellipsis">{{item.actorName}}</h5>
          <p>{{item.character}}</p>
        </dd>
      </dl>
    </div>
    <dataEmpty v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ActorItem, DetailItem } from './types'
import ModuleHeader from '@/components/moduleHeader'
import { imgFixed } from '@/fn/imgProxy'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { talkingdataHandle } from '@/util/TDEvent'
import { AppLink } from '@/util/native'
import { openWebPage } from '@/fn/openUrlInApp'

@Component({
  components: {
    ModuleHeader,
    dataEmpty
  }
})
export default class ActorList extends Vue {
  /** 演员列表 */
  @Prop({ type: Array }) actorList!: ActorItem[]
  @Prop({ type: Object }) link!: AppLink

  get personList() {
    const list = this.actorList
    if (list && list.length) {
      for (const it of list) {
        it.coverImg =
          it.actorCover && it.actorCover.url
            ? imgFixed(it.actorCover, 150, 210, 4)
            : require('../../../assets/actordefault.png')
      }
    }
    return list
  }

  // talkingdata 埋点统计
  talkingData() {
    if (this.personList.length) {
      const eventId = this.link.businessType === 3 ? '电影详情页' : '电视剧详情页'
      talkingdataHandle(eventId, '主创人员_查看更多')
    }
  }

  // 影人详情页跳转
  goActorDetail(id: string) {
    openWebPage(`/sentiment/actor/${id}`)
  }
}
</script>

<style lang='less' scoped>
.actormod {
  background: #fff;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 0;

  .module-header {
    padding: 0 30px;
  }
  .actorlist {
    width: 100%;
    overflow-x: auto;
    margin-top: 30px;
  }

  dl {
    display: flex;
    white-space: nowrap;
    padding-right: 30px;
    appearance: none;
  }

  dd {
    margin-left: 30px;
    // flex: 1;
    width: 150px;
    text-align: center;
  }

  .img {
    background: url('../../../assets/actordefault.png') no-repeat center;
    background-size: cover;
    width: 150px;
    height: 210px;
    display: block;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      font-size: 0;
      line-height: 0;
    }
  }

  h5 {
    font-size: 26px;
    line-height: 37px;
    margin-top: 20px;
    font-weight: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  p {
    font-size: 26px;
    opacity: 0.4;
    line-break: 31px;
    margin-top: 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
