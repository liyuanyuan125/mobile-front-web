<template>
  <div class="chiefpeople">
    <h3>主创人员</h3>
    <div class="peopledefault" v-if="!chiefData || !chiefData.length"></div>
    <div class="peoplelist" v-if="chiefData">
      <dl ref="chief">
        <dd v-for="(item,index) in chiefpeople" :key="item.actorName + index">
          <i class="img">
            <img :src="item.imgUrl" :alt="item.actorName" v-if="item.imgUrl" />
            <img src="@/assets/person-default.png" :alt="item.actorName" v-if="!item.imgUrl" />
          </i>
          <h5>{{item.actorName}}</h5>
          <p>{{item.characterName}}</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { imgProxy } from '@/fn/imgProxy'

@Component({
  components: {}
})
export default class ChiefPeople extends ViewBase {
  @Prop({ type: Array }) chiefData: any

  chiefpeople: any = []
  dlWidth: string = ''

  mounted() {
    const chief = this.$refs.chief as HTMLDListElement
    if (this.chiefData.length && this.chiefData.length < 10) {
      // 先算出每一个DD的宽度
      const wid = (chief.offsetWidth / 10) * this.chiefData.length
      chief.style.width = wid + 'px'
    }

    // 处理一下格式
    for (const item of this.chiefData) {
      // 处理图片 https://picagent.piaoshen-dev.com/picture/cut_picture?uri=
      let imgUrl = ''
      switch (item.coverUrl.source) {
        case 'piaoshen':
          imgUrl = item.coverUrl.url ? imgProxy(item.coverUrl.url, 160, 240) : ''
          break
        default:
          imgUrl = item.coverUrl.url
          break
      }
      item.imgUrl = imgUrl
      this.chiefpeople.push(item)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
