<template>
  <div class="hot-content">
    <selectTime ref="reftimes"/>
    <LineGraph :lineData="lineDatas" class="line-charts" />
    <div>
      <div class="title">平台热度
        <router-link class="to-more" to="" >查看更多<van-icon name="arrow" size="14" /></router-link>
      </div>
      <ul>
        <li class="flex-box flex-between" v-for="item in platformHeat" :key="item.platformId">
          <div class="flex-box">
            <img :src="item.platformLogo.url" >
            <div class="item-centers">
              <p class="values flex-box flex-between"><span v-for="it in item.platformValueList" :key="it.name">{{it.name}} {{it.value}}</span></p>
              <p class="texts">{{item.platformEvent}}</p>
            </div>
          </div>
          <router-link to="" class="arrow">
            <van-icon name="arrow" size="14" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'
import LineGraph from '@/components/charts/hots/index.vue'
import selectTime from '@/components/charts/hots/selectTime.vue'

@Component({
  components: {
    LineGraph,
    selectTime,
    [Icon.name]: Icon
  }
})
export default class Main extends Vue {
  lineDatas = {
    title: '综合分析',
    xDate: ['01-05', '01-05', '01-05', '01-05', '01-10', '01-15', '01-20'],
    yDate: [
      {
        data: [80, 932, 901, 934, 1290, 130, 1320],
        name: '刘诗诗1'
      },
      {
        data: [820, 932, 901, 914, 1290, 130, 1320],
        name: '刘诗诗2'
      },
      {
        data: [100, 32, 901, 934, 1290, 1330, 120],
        name: '刘诗诗3'
      },
    ],
  }
  platformHeat = [
    {
      platformName: 'weibo',
      platformId: 1,
      platformLogo: {
        source: 'xxx',
        url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg'
      },
      platformValueList: [
        {name: '微博数', value: 1788},
        {name: '互动量', value: 19999},
      ],
      platformEvent: '热文: 2020款奔驰迈巴赫S450带你xxxx巴赫S4'
    },
    {
      platformName: 'wechat',
      platformId: 2,
      platformLogo: {
        source: 'xxx',
        url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg'
      },
      platformValueList: [
        {name: '微博数', value: 1788},
        {name: '互动量', value: 19999},
      ],
      platformEvent: '热文: 2020款奔驰迈巴赫S450带你xxxx巴赫S4'
    },
    {
      platformName: 'baidu',
      platformId: 3,
      platformLogo: {
        source: 'xxx',
        url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg'
      },
      platformValueList: [
        {name: '微博数', value: 1788},
        {name: '互动量', value: 19999},
      ],
      platformEvent: '热文: 2020款奔驰迈巴赫S450带你xxxx巴赫S4'
    }
  ]
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '../less/com.less';

.hot-content {
  background-color: #fff;
  padding: 70px 30px 40px;
  color: @c-text;
  .line-charts {
    border-bottom: solid 1px @c-divider;
    padding-bottom: 60px;
    margin-bottom: 55px;
  }
  li {
    font-size: 26px;
    padding: 35px 0;
    border-bottom: solid 1px @c-divider;
    &:last-child {
      border-bottom: none;
    }
    .item-centers {
      width: 440px;
      margin-left: 30px;
    }
    img {
      border-radius: 50%;
      width: 60px;
      height: 60px;
    }
    .texts {
      color: @c-desc-text;
      font-size: 24px;
      padding-top: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .arrow {
      color: #acb4c2;
      padding-left: 30px;
    }
  }
}
</style>
