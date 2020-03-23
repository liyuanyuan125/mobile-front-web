<template>
  <div class="viewpage">
    <div class="rivalpage">
      <dl :class="typeClass">
        <dd v-for="item in rivalList" :key="item.rivalId">
          <img :src="item.coverImg" class="img" :alt="item.rivalName" />
          <h4 class="van-multi-ellipsis--l2">{{item.rivalName}}</h4>
          <span class="close" v-if="rivalList.length > 2">
            <Icon name="cross" size="12" color="#fff" class="cross" />
          </span>
        </dd>
        <dd v-if="rivalList.length < 6" @click="setRival">
          <div class="addrival">
            <Icon name="cross" size="30" color="#4A4A4A" />
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { RivalItem } from './types'
import { isJyApp } from '@/fn/ua'
import { Icon } from 'vant'
import { handleSetRival } from '@/util/native'
import { devLog, devInfo } from '@/util/dev'
import { imgFixed } from '@/fn/imgProxy'

@Component({
  components: {
    Icon
  }
})
export default class RivalList extends Vue {
  /**
   * 属性示例
   */
  @Prop({ type: Array }) rivalList!: any // 竞品列表
  @Prop({ type: String }) type!: string // 竞品列表

  // 设置竞品
  async setRival() {
    const ids: any = []
    for (const el of this.rivalList) {
      ids.push(el.rivalId)
    }
    const obj = {
      callBackName: 'handleSetRivalCallBack',
      params: {
        businessType: this.type,
        businessObjectIdList: ids.join(',')
      }
    }
    const result: any = await handleSetRival(obj)
    const codeJson = JSON.parse(result)
    this.$emit('setRival', codeJson.data.rivalIdList)

    devLog('设置竞品', result)
  }

  // 设置业务 class
  get typeClass() {
    let type = ''
    // 1 品牌 2 艺人 3 电影 4 剧集 5 音乐-单曲 6 音乐-专辑
    switch (this.type) {
      case '1':
        type = 'brand'
        break
      case '2':
        type = 'actor'
        break
      case '3':
        type = 'movie'
        break
      case '4':
        type = 'movie'
        break
      case '5':
        type = 'music'
        break
      case '6':
        type = 'music'
        break
    }
    return type
  }
}
</script>

<style scoped lang="less">
.rivalpage {
  padding-top: 120px;
  background: #f2f3f6;
  dl {
    display: flex;
    flex-wrap: wrap;
  }
  dd {
    width: 180px;
    box-sizing: border-box;
    padding-left: 30px;
    position: relative;
    padding-bottom: 40px;
    h4 {
      font-weight: normal;
      margin-top: 15px;
      font-size: 26px;
      line-height: 1.3;
      text-align: center;
    }
    .img {
      width: 150px;
      height: 195px;
      display: block;
      border: 1px solid #d4d4d4;
      border-radius: 10px;
      background: url('../../../assets/moviedefault.png') no-repeat center center;
      background-size: cover;
    }
    .close {
      background: #88aaf6;
      width: 40px;
      height: 40px;
      border: 4px solid #f7f7f9;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      position: absolute;
      right: -20px;
      top: -20px;
    }
    .close .cross {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }
  .addrival {
    width: 100%;
    height: 195px;
    background: #fff;
    border: 1px solid #d4d4d4;
    border-radius: 10px;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
