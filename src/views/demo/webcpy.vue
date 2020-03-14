<template>
  <div class="demo-page">
    <contrast :optionsList='optionsList' />
    <age :ageRangeList='ageRangeList' />
        <comment :publicPraise='publicPraise' />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import contrast from '@/components/opinions/contrast/index.vue'
import comment from '@/components/opinions/comment/index.vue'
import Age from '@/components/opinions/ageDistribution/index.vue'

@Component({
  components: {
    contrast,
    comment,
    Age
  }
})
export default class DemoPage extends Vue {
    optionsList = {
        goodList: [
            {
                rivalName: '奔驰',
                percent: 12.35,
                hotWordList: [
                    '你好'
                ]
            }
        ]
    }
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
}
</script>

<style lang="less" scoped>
.demo-page {
  padding: 20px;
}
</style>
