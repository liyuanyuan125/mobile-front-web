<template>
  <div class='pages'>
      <!-- <div  class='back'></div> -->
      <!-- <h4 >我是kol艺人详情hah呜呜呜a→</h4> -->
      <!-- http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg -->
      <div class='maintop'>
        <div class="reBack"></div>
        <div class='title'>{{title}}&nbsp;用户分析</div>
      </div>
      <div class='agelist'>
        <div class='title'>用户画像</div>
        <div class='sex'>性别占比所在位置</div>
        <div class='age'>年龄占比所在位置</div>
      </div>
      <div class='userlist'>
        <div class='title'>用户地域分布</div>
          <div class='map'>
            <ChinaMap
              :data="data"
              :minValue="100"
              :maxValue="10000"
              :colorRange="colorRangeList[theme]"
              class="china-map"
            />
          </div>
        <div class='toplist'>
          <div class='title'>
            <div class='left'>TOP5省份</div>
            <div class='right more'>查看更多<span></span></div>
          </div>
          <ul>
            <li v-for='(item,index) in topFive' :key='item.id'>
              {{index + 1}}.{{item.name}}
            </li>
          </ul>
        </div>
      </div>
      
      
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import { toast } from '@/util/toast'

@Component({
  components: {
    ChinaMap,
  }
})
export default class KolPage extends ViewBase {

  data: ChinaMapItem[] = [
    { name: '新疆', value: 1000 },
    { name: '西藏', value: 2000 },
    { name: '青海', value: 3000 },
    { name: '甘肃', value: 4000 },
    { name: '内蒙古', value: 5000 },
    { name: '宁夏', value: 8000 },
    { name: '陕西', value: 6000 },
    { name: '黑龙江', value: 8000 },
    { name: '吉林', value: 3000 },
    { name: '辽宁', value: 5000 },
    { name: '河南', value: 9999 },
    { name: '北京', value: 8888 },
    { name: '天津', value: 6666 },
    { name: '江苏', value: 6666 },
    { name: '安徽', value: 8888 },
    { name: '湖北', value: 3888 },
    { name: '湖南', value: 5888 },
    { name: '河北', value: 3888 },
    { name: '山西', value: 4888 },
    { name: '四川', value: 2888 },
    { name: '广东', value: 5200 },
    { name: '山东', value: 8200 },
    { name: '广西', value: 8200 },
    { name: '重庆', value: 8200 },
    { name: '江西', value: 5200 },
    { name: '浙江', value: 5200 },
    { name: '福建', value: 8200 },
    { name: '台湾', value: 9200 },
    { name: '云南', value: 9200 },
    { name: '贵州', value: 6200 },
  ]

  colorRangeList = [
    [ '#f1f5ff', '#d7e2ff', '#a3bdfd', '#598cfe', '#4763c6' ],
  ]

  theme = 0

  title  = '欧阳娜娜'

  detail: any = null

  topFive: any = [
    {
      name: '广东省',
      id: 1
    },
    {
      name: '江苏省',
      id: 2
    },
    {
      name: '山东省',
      id: 3
    },
    {
      name: '四川省',
      id: 4
    },
    {
      name: '河南省',
      id: 5
    },
  ]

  created() {
    const mid = this.$route.params.kolId
    this.getDetail()
    document.body.style.background = '#FBFBFB'
  }

  async getDetail() {
    try {
        this.detail = {

        }
    } catch (ex) {
      toast(ex)
    }
  }

}
</script>

<style lang="less" scoped>
@import './less/main.less';
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
.agelist {
  padding: 66px 30px;
  background: #fff;
  // height: 450px;
  .title {
    height: 40px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 40px;
  }
  .sex {
    height: 300px;
    margin-top: 40px;
    border-bottom: solid 1px #d8d8d8;
  }
  .age {
    height: 300px;
    margin-top: 60px;
  }
}
.userlist {
  padding: 86px 30px;
  margin-top: 20px;
  background: #fff;
  .title {
    height: 40px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 40px;
    margin-top: 86px;
  }
  .map {
    .china-map {
      width: 100%;
      height: 660px;
    }
    border-bottom: solid 1px #d8d8d8;
  }
  .toplist {
    .title {
      height: 30px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(48, 48, 48, 1);
      line-height: 30px;
      margin-bottom: 50px;
      .more {
        height: 26px;
        font-size: 26px;
        font-weight: 400;
        color: rgba(143, 143, 143, 1);
        line-height: 30px;
        margin-right: 4%;
        position: relative;
        span {
          display: block;
          width: 20px;
          height: 20px;
          border-top: 2px solid rgba(143, 143, 143, 1);
          border-right: 2px solid rgba(143, 143, 143, 1);
          transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          position: absolute;
          top: 3px;
          right: -20px;
        }
      }
    }
    ul {
      width: 100%;
      li {
        width: 20%;
        display: inline-block;
        height: 30px;
        font-size: 30px;
        font-weight: 300;
        color: rgba(48, 48, 48, 1);
        line-height: 30px;
      }
    }
  }
}
.city {
  padding: 3%;
}

</style>
