<template>
  <div class="demo-page">
    <section class="header">
      <figure class="header-fig">
        <img src="https://randomuser.me/api/portraits/women/60.jpg">
      </figure>
      <div class="header-main">
        <h1 class="header-title">向死而生</h1>
        <div class="header-bar">Lana Del Rey</div>
        <div class="header-bar">单曲 / 2019-10-15发行 / 多平台</div>
        <div class="header-bar">热搜 NO.8 <a>#Lana Delrey</a></div>
      </div>
    </section>

    <UserArea :data="data"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserArea, { ChinaMapItem } from '../common/userArea'

@Component({
  components: {
    UserArea
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
}
</script>

<style lang="less" scoped>
body {
  background-color: #f2f3f6;
}

.demo-page {
  background-color: #f2f3f6;
  padding-bottom: 188px;
}

.header {
  display: flex;
  height: 300px;
  background-color: #f2f3f6;
  padding: 40px;
}

.header-fig {
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 100%;
  border: 15px solid #303030;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.header-main {
  margin-left: 30px;
}

.header-title {
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 10px;
}

.header-bar {
  font-size: 26px;
  font-weight: 300;
  line-height: 1.7;
}
</style>
