<template>
  <div>
    <SentimentBar title="用户分析" :titleShow="true" />

     <UserPortrait
      :sexData="genderList"
      :ageData="ageRangeList"
      v-if="ageRangeList.length"
      class="pane"
    />

    <!-- <section class="item-sales">
      <div class="van-hairline--top hairline" />
      <ModuleHeader title="促销敏感度" class="sales-header" />
    </section> -->

    <!-- <pointChart :width='375' :height='300' :data='data3' /> -->

    <!-- <section class="item-sales">
      <div class="van-hairline--top top-hairline" />
      <ModuleHeader title="评论敏感度" class="sales-header" />
    </section> -->

    <!-- <pointChart :width='375' :height='300' :data='data3' /> -->

    <UserArea 
      :data="userRegionList" 
      v-if="userRegionList.length" 
      class="item-areas"
      :moreLink="userLink"
    />
    
    <!-- <section class="item-city">
      <ModuleHeader 
        title="高消费偏好地区"
        moreText="查看更多"
        :link="linkObj"
        class="sex-rate"/>
       <User :consumRegion="consumRegion" v-if="consumRegion.cityList" />
    </section> -->

    <!-- <section class="items-consum">
      <ModuleHeader  title="分城市购买力" class="sex-rate"/>
      <cityConsum :cityConsum="cityConsumList" v-if="cityConsumList.length" />
    </section> -->
    
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { useranalysis } from '@/api/brand'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'
import UserPortrait, { VerticalBarItem, NameValue } from '@/views/common/userPortrait'
import pointChart from '@/components/cakeChart/pointChart.vue'
import ModuleHeader from '@/components/moduleHeader'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import User from './components/user.vue'
import cityConsum from './components/city.vue'
import { toast } from '@/util/toast'

@Component({
  components: {
    UserArea,
    UserPortrait,
    pointChart,
    ModuleHeader,
    SentimentBar,
    User,
    cityConsum
  }
})
export default class Main extends Vue {
  @Prop({ type: Number, default: 0}) id!: number

  // data3: any = {
  //   data: [
  //     {value: 335, name: '极度敏感'},
  //     {value: 310, name: '高度敏感'},
  //     {value: 234, name: '中度敏感'},
  //     {value: 135, name: '轻度敏感'},
  //     {value: 1548, name: '不敏感'}],
  //   color: '', // 修改颜色
  //   title: '促销敏感度',
  //   sesnsitivity: '敏感度高'// 显示的敏感度  这个需要自己计算了
  // }


  // 性别+年龄占比
  genderList = []
  ageRangeList = []
  promotionList = []
  commentList = []
  userRegionList = []
  consumRegion = {}
  cityConsumList = []

  get linkObj() {
    return {
      name: 'sentimentuserregion',
      query: {
        src: 1,
        id: this.id,
        type: 1,
        objType: 2
      }
    }
  }

  get userLink() {
    return {
      name: 'sentimentuserregion',
      query: {
        src: 1, // 品牌
        id: this.id,
        type: 1,
        objType: 1 // 用户地域分布
      }
    }
  }

  mounted() {
    this.list()
  }

  async list() {
    try {
      const { data: {
        userPortrait: {genderList, ageList, promotionList, commentList},
        userRegionList,
        consumRegion,
        cityConsumList,
      }} = await useranalysis({brandId: this.id})
      this.genderList = genderList || [] // 性别占比
      this.ageRangeList = (ageList || []).map((it: any) => {
        return {
          ...it,
          value: (it.value / 100)
        }
      }) // 年龄占比
      this.promotionList = promotionList || [] // 促销敏感度
      this.commentList = commentList || [] // 评论敏感度
      this.userRegionList = (userRegionList || []).map((it: any) => {
        return {
          ...it,
          value: it.value / 100
        }
      }) // 用户地域分布
      this.consumRegion = consumRegion || {} //  消费区域分布
      this.cityConsumList = cityConsumList || [] // 分城市购买力
    } catch (ex) {
      toast(ex)
    }
  }
}

</script>

<style lang='less' scoped>
.item-city {
  padding: 60px 30px 60px;
  border-bottom: solid 20px #f2f3f6;
}
.pane {
  padding-top: 160px;
  padding-bottom: 120px;
}
.top-hairline {
  margin-top: -60px;
}
.item-sales {
  padding: 0 30px;
  .sales-header {
    padding-top: 60px;
    margin-bottom: -60px;
  }
}
.items-consum {
  padding: 60px 30px;
}
.item-areas {
  border-top: solid 20px #f2f3f6;
  margin-top: -60px;
  border-bottom: solid 20px #f2f3f6;
}
</style>
