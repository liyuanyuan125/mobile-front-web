<template>
  <div class="compet-content">
    <div class="title">相似艺人</div>
    <ul v-if='pkUserListData.length > 0'>
      <li class='li-item'>
        <div class='li-left'>
          <div>
            <img :src="coverImg" alt="">
          </div>
        </div>
        <div class='li-right'>
          <div class='name'>{{pkDate.rivalName}}</div>
          <div class='hot'>
            <ul>
              <li>
                <p class='hot1'>昨日热度</p>
                <p class='hot2'>{{pkDate.yesterHeatCount == '' ? '-' : pkDate.yesterHeatCount}}</p>
              </li>
              <li>
                <p class='hot1'>全网粉丝数</p>
                <p class='hot2'>{{pkDate.interFansTrend == '' ? '-' : pkDate.interFansTrend}}</p>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class='li-item-pk' v-for='(item, index) in pkUserListData' :key='index + item.rivalId' @click='goActorDetail(item.rivalId)'>
        <div class='li-left'>
          <div>
            <img :src="item.coverImg" alt="">
          </div>
        </div>
        <div class='li-right'>
          <div class='name'>{{item.rivalName}}</div>
          <div class='hot'>
            <ul>
              <li>
                <p class='hot1'>昨日热度</p>
                <p class='hot2'>{{item.yesterHeatCount == '' ? '-' : item.yesterHeatCount}}</p>
                <p :class="Number(item.chgyesterHeatTrend) == 0 ? '' : (Number(item.chgyesterHeatTrend) > 0 ?'red':'blue')">{{item.yesterHeatTrend}}</p>
              </li>
              <li>
                <p class='hot1'>全网粉丝数</p>
                <p class='hot2'>{{item.interFansCount == '' ? '-' : item.interFansCount}}</p>
                <p :class="Number(item.chginterFansTrend) == 0 ? '' : (Number(item.chginterFansTrend) > 0?'red':'blue')">{{item.interFansTrend}}</p>
              </li>
            </ul>
          </div>
          <div class='content' v-if='item.eventName != "" && item.eventName != null'>
            <div class='left'>{{item.eventName}}</div>
            <div class='right'>{{item.eventCreatTimeDate}}</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="submit-button" v-if='pkUserListData.length > 0'>
      <!-- 查看详细报告 -->
      <router-link :to="{ name:'sentimentkolproducts', query: { ids: this.pkIdList.join(',') } }" class="to-link" >查看详细报告</router-link>
    </div>
    <dataEmpty v-if='pkUserListData.length == 0' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue , Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'
import { imgFixed } from '@/fn/imgProxy'
import { roleNumber } from '@/fn/validateRules'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
const format = 'YYYY-MM-DD'

@Component({
  components: {
    Icon,
    dataEmpty
  }
})
export default class Main extends Vue {
  @Prop({ type: Array, default: []}) pkUserList!: any
  @Prop({ type: Array, default: []}) pkIdList!: any


  pkUserListData: any = null
  pkDate: any = null
  coverImg: any = ''

  created() {
    this.pkDate = this.pkUserList[0]
    this.coverImg = imgFixed(this.pkUserList[0].rivalCover, 200, 200 , 4)
    this.pkUserListData = (this.pkUserList.slice(1, 3) || []).map((it: any) => {
      return {
        ...it,
        coverImg: imgFixed(it.rivalCover, 200, 260 , 4),
        eventCreatTimeDate: it.eventCreatTime == null ? '' : moment(it.eventCreatTime).format(format),
        yesterHeatTrend: (it.yesterHeatTrend == 0 || it.yesterHeatTrend == null) ? '-' : (it.yesterHeatTrend > 0 ?
        '高' + String(roleNumber(it.yesterHeatTrend)) : '低' + String(roleNumber(it.yesterHeatTrend)).substr(1)),
        interFansTrend: (it.interFansTrend == 0 || it.interFansTrend == null) ? '-' : (it.interFansTrend > 0 ?
        '高' + String(roleNumber(it.interFansTrend)) : '低' + String(roleNumber(it.interFansTrend)).substr(1)),
        chgyesterHeatTrend: it.yesterHeatTrend == null ? 0 : it.yesterHeatTrend,
        chginterFansTrend: it.interFansTrend == null ? 0 : it.interFansTrend,
      }
    })
  }

  // 影人详情页跳转
  goActorDetail(id: any) {
    this.$router.push({
      name: 'sentimentactor',
      params: {
        actorId: id
      }
    })
  }

}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';

.compet-content {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 40px 30px 10px;
}
.li-item, .li-item-pk {
  height: 290px;
  padding-top: 7%;
  .li-left {
    width: 35%;
    height: 100%;
    float: left;
    div {
      width: 200px;
      height: 200px;
      margin: auto;
      border-radius: 5px;
      background: url('../../../../../assets/actordefault.png') no-repeat center center;
      background-size: cover;
      img {
        // width: 100%;
        height: 100%;
        // object-fit: contain;
        // background-color: #fff;
        border-radius: 5px;
      }
    }
  }
  .li-right {
    float: left;
    width: 65%;
    height: 100%;
    padding-left: 20px;
    .name {
      width: 100%;
      height: 55px;
      font-size: 36px;
      font-weight: 500;
      color: rgba(48, 48, 48, 1);
      line-height: 65px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hot {
      height: 150px;
      ul {
        padding-top: 30px;
        height: 100%;
        li {
          float: left;
          width: 50%;
          height: 100%;
        }
        .hot1 {
          font-size: 26px;
          font-weight: 300;
          color: rgba(48, 48, 48, 1);
          line-height: 26px;
        }
        .hot2 {
          font-size: 46px;
          font-weight: bold;
          color: rgba(48, 48, 48, 1);
          line-height: 46px;
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.li-item-pk {
  height: 350px;
  .li-left {
    div {
      width: 200px;
      height: 260px;
      margin: auto;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        // object-fit: contain;
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
  .content {
    width: 90%;
    height: 60px;
    background: rgba(242, 243, 246, 0.5);
    margin-top: 20px;
    font-size: 26px;
    font-weight: 300;
    color: rgba(48, 48, 48, 1);
    line-height: 40px;
    padding: 12px 0 11px 20px;
    .left {
      width: 50%;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .right {
      width: 40%;
      float: right;
      font-size: 22px;
      font-weight: 300;
      color: rgba(48, 48, 48, 0.5);
    }
  }
}
.blue {
  font-size: 26px;
  font-weight: 600;
  color: rgba(136, 170, 246, 1);
  margin-top: 10px;
}
.red {
  font-size: 26px;
  font-weight: 600;
  color: rgba(255, 98, 98, 1);
  margin-top: 10px;
}
.submit-button {
  margin-top: 0;
}
</style>
