<template>
  <div class='pages'>
      <!-- <div  class='back'></div> -->
      <!-- <h4 >我是kol艺人详情hah呜呜呜a→</h4> -->
      <!-- http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg -->
      <div class='age'>
        <UserPortrait :userAges="detail.userAges" :userGender="detail.userGender" />
      </div>
      <div class='map'>
        <ChinaMap
          :data="data"
          :minValue="100"
          :maxValue="10000"
          class="china-map"
        />
      </div>
      <div class='city'>
        <city :cityList="detail.cityList"  />
      </div>
      
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import UserPortrait from './components/userPortrait.vue'
import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import city from './components/city.vue'
import { toast } from '@/util/toast'

@Component({
  components: {
    UserPortrait,
    ChinaMap,
    city
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

  theme = 0

  title  = '欧阳娜娜'

  detail: any = null

  created() {
    const mid = this.$route.params.kolId
    this.getDetail()
    document.body.style.background = '#FBFBFB'
  }

  async getDetail() {
    try {
        this.detail = {
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

}
</script>

<style lang="less" scoped>
@import './less/main.less';
.pages {
  width: 100%;
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
.map {
  .china-map {
    width: 100%;
    height: 660px;
  }
}
.age {
  height: 450px;
}
.city {
  padding: 3%;
}


</style>
