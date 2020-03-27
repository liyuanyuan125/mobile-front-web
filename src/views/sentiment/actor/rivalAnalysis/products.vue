<template>
  <div class='pages'>
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList type="2" :rivalList="rivalList" v-if="rivalList.length" class="movierival" />
    <TabNav
      :list ="list"
      class="tab-nav"
      normal
    />
    <section v-if="combinedHeat.interactList.length" class="pane" id="hot" style='padding-bottom: 30px;'>
      <heatContrast 
        style='padding-top: 33px; background: #FFF;'
        :overAllHeat="combinedHeat.heatLineDate"
        :colors="combinedHeat.colors"
        :interactList="combinedHeat.interactList"
        :materialList="combinedHeat.materialList"
        :tabs="combinedHeat.tabs"
        v-if="combinedHeat.interactList.length"
        />
    </section>

    <section v-if='showpraise' class="pane" id="praise" style='padding-top: 20px;padding-right:15px;'>
      <!-- 口碑评论 -->
      <div class='public'>
        <MarketContrast :fetch="publicPraise.fetch" :query="publicPraise.query" />
      </div>
    </section>

    <section class="pane" id="user">
      <!-- 用户分析 -->
      <div class='userpk'>
        <div class='usertitle'>用户对比</div>
        <!-- 平台分布 -->
        <Table :title='publicObj.title' :tabList='publicObj.tabList' :tableTitle='publicObj.tableTitle' :tableItem='publicObj.tableItem'/>
        <!-- </div> -->
        <!-- 年龄分布 -->
        <Age :ageRangeList='ageRangeList' />
        <!-- 性别分布 -->
        <div class='title'>性别分布</div>
        <div class='main-show'>
          <VsList
            :data="sexdata"
            class="chart"
          />
        </div>

        <!-- 用户地域分布对比 -->
        <Table :title='regionObj.title' :tabList='regionObj.tabList' :tableTitle='regionObj.tableTitle' :tableItem='regionObj.tableItem' @chgregionPk='chgregionPk'/>
      </div>
    </section>     
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import RivalList from '@/views/common/rivalList/index.vue' // 竞品列表
import heatContrast from '@/views/common/heatContrast/index.vue' // 热度分析对比
import MarketContrast from '@/views/common/marketContrast/index.vue' // 口碑评论对比
import Age from '@/views/common/ageDistribution/index.vue'
import VsList, { VsItem } from '@/components/vsList'
import Table from '@/views/common/table/table.vue'
import TabNav, { TabNavItem } from '@/components/tabNav'
import { rivalPraise , rivalanaly , rivalHeatAnalysis } from '@/api/kol'

import { toast } from '@/util/toast'
import { Tab, Tabs } from 'vant'

@Component({
  components: {
    Tab,
    Tabs,
    heatContrast,
    MarketContrast,
    Age,
    VsList,
    Table,
    TabNav,
    SentimentBar,
    RivalList
  }
})
export default class KolPage extends ViewBase {

  sidebar = {
    diggType: 'actor',
    diggId: '100038',
    rivalIds: '1,2,4'
  }

  show: any = false
  showpraise: any = false

  item: any = null

  rivalList: any = []

  active: any = 0
  // 热度分析数据
  combinedHeat: any = {
    colors: ['#88AAF6', '#4CC8D0', '#C965DD'],
    // 综合对比数据值
    heatLineDate: {
      title: '综合热度分析',
      dateList: []
    },
    // 新增互动
    interactList: [],
    // 新增物料
    materialList: [],
    tabs: [
      {key: 0, text: '新增物料数'},
      {key: 1, text: '新增互动数'}
    ]
  }
  // 口碑评论
  publicPraise: any = {
    // 口碑评论补充数据
    // 口碑评论 查询
    query : {
        movieIdList: 12345
    },
    fetch : async (query: any) => { // query: 查询参数
        return {
            code: '',
            msg: '',
            data: {
                goodList: [
                    {
                        rivalName: query.startTime,
                        percent: 12.35,
                        hotWordList: [
                            '你好'
                        ]
                    }
                ]
            }
        }
    }
  }
  // 平台分布
  publicObj: any = {
    title: '平台分布',
    tabList: [],
    tableTitle: [
      {
        key: 'yiren',
        value: '艺人'
      },
      {
        key: 'top1',
        value: 'TOP1'
      },
      {
        key: 'top2',
        value: 'TOP2'
      },
      {
        key: 'top3',
        value: 'TOP3'
      },
      {
        key: 'top4',
        value: 'TOP4'
      },
      {
        key: 'top5',
        value: 'TOP5'
      },
    ],
    tableItem: [
      {
        rivalName: '111',
        dataList: [
          {
            name: '微博123',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
        ]
      },
      {
        rivalName: '222',
        dataList: [
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
        ]
      },
      {
        rivalName: '333',
        dataList: [
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '',
            value: ''
          }
        ]
      },
    ]
  }
  // 性别分布
  sexdata: VsItem[] = [
    { name: '奔驰', rate1: 63.6, rate2: 44.4 },
    { name: '兰博基尼', rate1: 39.6, rate2: 60.4 },
    { name: '林肯', rate1: 20.2, rate2: 79.8 },
    { name: '雪佛兰', rate1: 2.2, rate2: 97.8 },
    { name: '玛莎拉蒂名字很长', rate1: 98.8, rate2: 1.2 },
  ]
  // 地域数据
  userRegion: any = {}
  // 年龄分布数据
  ageRangeList = [
      {
          ageType: '20-30',
          rivalList: [
              {
                  rivalName: '奔驰',
                  rivalPercent: 32,
              },
              {
                  rivalName: '奔驰',
                  rivalPercent: 80,
              }
          ]
      },
      {
          ageType: '20-30',
          rivalList: [
            {
                  rivalName: '奔驰',
                  rivalPercent: 32,
              },
              {
                  rivalName: '奔驰',
                  rivalPercent: 80,
              }
          ]
      }
  ]

