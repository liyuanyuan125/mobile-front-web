<template>
  <div >
    <!-- 宽高不填写默认是 width='375' height='300' -->
      <sexChart  :data='data1'></sexChart>
      <annularChart :width='370'  :data='data2'></annularChart>
      <pointChart  :data='data3'></pointChart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import annularChart from '@/components/cakeChart/annularChart.vue'
import sexChart from '@/components/cakeChart/sexChart.vue'
import pointChart from '@/components/cakeChart/pointChart.vue'


@Component({
  components: {
    annularChart,
    pointChart,
    sexChart
  }
})
export default class Apply extends Vue {

  data1: any = {
    data: [{value: 18934, name: '女性'},
      {value: 3578, name: '男性'}
      ],
    title: '性别占比',
    emphasisShow: true
      }

  data2: any = {
    data: [
      {value: 335, name: '微博'},
      {value: 310, name: '抖音'},
      {value: 234, name: '网易云音乐'},
      {value: 135, name: 'QQ音乐'},
      {value: 1548, name: '腾讯的视频'}],
    color: '', // 修改颜色
    title: '粉丝平台分布',
    sesnsitivity: '敏感度高'
      }

  data3: any = {
    data: [
      {value: 335, name: '极度敏感'},
      {value: 310, name: '高度敏感'},
      {value: 234, name: '中度敏感'},
      {value: 135, name: '轻度敏感'},
      {value: 1548, name: '不敏感'}],
    color: '', // 修改颜色
    title: '促销敏感度',
    sesnsitivity: '敏感度高', // 显示的敏感度  这个需要自己计算了
    titleShow:  true, // 是否显示标题
    titleMargin:  [20, 20, 20, 20], // 标题部分padding[20,20,20,20]||20
    titleLeft:  'left', // 标题位置 left center right
    titleSize:  28, // 标题字体大小
    titleWeight:  '100', // 标题字体粗细
    legendtoFixed :  2 // legend显示几位小数
  }

  mounted() {
    //
  }


}
</script>

<style lang="less" scoped>

</style>
