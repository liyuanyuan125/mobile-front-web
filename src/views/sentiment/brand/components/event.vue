<template>
    <eventList :eventList="list" :params="params"/>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import eventList from '@/views/common/eventList/event.vue'
import moment from 'moment'

@Component({
  components: {
    eventList
  }
})
export default class Main extends Vue {
  // 路由定义参数
  params = {}
  get list() {
    return [
      {
        eventId: 1,
        eventName: '四川一辅警开奔驰强行闯关被辞',
        creatTime: 1582897820984,
        target: [
          {
            targetCode: 'hot',
            targetName: '热点'
          },
          {
            targetCode: 'negative',
            targetName: '负面'
          }
        ], // 格式为string[]或者object[]待定 最多2个标签
        interactiveList: [
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '10万+'
          },
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '200万+'
          },
        ]
      },
      {
        eventId: 2,
        eventName: 'xxx',
        creatTime: 1582297820984,
        target: [{
          targetCode: '11',
          targetName: '正面'
        }],
        interactiveList: [
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '10万+'
          },
          {
            url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg',
            text: '80万+'
          },
        ]
      },
   ]
  }
}

</script>

<style lang='less' scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import '../less/com.less';

.event-content {
  margin: 20px 0;
  background-color: #fff;
  padding: 60px 30px 68px;
}
</style>