  // 用户地域分布
  regionObj: any = {
    title: '用户地域分布对比',
    tabList: [
      {
        name: '城市分布',
        key: 'city'
      },
      {
        name: '省份分布',
        key: 'province'
      }
    ],
    tableTitle: [
      {
        key: 'yiren',
        value: '艺人'
      },
      {
        key: 'top1',
        value: 'TOP1'
      },
      {
        key: 'top2',
        value: 'TOP2'
      },
      {
        key: 'top3',
        value: 'TOP3'
      },
      {
        key: 'top4',
        value: 'TOP4'
      },
      {
        key: 'top5',
        value: 'TOP5'
      },
    ],
    tableItem: [
      {
        rivalName: '111',
        dataList: [
          {
            name: '微博123',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
        ]
      },
      {
        rivalName: '222',
        dataList: [
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
        ]
      },
      {
        rivalName: '333',
        dataList: [
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '微博',
            value: '12%'
          },
          {
            name: '',
            value: ''
          }
        ]
      },
    ]
  }
  list: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
  ]

  created() {
    const mid = this.$route.params.kolId
    this.getLineData()
    this.getDetail()
    this.getPublicPraise()
    document.body.style.background = '#f2f3f6'
  }

  async getLineData() {
    try {
      const { data: {
        overAllHeat,
        platform: {
          interactList,
          materialList
        }
      }} = await rivalHeatAnalysis({
        actorIdList: '1,2',
        startTime: 20200304,
        endTime: 20200311
      })
      this.combinedHeat.heatLineDate.dateList = overAllHeat || []
      this.combinedHeat.interactList = interactList || []
      this.combinedHeat.materialList = materialList || []
    } catch (ex) {
      toast(ex)
    }
  }

  async getPublicPraise() {
    try {
      const  data = await rivalPraise({
        actorIdList: '1,2,3',
        startTime: 20200304,
        endTime: 20200311
      })
      this.publicPraise.query = {
        actorIdList: '1,2,3',
        startTime: 20200304,
        endTime: 20200311
      }
      // const as = this.publicPraise.query
      this.publicPraise.fetch = async (query: any) => { // query: 查询参数
        return data
      }
    } catch (ex) {
      toast(ex)
    } finally {
      this.showpraise = true
    }
  }

  async getDetail() {
    try {
       const {
         data: {
           rivalList,
           platformList,
           ageRangeList,
           genderList,
           userRegion,
         }
       } = await rivalanaly({actorIdList: this.$route.params.ids})
       this.rivalList = rivalList
       this.publicObj.tableItem = platformList
       this.ageRangeList = ageRangeList
       this.sexdata = (genderList || []).map((it: any) => {
         return {
           name: it.rivalName,
           rate1: 98.8,
           rate2: 1.2
         }
       })
       this.userRegion = userRegion
       this.regionObj.tableItem = userRegion.cityList
    } catch (ex) {
      toast(ex)
    }
  }
  // 用户地域分布对比
  chgregionPk(num: any) {
    if (num == 'province') {
      this.regionObj.tableItem = this.userRegion.provinceList
    } else if (num == 'city') {
      this.regionObj.tableItem = this.userRegion.cityList
    }
  }

}
</script>

<style lang="less" scoped>
.pages {
  width: 100%;
  // background: #f7f7f7;
}
/deep/ .tab-nav {
  // margin-top: 0;
  top: 88px;
  z-index: 11;
}
.userpk {
  background: #fff;
  margin-top: 20px;
  .usertitle {
    padding: 50px 30px;
    height: 60px;
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 60px;
  }
  .title {
    padding-left: 30px;
    height: 34px;
    font-size: 34px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 34px;
    margin-top: 48px;
    // margin-bottom: 40px;
  }
}
.public {
  background: #fff;
  margin-top: 20px;
}

/deep/ .van-tab {
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  // line-height: 100px;
  font-size: 30px;
}
/deep/ .van-tab--active, /deep/ .van-tabs__line {
  color: #88aaf6;
}
/deep/ .van-tabs__line {
  background-color: #88aaf6;
}
.pane {
  // padding: 15px;
  min-height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
}

.pane-head {
  font-size: 40px;
  font-weight: 500;
}

.sub-pane {
  min-height: 88px;
  border-top: 1px solid #d8d8d8;
  padding-top: 30px;
  &:first-child {
    border-top: 0;
  }
}

.sub-pane-head {
  font-size: 34px;
  font-weight: 500;
}

.sub-pane-body {
  min-height: 188px;
}
.main-show {
  padding: 30px;
}
/deep/ .options-page {
  padding-left: 30px;
}
/deep/ .module-title, /deep/ h3 {
  height: 34px;
  font-weight: 500;
  font-size: 34px !important;
  color: rgba(48, 48, 48, 1);
  line-height: 34px;
  margin-top: 48px;
  // margin-bottom: 40px;
}
/deep/ h3 {
  margin-bottom: 40px;
}
</style>
