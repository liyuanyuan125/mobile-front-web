<template>
  <div class="demo-page">
    <MarketContrast :fetch="fetch" :query="query" />
    <MarketComment  :href="href" :publicPraise='publicPraise' :hotQuery="hotQuery" />
    <AgeDistribution :href="href" :ageRangeList='ageRangeList' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// 口碑评论对比
import MarketContrast from '@/views/common/marketContrast/index.vue'
import MarketComment from '@/views/common/praiseComment/index.vue'

// 年龄分布
import AgeDistribution from '@/views/common/ageDistribution/index.vue'

@Component({
  components: {
    MarketContrast,
    AgeDistribution,
    MarketComment
  }
})
export default class DemoPage extends Vue {
    // 查看更多
    href = {
        name: 'demo-twobar'
    }
    // 口碑评论 好感度
    hotQuery = {
        text: '好感度',
        value: 'B+'
    }
    // 年龄分布数据
    ageRangeList = [
        {
            ageType: '20-30',
            rivalList: [
                {
                    brandName: '奔驰',
                    rivalPercent: 32,
                },
                {
                    brandName: '奔驰',
                    rivalPercent: 0,
                }
            ]
        },
        {
            ageType: '20-30',
            rivalList: [
            ]
        }
    ]
    // 口碑评论 数据
    publicPraise = {
        appraiseList: [
        ],
        hotWordList: [
        ],
        badWordList: [
            1
        ]
    }

    // 口碑评论补充数据
    query = {
        movieIdList: 12345
    }
    // 口碑评论 查询
    fetch = async (query: any) => { // query: 查询参数
        return {
            code: '',
            msg: '',
            data: {
                goodList: [
                    {
                        rivalName: query.startTime,
                        percent: 0.0,
                        hotWordList: [
                            '你好',
                            '你好',
                            '你好',
                            '你好'
                        ]
                    }
                ]
            }
        }
    }
}
</script>

<style lang="less" scoped>
.demo-page {
  background: #d8d8d8;
}
</style>
