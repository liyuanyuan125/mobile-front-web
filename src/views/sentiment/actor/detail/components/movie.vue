<template>
  <div class="scroll">
    <div class="title">电影({{data.movieCount}})</div>
    <ul>
      <li>
        <p class="p1">{{(data.boxOfficeCount == '' || data.boxOfficeCount == null) ? '-' : data.boxOfficeCount}}</p>
        <p class="p2">累计票房</p>
      </li>
      <li class="chgli"></li>
      <li>
        <p class="p1">{{(data.averagScore == '' || data.averagScore == null) ? '-' : data.averagScore}}</p>
        <p class="p2" @click="showNote()">
          作品均分
          <Icon name="question-o" size="13" class="icon-arrow" />
        </p>
      </li>
      <li class="chgli"></li>
      <li>
        <p class="p1-3">{{(data.mainGenre == '' || data.mainGenre == null) ? '-' : data.mainGenre}}</p>
        <p class="p2">类型偏好</p>
      </li>
    </ul>
    <div class="movielist">
      <div class="rowmovie" v-for="(item, index) in dataList" :key="index + item.movieId">
        <div class="img" @click="goDetail(item.movieId)">
          <!-- <img :src=item.coverUrl.url alt=""> -->
          <img :src="item.coverImg" alt />
        </div>
        <div class="name">{{(item.movieName == null || item.movieName == '') ? '-' : item.movieName}}</div>
        <div class="type">{{(item.genres == '' || item.genres == null) ? '-' : item.genres}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'
import { alert } from '@/util/toast'
import { imgFixed } from '@/fn/imgProxy'
import { openWebPage } from '@/fn/openUrlInApp'

@Component({
  components: {
    Icon
  }
})
export default class Main extends Vue {
  @Prop({ type: Object, default: [] }) data!: any

  dataList: any = []
  created() {
    this.dataList = (this.data.movieList.slice(0, 10) || []).map((it: any) => {
      return {
        ...it,
        coverImg: it.coverUrl
          ? imgFixed(it.coverUrl, 200, 260, 4)
          : require('@/assets/moviedefault.png')
      }
    })
  }

  defaultImg: any = '@/assets/moviedefault.png'

  // 显示说明
  showNote() {
    alert({
      // title: '提示',
      message: '作品评分为全网综合评分',
      showConfirmButton: true,
      className: 'alertwid'
    })
  }

  // 详情页跳转
  goDetail(id: any) {
    openWebPage(`/sentiment/movie/${id}`)
    // this.$router.push({
    //   name: 'sentimentmovie',
    //   params: {
    //     movieId: id
    //   }
    // })
  }
}
</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '~@/components/hotLine/com.less';

.scroll {
  .title {
    margin-top: 38px;
    font-size: 34px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    line-height: 34px;
  }
  ul {
    height: 130px;
    margin-top: 30px;
    display: flex;
    background: rgba(242, 243, 246, 0.5);
    border-radius: 10px;
    li {
      padding-top: 25px;
      width: 33.3%;
      text-align: center;
    }
    .chgli {
      width: 1px;
      height: 50px;
      background: rgba(216, 216, 216, 1);
      opacity: 0.5;
      margin-top: 6%;
    }
    .p1 {
      width: 100%;
      height: 50px;
      font-size: 40px;
      font-weight: bold;
      color: rgba(48, 48, 48, 1);
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .p2 {
      width: 100%;
      display: block;
      height: 50px;
      // display: inline-flex;
      font-size: 24px;
      font-weight: 300;
      color: rgba(48, 48, 48, 1);
      line-height: 50px;
      position: relative;
      .icon-arrow {
        display: inline-block;
        position: absolute;
        top: 23%;
        right: 15%;
      }
    }
    .p1-3 {
      width: 100%;
      height: 50px;
      font-size: 30px;
      font-weight: 600;
      color: rgba(48, 48, 48, 1);
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.movielist {
  width: 100%;
  display: -webkit-box;
  overflow: scroll;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.rowmovie {
  // -webkit-flex: 1 0 auto;
  // flex: 1 0 auto;
  margin-top: 30px;
  width: 190px;
  // height: 260px;
  border-radius: 20px;
  // padding: 30px 0;
  margin-right: 30px;
  margin-bottom: 30px;
  .img {
    width: 100%;
    height: 260px;
    border-radius: 10px;
    background: url('../../../../../assets/moviedefault.png') no-repeat center center;
    background-size: cover;
    // border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      // object-fit: contain;
    }
  }
  .name {
    margin-top: 20px;
    width: 100%;
    height: 36px;
    font-size: 30px;
    font-weight: 400;
    color: rgba(48, 48, 48, 1);
    line-height: 36px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .type {
    margin-top: 6px;
    height: 36px;
    font-size: 26px;
    font-weight: 400;
    color: rgba(48, 48, 48, 0.4);
    line-height: 36px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
