<template>
    <div class='scroll'>
        <div class='title'>电影(5)</div>
        <ul>
            <li>
                <p class='p1'>8.36亿</p>
                <p class='p2'>累计票房</p>
            </li>
            <li>
                <p class='p1'>6.9</p>
                <p class='p2'>作品均分
                  <Icon name="question-o" size="13" class="icon-arrow"/>
                </p>
            </li>
            <li>
                <p class='p1-3'>都市 爱情</p>
                <p class='p2'>类型偏好</p>
            </li>
        </ul>
        <div class='movielist'>
            <div class='rowmovie' v-for='item in movieList' :key='item.key'>
                <div class="img">
                  <img :src=item.img alt="">
                </div>
                <div class='name'>
                  {{item.name}}
                </div>
                <div class='type'>{{item.type}}</div>
            </div>
       </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'
import moment from 'moment'

@Component({
  components: {
    Icon,
  }
})
export default class Main extends Vue {

  movieList: any = null

  mounted() {
    this.getMovieList()
  }

  async getMovieList() {
    this.movieList = [
      {
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg',
        name: '晚秋',
        type: '剧集',
        key: 1,
      },
      {
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg',
        name: '晚秋',
        type: '剧集',
        key: 2,
      },
      {
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg',
        name: '晚秋',
        type: '剧集',
        key: 3,
      },
      {
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg',
        name: '晚秋',
        type: '剧集',
        key: 4,
      },
      {
        img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg',
        name: '晚秋',
        type: '剧集',
        xkey: 5,
      }

    ]
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
    .p1 {
      width: 100%;
      height: 50px;
      font-size: 40px;
      font-weight: bold;
      color: rgba(48, 48, 48, 1);
      line-height: 50px;
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
        top: 21%;
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
    }
  }
}

.movielist {
  width: 100%;
  display: flex;
  overflow: scroll;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.rowmovie {
  -webkit-flex: 1 0 auto;
  flex: 1 0 auto;
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
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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
