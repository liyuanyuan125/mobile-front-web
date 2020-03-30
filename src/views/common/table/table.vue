<template>
  <div class='main' v-if='show'>
      <!-- <ModuleTitle :title="title" /> -->
      <div class='title'>{{title}}</div>
      <div style='padding: 0 15px'>
        <div class='but' v-if='regionPk != ""'>
          <Button class='chg' v-for='(item) in tabList' :key='item.key' :class="{'chgbgc': regionPk == item.key}" type="primary" @click='chgregionPk(item.key)'>{{item.name}}</Button>
          <!-- <Button class='fans' :class="{'chgbgc': regionPk == 1}" type="primary" @click='chgregionPk(1)'>城市分布</Button> -->
          <!-- <Button class='chg' :class="{'chgbgc': regionPk == 2}" type="primary" @click='chgregionPk(2)'>省份分布</Button> -->
        </div>
        <List
          class='table'
        >
        <ul class='titleul'>
            <li class='table-title' v-for='item in tableTitle' :key='item.key'>
              {{item.value}}
          </li>
        </ul>
          
          <div class='table-item' v-for='(item, index ) in tableItem' :key='index' :style="{background:(String(index / 2).indexOf('.') == 1 ? 'backgroundColor':'#fff')}">
            <div class='table-item-title'>{{item.rivalName}}</div>
            <ul class='table-item-ul'>
              <li v-for='(itemlist, index ) in item.dataList.slice(0, 5)' :key='index'>
                <div v-if='itemlist.name != ""' class='top'>{{itemlist.name}}</div>
                <div v-if='itemlist.name != ""' class='bottom'>{{(itemlist.value/100).toFixed(1)}}%</div>
                <!-- <div v-if='itemlist.name == ""'>--</div> -->
              </li>
              <li>-</li>
              <li>-</li>
              <li>-</li>
              <li>-</li>
            </ul>
          </div>
        </List>
      </div>
      
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { List } from 'vant'
import { Button } from 'vant'
import ModuleTitle from '@/components/sentimentTitle'

@Component({
  components: {
    List,
    Button,
    ModuleTitle
  }
})
export default class KolPage extends ViewBase {
  @Prop({ type: String }) title!: any
  @Prop({ type: Array }) tableTitle!: any
  @Prop({ type: Array }) tableItem!: any
  @Prop({ type: Array }) tabList!: any

  show: any = false

  regionPk: any = null

  mounted() {
    this.regionPk = this.tabList.length == 0 ? '' : this.tabList[0].key
    this.show = true
  }

  // 切换平台热度对比
  chgregionPk(num: any) {
    this.regionPk = num
    this.$emit('chgregionPk', num)
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  background: #fff;
  margin-top: 50px;
}
.title {
  height: 34px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 34px;
  margin-top: 48px;
  margin-bottom: 30px;
  padding-left: 30px;
}
.but {
  margin-bottom: 40px;
}
/deep/ .van-button--primary {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  color: #303030;
  border-radius: 30px;
  border: 2px solid rgba(235, 235, 235, 1);
  font-size: 26px;
}
.chg {
  margin-right: 20px;
}
.chgbgc {
  background: #88aaf6;
  color: #fff;
}
.table {
  width: 100%;
  // height: 410px;
  background: #f5f4f7;
  border-radius: 10px;
  border: 2px solid rgba(232, 232, 232, 1);
  .titleul {
    height: 80px;
    li {
      height: 80px;
      background: #f5f4f7;
      width: 16.66%;
      // display: inline-flex;
      float: left;
      text-align: center;
      line-height: 80px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(48, 48, 48, 1);
    }
    li + li {
      border-left: 1px solid rgba(216, 216, 216, 1);
    }
  }
  .table-item {
    height: 110px;
    line-height: 110px;
    .table-item-title {
      width: 16.66%;
      float: left;
      font-size: 26px;
      font-weight: 500;
      color: rgba(48, 48, 48, 1);
      text-align: center;
      line-height: 110px;
    }
    .table-item-ul {
      width: 83.34%;
      float: left;
      height: 110px;
      overflow: hidden;
      li {
        // padding-top: 2%;
        height: 100%;
        width: 20%;
        float: left;
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        color: rgba(48, 48, 48, 1);
        border-left: 1px solid rgba(216, 216, 216, 1);
        .top {
          height: 55px;
          line-height: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bottom {
          height: 55px;
          line-height: 55px;
        }
      }
    }
  }
}
</style>
