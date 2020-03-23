<template>
  <!-- 电影电视剧详情页 主创人员 -->
  <div class="actormod">
    <ModuleHeader title="主创人员" :link="personList.length ? link : null" />
    <div class="actorlist" v-if="personList.length">
      <dl ref="chief">
        <dd
          v-for="(item,index) in personList"
          :key="item.actorName + index"
          @click="goActorDetail(item.actorId)"
        >
          <i class="img">
            <img :src="item.coverImg" :alt="item.actorName" v-if="item.coverImg" />
            <img src="@/assets/actordefault.png" :alt="item.actorName" v-else />
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
import { AppLink } from '@/util/native'
import { imgFixed } from '@/fn/imgProxy'
import dataEmpty from '@/views/common/dataEmpty/index.vue'

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

  mounted() {
    const chief = this.$refs.chief as HTMLDListElement
    if (this.actorList.length && this.actorList.length < 10) {
      // 先算出每一个DD的宽度
      const wid = (chief.offsetWidth / 10) * this.actorList.length
      chief.style.width = wid + 'px'
    }
  }

  get personList() {
    const list = this.actorList
    if (list && list.length) {
      for (const it of list) {
        it.coverImg = imgFixed(it.actorCover, 150, 210)
      }
    }
    return list
  }

  // 影人详情页跳转
  goActorDetail(id: string) {
    this.$router.push({
      name: 'sentimentactor',
      params: {
        actorId: id
      }
    })
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
    width: 1820px;
  }

  dd {
    margin-left: 30px;
    // flex: 1;
    width: 150px;
    text-align: center;
  }

  .img {
    width: 150px;
    height: 210px;
    display: block;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
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
