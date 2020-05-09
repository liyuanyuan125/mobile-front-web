<template>
  <div>
    <SentimentBar title="用户分析" :titleShow="true" />

     <UserPortrait
      :sexData="genderList"
      :ageData="ageRangeList"
      v-if="ageRangeList.length"
      class="pane"
    />

    <UserArea 
      :data="userRegionList" 
      v-if="userRegionList.length" 
      class="item-areas"
      :moreLink="userLink"
    />
    
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

  // 性别+年龄占比
  genderList = []
  ageRangeList = []
  userRegionList = []


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
        userPortrait: {genderList, ageList},
        userRegionList,
      }} = await useranalysis({brandId: this.id})
      this.genderList = genderList || [] // 性别占比
      this.ageRangeList = (ageList || []).map((it: any) => {
        return {
          ...it,
          value: (it.value / 100)
        }
      }) // 年龄占比
      this.userRegionList = (userRegionList || []).map((it: any) => {
        return {
          ...it,
          value: it.value / 100
        }
      }) // 用户地域分布
    } catch (ex) {
      // toast(ex)
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
