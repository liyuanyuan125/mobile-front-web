<template>
  <div class='pages' v-if='show'>
      <SentimentBar :title="title" :titleShow="true" />
      <div class='agelist'>
        <div class='title'>用户画像</div>
        <div class='sex'>
          <sexChart :width='375' :data='genderList'></sexChart>
        </div>
        <div class='age'>
          <div class='item-title'>粉丝年龄分布</div>
          <VerticalBar
            :data="ageRangeList"
            class="chart"
          />
        </div>
      </div>
      <div class='userlist'>
        <annularChart :width='375' :height='300' :data='platformFansList'></annularChart>
      </div>
      <div class='userlist'>
        <UserArea :data="userRegionList"/>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
// import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import SentimentBar from '@/views/common/sentimentBar/index.vue'

import { toast } from '@/util/toast'
import sexChart from '@/components/cakeChart/sexChart.vue'
import annularChart from '@/components/cakeChart/annularChart.vue'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'
import { getPeople } from '@/api/kol'

@Component({
  components: {
    SentimentBar,
    UserArea,
    sexChart,
    annularChart,
    VerticalBar
  }
})
export default class KolPage extends ViewBase {
  show: any = false

  genderList: any = {
    data: [
      {value: 1335, name: '男性'},
      {value: 310, name: '女性'}
    ],
    title: '性别占比',
    emphasisShow: true
  }

  platformFansList: any = {
    data: [
      {value: 335, name: '微博'},
      {value: 310, name: '抖音'},
      {value: 234, name: '网易云音乐'},
      {value: 135, name: 'QQ音乐'},
      {value: 1548, name: '腾讯视频'}
    ],
    color: '', // 修改颜色
    title: '粉丝平台分布',
    sesnsitivity: '敏感度高'
  }

  ageRangeList: VerticalBarItem[] = [
    { name: '小于19岁', value: 8.8 },
    { name: '20-24', value: 17.6 },
    { name: '25-29', value: 32.8 },
    { name: '30-34', value: 28.0 },
    { name: '35-39', value: 9.2 },
    { name: '大于40岁', value: 3.1 },
  ]

  userRegionList: ChinaMapItem[] = [
    { name: '新疆', value: 0 },
    { name: '西藏', value: 20.8 },
    { name: '青海', value: 30 },
    { name: '甘肃', value: 40 },
    { name: '内蒙古', value: 50 },
    { name: '宁夏', value: 80.88 },
    { name: '陕西', value: 60.99 },
    { name: '黑龙江', value: 80 },
    { name: '吉林', value: 30 },
    { name: '辽宁', value: 50 },
    { name: '河南', value: 99 },
    { name: '北京', value: 88.66 },
    { name: '天津', value: 66.66 },
    { name: '江苏', value: 66.66 },
    { name: '安徽', value: 88.88 },
    { name: '湖北', value: 38.88 },
    { name: '湖南', value: 58.88 },
    { name: '河北', value: 38.88 },
    { name: '山西', value: 48.88 },
    { name: '四川', value: 28.88 },
    { name: '广东', value: 52.88 },
    { name: '山东', value: 82.22 },
    { name: '广西', value: 82.33 },
    { name: '重庆', value: 82.55 },
    { name: '江西', value: 52.88 },
    { name: '浙江', value: 52.22 },
    { name: '福建', value: 82 },
    { name: '台湾', value: 92 },
    { name: '云南', value: 92 },
    { name: '贵州', value: 62 },
  ]

  colorRangeList = [
    [ '#f1f5ff', '#d7e2ff', '#a3bdfd', '#598cfe', '#4763c6' ],
  ]

  theme = 0

  title  = '用户分析'

  detail: any = null


  created() {
    this.title = this.$route.query.title + '用户分析'
    this.getDetail()
    document.body.style.background = '#FBFBFB'
  }

  async getDetail() {
    try {
      const { data: {
        genderList,
        userRegionList,
        ageRangeList,
        platformFansList,
      } } = await getPeople({actorId: this.$route.params.actorId})
      this.genderList.data = genderList || []
      this.userRegionList = userRegionList || []
      this.ageRangeList = ageRangeList || []
      this.platformFansList.data = platformFansList || []
    } catch (ex) {
      toast(ex)
    } finally {
      this.show = true
    }
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
.agelist {
  padding: 160px 0;
  background: #fff;
  // height: 450px;
  .title {
    padding-left: 30px;
    height: 40px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 40px;
  }
  .sex {
    // height: 300px;
    margin-top: 40px;
    border-bottom: solid 1px #d8d8d8;
  }
  .age {
    padding: 0 30px;
    // height: 300px;
    // margin-top: 60px;
    .item-title {
      margin-top: 60px;
      margin-bottom: 50px;
      font-size: 38px;
      font-weight: bold;
      color: rgba(48, 48, 48, 1);
      line-height: 34px;
    }
  }
}
.userlist {
  margin-top: 20px;
  background: #fff;
}
.city {
  padding: 3%;
}
</style>
