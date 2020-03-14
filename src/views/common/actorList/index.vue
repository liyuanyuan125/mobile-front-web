<template>
  <!-- 电影电视剧详情页 主创人员 -->
  <div class="actormod">
    <h3>主创人员</h3>
    <div class="actorlist">
      <dl ref="chief">
        <dd v-for="(item,index) in actorList" :key="item.actorName + index">
          <i class="img">
            <!-- <img :src="item.imgUrl" :alt="item.actorName" v-if="item.imgUrl" /> -->
            <img src="@/assets/person-default.png" :alt="item.actorName" />
          </i>
          <h5>{{item.actorName}}</h5>
          <p>{{item.character}}</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ActorItem } from './types'

@Component({
  components: {}
})
export default class ActorList extends Vue {
  /** 演员列表 */
  @Prop({ type: Array }) actorList!: ActorItem[]

  mounted() {
    const chief = this.$refs.chief as HTMLDListElement
    if (this.actorList.length && this.actorList.length < 10) {
      // 先算出每一个DD的宽度
      const wid = (chief.offsetWidth / 10) * this.actorList.length
      chief.style.width = wid + 'px'
    }
  }
}
</script>

<style lang='less' scoped>
.actormod {
  background: #fff;
  border-bottom: 20px solid rgba(216, 216, 216, 0.2);
  padding: 50px 0;

  h3 {
    font-size: 40px;
    line-height: 40px;
    padding: 0 0 30px 30px;
    font-weight: normal;
  }

  .actorlist {
    width: 100%;
    overflow-x: auto;
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
      border-radius: 10px;
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
