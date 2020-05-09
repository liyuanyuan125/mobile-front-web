<template>
  <div class="userportrait">
    <!-- <ModuleHeader
      title="用户分析"
      :link="genderListData || ageRangeListData ? link : null"
      @click.native="openLink"
    />-->
    <div class="titbox" @click="openLink">
      <h4>用户分析</h4>
      <div v-if="genderListData || ageRangeListData">
        <Icon name="arrow" size="20" class="more-icon" />
      </div>
    </div>
    <van-row type="flex" class="raitwrap" v-if="genderListData || ageRangeListData">
      <van-col :span="genderListData && ageRangeListData ? 10 :24" v-if="genderListData">
        <BarGraph :dataOption="genderListData" :colorList="colorList" />
      </van-col>
      <van-col :span="genderListData && ageRangeListData ? 14 :24" v-if="ageRangeListData">
        <barGraphRow :dataOption="ageRangeListData" :itemlist="itemlist" />
      </van-col>
    </van-row>
    <dataEmpty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Col, Row, Icon } from 'vant'
import BarGraph from '@/components/kol/barGraph.vue'
import barGraphRow from '@/components/kol/barGraphRow.vue'
import ModuleHeader from '@/components/moduleHeader'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { openWebPage } from '@/fn/openUrlInApp'
import { talkingdataDetailHandle } from '@/util/TDEvent'

@Component({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    Icon,
    BarGraph,
    barGraphRow,
    ModuleHeader,
    dataEmpty
  }
})
export default class UserPortrait extends ViewBase {
  @Prop({ type: Array }) ageRangeList!: any
  @Prop({ type: Array }) genderList!: any
  @Prop({ type: Object }) link!: any
  // 业务类型 / 1 品牌 2 艺人 3 电影 4 剧集 5 音乐-单曲 6 音乐-专辑
  @Prop({ type: String }) type!: string
  // 男女比例颜色信息
  @Prop({ type: Array, default: () => ['#7CA4FF', '#FF6262'] }) colorList!: string[]

  arr: any = []

  // 处理 link
  openLink() {
    if (this.genderListData || this.ageRangeListData) {
      const link = this.link
      talkingdataDetailHandle(this.type, '用户分析_查看更多')
      switch (this.type) {
        case '1':
          openWebPage(`/sentiment/branduser/${link.params.brandId}`)
          break
        case '2':
          openWebPage(`/sentiment/actor/userAnalysis/${link.params.actorId}`)
          break
        case '3':
          openWebPage(`/sentiment/movie/userAnalysis/${link.params.movieId}`)
          break
        case '4':
          openWebPage(`/sentiment/tv/userAnalysis/${link.params.tvId}`)
          break
        case '5':
          openWebPage(`/sentiment/song/${link.params.songId}/user`)
          break
        case '6':
          openWebPage(`/sentiment/album/${link.params.albumId}/user`)
          break
        default:
          this.$router.push(link)
      }
    }
  }

  get itemlist() {
    const inx = this.ageRangeList ? this.ageRangeList.length : 0
    const anumber = inx > 0 ? new Array(inx).fill(100) : []
    return {
      colorMain: '#303030',
      borderRadius: [5, 5, 5, 5],
      colorColumn: '#7F7D7E',
      widthColumn: 5,
      normalColor: anumber,
      bgColor: '#F0F0F0'
    }
  }

  // 处理年龄数据
  get ageRangeListData() {
    const xData: any[] = []
    const yData: any[] = []
    let ageList: any = null
    const rait = this.ageRangeList
    if (rait && rait.length) {
      for (const item of this.ageRangeList) {
        item.value = item.value > 10000 ? 10000 : item.value
        xData.push((item.value / 100).toFixed(2))
        yData.push(item.name)
      }
      ageList = {
        xData,
        yData
      }
    }
    return ageList
  }

  get genderListData() {
    const xData: any[] = []
    const yData: any[] = []
    const rait: any = (this.genderList || []).slice(0, 2)
    let gender: any = null
    if (rait && rait.length) {
      // 当接口只返回一条数据的时候，补齐另一条
      if (rait.length === 1) {
        rait.push({ name: '', value: 0 })
      }
      // 如果返回的值里 value 都是0或 null，则不显示性别
      if (!rait[0].value && !rait[1].value) {
        return null
      }
      // 判断先回来的是男还是女
      const raitList = rait[0].name.indexOf('女') > -1 ? [rait[1], rait[0]] : rait
      raitList[0].name = '男'
      raitList[1].name = '女'
      // 如果其中一个有值，另一个则补齐 如果两个 value 都是 0 或 null 是走不到这里的
      raitList[0].value = raitList[0].value > 10000 ? 10000 : raitList[0].value
      if (raitList[0].value > 0) {
        raitList[1].value = 10000 - raitList[0].value
      } else {
        raitList[0].value = 10000 - raitList[1].value
      }

      for (const item of raitList) {
        xData.push(item.name)
        yData.push((item.value / 100).toFixed(2))
      }
      gender = {
        xData,
        yData
      }
    }
    return gender
  }
}
</script>

<style lang="less" scoped>
.titbox {
  display: flex;
  padding-bottom: 30px;
  h4 {
    white-space: nowrap;
    font-size: 40px;
    font-weight: 400;
    line-height: 60px;
    flex: 1;
  }
  > div {
    text-align: right;
  }
  .more-icon {
    position: relative;
    top: 5px;
    color: #c8c6c4;
  }
}
.userportrait {
  // min-height: 500px;
  padding: 50px 30px;
  background: #fff;
  border-top: 20px solid #f7f6f9;
}

.raitwrap {
  margin-top: 30px;
}
</style>
