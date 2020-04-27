<template>
  <div class='pages'>
      <SentimentBar :title="title" :titleShow="true" />
      <div v-if='show && basicCode == 0'>
        <div class='agelist'>
          <div class='title'>用户画像</div>
          <div class='sex'>
            <!-- <div class='item-title'>性别占比</div> -->
            <sexChart :width='375' :data='genderList' ></sexChart>
          </div>
          <div class='age'>
            <div class='item-title'>年龄占比</div>
            <VerticalBar
              :data="ageRangeList"
              :digits='2'
              class="chart"
            />
          </div>
        </div>
        <div class='userlist'>
          <div class='item-title' >粉丝平台分布
            <Icon @click.native='showNote()' name="question-o" size="18" class="icon-arrow"/>
          </div>
          <annularChart :width='375' :height='300' :data='platformFansList'></annularChart>
        </div>
        <div class='userlist'>
          <UserArea 
            :data="userRegionList"
            :moreLink="`/sentiment/common/userRegion?src=2&id=${$route.params.actorId}&type=1`"
          />
        </div>
      </div>
      <DataEmpty :code="basicCode" :retry="getDetail" v-if="basicCode > 0" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
// import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import { Icon } from 'vant'
import { toast , alert } from '@/util/toast'
import sexChart from '@/components/cakeChart/sexChart.vue'
import annularChart from '@/components/cakeChart/annularChart.vue'
import VerticalBar, { VerticalBarItem } from '@/components/verticalBar'
import UserArea, { ChinaMapItem } from '@/views/common/userArea'
import { getPeople } from '@/api/kol'
import DataEmpty from '@/views/common/dataEmpty/index.vue'


@Component({
  components: {
    SentimentBar,
    UserArea,
    sexChart,
    annularChart,
    VerticalBar,
    Icon,
    DataEmpty
  }
})
export default class KolPage extends ViewBase {
  show: any = false

  basicCode: any = 0

  genderList: any = {
    data: [],
    title: '性别占比',
    emphasisShow: true,
    titleShow: 'false'
  }

  platformFansList: any = {
    data: [],
    color: '', // 修改颜色
    // title: '粉丝平台分布',
    sesnsitivity: '敏感度高'
  }

  ageRangeList: VerticalBarItem[] = []

  userRegionList: ChinaMapItem[] = []

  theme = 0

  title  = '用户分析'

  detail: any = null


  created() {
    this.title = this.$route.query.title + '用户分析'
    this.getDetail()
    // document.body.style.background = '#'
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
      this.userRegionList = (userRegionList || []).map((it: any) => {
        return {
          ...it,
          value: (it.value / 100)
        }
      })
      this.ageRangeList = (ageRangeList || []).map((it: any) => {
        return {
          ...it,
          value: (it.value / 100)
        }
      })
      this.platformFansList.data = platformFansList || []
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
    } finally {
      this.show = true
    }
  }

  // 显示说明
  showNote() {
    // console.log(123)
    alert({
      // title: '提示',
      message:
        '大数据平台展示的粉丝数是各平台粉丝数的累计之和，粉丝平台分布是大数据平台粉丝数在各平台的占比情况',
      showConfirmButton: true,
      className: 'alertwid'
    })
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
      font-size: 35px;
      font-weight: bold;
      color: rgba(48, 48, 48, 1);
      line-height: 34px;
    }
  }
}
.userlist {
  margin-top: 20px;
  background: #fff;
  .item-title {
    padding: 0 30px;
    padding-top: 60px;
    font-size: 35px;
    font-weight: bold;
    color: rgba(48, 48, 48, 1);
    line-height: 34px;
    // margin-bottom: -50px;
    position: relative;
    z-index: 10;
    .icon-arrow {
      position: absolute;
      top: 65%;
      left: 33%;
      color: #acacac;
    }
  }
}
.city {
  padding: 3%;
}
</style>
