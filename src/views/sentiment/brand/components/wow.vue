<template>
  <div class="wow-content">
    <div class="title">口碑评论
      <router-link class="to-more" to="" ><van-icon name="arrow" size="14" /></router-link>
    </div>
    <div class="flex-box flex-between hot-echart">
      <div class="flex-box hot-left">
        <em>好感度</em><van-icon @click="handleQues" name="question-o" color="#acacac" size="17" />
      </div>
      <div class="hot-right">
        xxxx
      </div>
    </div>
    <div class="hot-works wow-items">
      <em>全网热词</em>
      <span v-for="(it,index) in publicPraise.hotWordList" :key="'hot'+ index">{{it}}</span>
    </div>
    <div class="fu-works wow-items">
      <em>负面热词</em>
      <span v-for="(it,index) in publicPraise.hotWordList" :key="'hot'+ index">{{it}}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Icon, Toast } from 'vant'


@Component({
  components: {
    [Icon.name]: Icon,
  }
})
export default class Main extends Vue {
  publicPraise = {
    hotWordList: ['故宫', '故宫', '故宫', '故宫'],
    badWordList: ['维权', '维权', '维权', '维权']
  }

  handleQues() {
    Toast('根据口碑评论的正负面及热词的热度计算出来的口碑评论好感度')
  }
}

</script>

<style lang='less' scoped>
@import '~@/less/lib.less';
@import '../com.less';

.wow-content {
  margin: 20px 0;
  background-color: #fff;
  padding: 60px 30px 10px;
}
.hot-echart {
  padding: 56px 0 30px;
}
.hot-left {
  em {
    font-size: 30px;
    padding-right: 10px;
  }
  
}
.wow-items {
  padding: 30px 0 40px 46px;
  font-size: 30px;
  span {
    color: rgba(48,48,48,0.5);;
    padding-left: 50px;
  }
}
.hot-works {
  border-bottom: solid 1px @c-divider;
  background: url('../images/nethots.png') no-repeat left 35px;
  background-size: 35px;
}
.fu-works {
  background: url('../images/downside.png') no-repeat left 35px;
  background-size: 35px;
}
</style>
