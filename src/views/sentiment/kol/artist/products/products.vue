<template>
  <div class='pages'>
      <div class='maintop'>
        <div class="reBack"></div>
        <div class='title'>竞品分析详细报告</div>
        <div class='search'></div>
      </div>
      <div class='user'>
        <div class='userlist' v-for="(item , index) in userItemList" :key='index'>
          <div class='img'>
            <img :src="item.url" alt="">
            <i>x</i>
          </div>
          <span>{{item.name}}</span>
        </div>
        <div class='userlist posimg'>
          <div class='img'>
            <img src="" alt="">
          </div>
          <span>&nbsp;</span>
          <p class='p' @click='addPerson'>+</p>
        </div>
      </div>
      <div>
        <Tabs v-model="active" scrollspy sticky>
        <Tab title="热度">
          <!-- 综合热度对比 -->
          <combinedHeat />
          <!-- 平台热度对比 -->
          <platformHeat /></Tab>
        <Tab title="口碑">
          <!-- 口碑评论对比 -->
          <publicPraise />
        </Tab>
        <Tab title="用户">
          <div class='userpk'>
            <div class='usertitle'>用户对比</div>
            <!-- 平台分布 -->
            <Platform />
            <!-- 年龄分布 -->
            <Age />
            <!-- 性别分布 -->
            <Sex />
            <!-- 用户地域分布对比 -->
            <Region />
          </div>
        </Tab>
      </Tabs>
      </div>
     
      
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import combinedHeat from './combinedHeat.vue'
import platformHeat from './platformHeat.vue'
import publicPraise from './publicPraise.vue'
import Platform from './platform.vue'
import Age from './age.vue'
import Sex from './sex.vue'
import Region from './region.vue'

import { toast } from '@/util/toast'
import { Tab, Tabs } from 'vant'

@Component({
  components: {
    Tab,
    Tabs,
    combinedHeat,
    platformHeat,
    publicPraise,
    Platform,
    Age,
    Sex,
    Region,
  }
})
export default class KolPage extends ViewBase {

  item: any = null

  userItemList: any = []

  active: any = 0

  tabTitle: any = [
    {
      title: '热度',
      key: 'hot'
    },
    {
      title: '口碑',
      key: 'public'
    },
    {
      title: '用户',
      key: 'user'
    }
  ]

  created() {
    const mid = this.$route.params.kolId
    this.getDetail()
    document.body.style.background = '#FBFBFB'
  }

  async getDetail() {
    try {
        this.userItemList = [
          {
            name: '欧阳娜娜',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
          },
          {
            name: '欧阳娜娜',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
          },
          {
            name: '欧阳娜娜',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
          },
          {
            name: '欧阳娜娜',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
          },
          {
            name: '欧阳娜娜',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
          },
          {
            name: '欧阳娜娜',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
          }
        ]
        this.item = {
          userAges: [
            {
              type: '男',
              value: 40.9,
            },
            {
              type: '女',
              value: 59.1,
            }
          ],
          userGender: [
            {
              type: '≥19岁',
              value: 40.9,
            },
            {
              type: '20-24',
              value: 59.1,
            },
            {
              type: '25-29',
              value: 40.9,
            },
            {
              type: '30-34',
              value: 40.9,
            },
            {
              type: '35-39',
              value: 40.9,
            },
            {
              type: '≥40岁',
              value: 40.9,
            },
          ],
          cityList: [
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 59.1,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
            {
              type: '1. 123',
              value: 40.9,
            },
          ]
        }
    } catch (ex) {
      toast(ex)
    }
  }
  // 添加竞品操作
  addPerson() {
    // console.log('点击我添加一个')
  }

}
</script>

<style lang="less" scoped>
.pages {
  width: 100%;
  background: #f7f7f7;
}
.left {
  float: left;
}
.right {
  float: right;
}
.maintop {
  width: 750px;
  height: 188px;
  padding-top: 39px;
  background: rgba(247, 247, 249, 1);
  div {
    display: inline-block;
    // float: left;
  }
  .title {
    width: 300px;
    height: 50px;
    font-size: 36px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 50px;
    margin-left: 28%;
  }
  .reBack {
    width: 88px;
    height: 88px;
    position: absolute;
    left: 0;
    top: 19px;
    &::after {
      content: '';
      width: 22px;
      height: 22px;
      border-left: 4px solid #000;
      border-bottom: 4px solid #000;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  .search {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    float: right;
    margin-right: 5%;
  }
}
/deep/ .van-sticky, /deep/ .van-tabs--line .van-tabs__wrap {
  height: 100px;
  background: rgba(255, 255, 255, 1);
  border-radius: 60px 60px 0 0;
}
.age {
  height: 450px;
}
.city {
  padding: 3%;
}
.user {
  width: 100%;
  // background: #fff;
  .userlist {
    display: inline-block;
    width: 25%;
    height: 250px;
    position: relative;
    .img {
      margin: 0 auto;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px solid rgba(212, 212, 212, 1);
      background: #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // max-width: 150px;
        // min-height: 150px;
        object-fit: contain;
        background-color: #fff;
      }
      i {
        display: block;
        position: absolute;
        top: 0;
        right: 16px;
        width: 40px;
        height: 40px;
        font-style: normal;
        background: #8babef;
        text-align: center;
        line-height: 32px;
        border-radius: 50%;
        color: #fff;
        font-size: 34px;
        font-weight: 200;
      }
    }
    span {
      display: block;
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 26px;
      margin-top: 23px;
    }
  }
  .posimg {
    position: relative;
    .p {
      display: block;
      position: absolute;
      top: 15%;
      left: 34%;
      font-size: 80px;
      font-weight: 100;
      color: #4a4a4a;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
    }
  }
}
.userpk {
  padding: 50px 30px;
  background: #fff;
  margin-top: 20px;
  .usertitle {
    height: 60px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 60px;
  }
}
/deep/ .van-tab {
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 100px;
  font-size: 30px;
}
/deep/ .van-tab--active, /deep/ .van-tabs__line {
  color: #88aaf6;
}
/deep/ .van-tabs__line {
  background-color: #88aaf6;
}

</style>
