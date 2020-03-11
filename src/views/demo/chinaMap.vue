<template>
  <div class="demo-page">
    <ChinaMap
      :data="data"
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
    { name: '新疆', value: 0 },
    { name: '西藏', value: 20.8 },
    { name: '青海', value: 30 },
    { name: '甘肃', value: 40 },
    { name: '内蒙古', value: 50 },
    { name: '宁夏', value: 80.88 },
    { name: '陕西', value: 60.99 },
    { name: '黑龙江', value: 80 },
    { name: '吉林', value: 30 },
    { name: '辽宁', value: 50 },
    { name: '河南', value: 99 },
    { name: '北京', value: 88.66 },
    { name: '天津', value: 66.66 },
    { name: '江苏', value: 66.66 },
    { name: '安徽', value: 88.88 },
    { name: '湖北', value: 38.88 },
    { name: '湖南', value: 58.88 },
    { name: '河北', value: 38.88 },
    { name: '山西', value: 48.88 },
    { name: '四川', value: 28.88 },
    { name: '广东', value: 52.88 },
    { name: '山东', value: 82.22 },
    { name: '广西', value: 82.33 },
    { name: '重庆', value: 82.55 },
    { name: '江西', value: 52.88 },
    { name: '浙江', value: 52.22 },
    { name: '福建', value: 82 },
    { name: '台湾', value: 92 },
    { name: '云南', value: 92 },
    { name: '贵州', value: 62 },
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
