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
// 年龄分布
import AgeDistribution from '@/views/common/ageDistribution/index.vue'

@Component({
  components: {
    MarketContrast,
    AgeDistribution
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
            brandList: [
                {
                    brandName: '奔驰',
                    brandPercent: 32,
                },
                {
                    brandName: '奔驰',
                    brandPercent: 30,
                }
            ]
        },
        {
            ageType: '20-30',
            brandList: [
            ]
        }
    ]
    // 口碑评论 数据
    publicPraise = {
        appraiseList: [
            {
                raisePercent: 60,
                raiseName: '正面评价'
            },
            {
                raisePercent: 60,
                raiseName: '负面评价'
            },
            {
                raisePercent: 60,
                raiseName: '中性评价'
            }
        ],
        hotWordList: [
            1, 3, 4, 5
        ],
        badWordList: [
            1, 2, 3, 4
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
                        percent: 12.35,
                        hotWordList: [
                            '你好傻炮',
                            '你好傻炮',
                            '你好傻炮',
                            '你好傻炮'
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
