<template>
  <div class="viewpage">
    <div v-if="rivalList.length >= 4" class="rivalpage">
      <!-- 大于4个时 -->
      <dl>
        <dd v-for="item in rivalList.slice(0,4)" :key="item.rivalId">
          <img :src="item.coverUrl.url" class="img" :alt="item.rivalName" />
          <h4 class="van-multi-ellipsis--l2">{{item.rivalName}}</h4>
          <span class="close">
            <Icon name="cross" size="12" color="#fff" class="cross" />
          </span>
        </dd>
      </dl>
      <dl>
        <dd v-for="item in rivalList.slice(4)" :key="item.rivalId">
          <img :src="item.coverUrl.url" class="img" :alt="item.rivalName" />
          <h4 class="van-multi-ellipsis--l2">{{item.rivalName}}</h4>
          <span class="close">
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

    <div v-else class="rivalpage">
      <dl>
        <dd v-for="item in rivalList" :key="item.rivalId">
          <img :src="item.coverUrl.url" class="img" :alt="item.rivalName" />
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RivalItem } from './types'
import { isJyApp } from '@/fn/ua'
import { Icon } from 'vant'
import { handleSetRival } from '@/util/native'

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

  // 设置竞品
  async setRival() {
    const ids: any = []
    for (const el of this.rivalList) {
      ids.push(el.rivalId)
    }
    const obj = {
      callBackName: 'handleSetRivalCallBack',
      data: {
        businessType: 3,
        businessObjectIdList: encodeURIComponent(ids.join(','))
      }
    }
    const result: any = await handleSetRival(obj)
    const codeJson = JSON.parse(result)

    // devLog('选择城市', codeJson)
  }
}
</script>

<style scoped lang="less">
.rivalpage {
  padding-top: 120px;
  background: #f2f3f6;
  dl {
    display: flex;
    padding-bottom: 50px;
  }
  dd {
    width: 180px;
    box-sizing: border-box;
    padding-left: 30px;
    position: relative;
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
