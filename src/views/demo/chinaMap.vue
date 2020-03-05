<template>
  <div class="demo-page">
    <ChinaMap
      :data="data"
      :minValue="100"
      :maxValue="10000"
      :borderColor="borderColorList[theme]"
      :colorRange="colorRangeList[theme]"
      class="china-map"
    />

    <div class="action-bar">
      <Button type="primary" @click="changeTheme(0)">主题1</Button>
      <Button type="warning" @click="changeTheme(1)">主题2</Button>
    </div>

    <div class="tip">默认为主题1，自定义主题才传 <code>borderColor</code>、<code>colorRange</code></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import { Button } from 'vant'

@Component({
  components: {
    ChinaMap,
    Button
  }
})
export default class extends Vue {
  data: ChinaMapItem[] = [
    { name: '新疆', value: 1000 },
    { name: '西藏', value: 2000 },
    { name: '青海', value: 3000 },
    { name: '甘肃', value: 4000 },
    { name: '内蒙古', value: 5000 },
    { name: '宁夏', value: 8000 },
    { name: '陕西', value: 6000 },
    { name: '黑龙江', value: 8000 },
    { name: '吉林', value: 3000 },
    { name: '辽宁', value: 5000 },
    { name: '河南', value: 9999 },
    { name: '北京', value: 8888 },
    { name: '天津', value: 6666 },
    { name: '江苏', value: 6666 },
    { name: '安徽', value: 8888 },
    { name: '湖北', value: 3888 },
    { name: '湖南', value: 5888 },
    { name: '河北', value: 3888 },
    { name: '山西', value: 4888 },
    { name: '四川', value: 2888 },
    { name: '广东', value: 5200 },
    { name: '山东', value: 8200 },
    { name: '广西', value: 8200 },
    { name: '重庆', value: 8200 },
    { name: '江西', value: 5200 },
    { name: '浙江', value: 5200 },
    { name: '福建', value: 8200 },
    { name: '台湾', value: 9200 },
    { name: '云南', value: 9200 },
    { name: '贵州', value: 6200 },
  ]

  theme = 0

  borderColorList = [ '#fff', 'yellow' ]

  colorRangeList = [
    [ '#f1f5ff', '#d7e2ff', '#a3bdfd', '#598cfe', '#4763c6' ],
    [ '#080', '#f00' ]
  ]

  changeTheme(theme: number) {
    this.theme = theme
  }
}
</script>

<style lang="less" scoped>
.demo-page {
  padding: 20px;
}

.china-map {
  width: 100%;
  height: 660px;
}

.action-bar {
  text-align: center;
  button {
    margin: 0 18px;
  }
}

.tip {
  text-align: center;
  margin-top: 30px;
}

code {
  color: #07c160;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: rgba(27, 31, 35, .05);
}
</style>
