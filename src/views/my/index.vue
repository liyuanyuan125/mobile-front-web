<template>
  <div class="viewpage">
    <SentimentBar title="我的服务" :bgColor="'#88AAF6'" :titleShow="true" class="service" />
    <div class="user">
      <p class="img">
        <img :src="services.userAvatar" alt="我开通的服务" />
        <!-- <img src="@/assets/default.png" alt="我开通的服务" v-else /> -->
      </p>
      <p class="stars">
        <span
          v-for="(item,index) in myService"
          :key="item +'' + index"
          :class="item === 1 ? 'on' : ''"
        ></span>
      </p>
      <p class="count">目前有{{services.serveCount}}项服务</p>
    </div>
    <dl class="serlist">
      <dd
        v-for="(item,index) in services.serveList"
        :key="item.serveName + index"
        class="van-hairline--bottom"
      >
        <div class="img">
          <img :src="item.imgUrl" :alt="item.serveName" />
        </div>
        <div class="content">
          <h4>{{item.serveName}}</h4>
          <p>{{item.serveDesc}}</p>
        </div>
        <div class="status">{{item.statusShow}}</div>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { myService } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { imgFixed } from '@/fn/imgProxy'

@Component({
  components: {
    SentimentBar
  }
})
export default class MyService extends ViewBase {
  myService: any[] = [] // 处理已开通服务的星星数
  services: any[] = []

  created() {
    this.getMyService()
  }

  formatStar(num: number) {
    const arr = new Array(num).fill(1)
    const disArr = new Array(7 - num).fill(2)
    this.myService = arr.concat(disArr)
  }

  // api 获取我的服务
  async getMyService() {
    const res: any = await myService({})
    this.services = res
    this.formatStar(res.serveCount)
    // this.userAvatar = res.userAvatar
    // this.serviceList = res.serveList
  }
}
</script>

<style lang="less" scoped>
.viewpage {
  color: #303030;
}
/deep/ .service svg {
  display: none;
}
.user {
  background-color: #88aaf6;
  padding: 160px 0 80px;
  .img {
    text-align: center;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }
  .stars {
    text-align: center;
    padding-top: 40px;
    span {
      background: url('../../assets/ico-my-start.png') no-repeat center;
      background-size: 40px;
      width: 40px;
      height: 40px;
      display: inline-block;
      vertical-align: middle;
      opacity: 0.2;
      margin: 0 5px;
    }
    span.on {
      opacity: 1;
    }
  }
  .count {
    color: #fff;
    font-size: 30px;
    line-height: 30px;
    margin-top: 20px;
    text-align: center;
  }
}
.serlist {
  padding: 0 20px;
  dd {
    display: flex;
    // justify-content: center;
    align-items: center;
    padding: 20px 0;
  }
  .img {
    margin-right: 10px;
    img {
      width: 80px;
      height: 80px;
      vertical-align: middle;
    }
  }
  .content {
    flex: 1;
    h4 {
      font-size: 30px;
      line-height: 1;
      font-weight: normal;
    }
    p {
      font-size: 22px;
      line-height: 1.2;
      color: #ccc;
      margin-top: 10px;
    }
  }
  .status {
    font-size: 22px;
    color: #ccc;
  }
}
</style>
