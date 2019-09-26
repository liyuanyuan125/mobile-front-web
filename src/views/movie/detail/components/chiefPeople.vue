<template>
  <div class="chiefpeople">
    <h3>主创人员</h3>
    <div class="peoplelist">
      <dl>
        <dd>
          <i class="img">
            <img
              src="http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/06/24/190624120656994516.jpg"
            />
          </i>
          <h5>田元生</h5>
          <p>导演</p>
        </dd>
        <dd>
          <i class="img">
            <img
              src="http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/23/190423000129911846.jpg"
            />
          </i>
          <h5>吴京</h5>
          <p>饰：方五洲</p>
        </dd>
        <dd>
          <i class="img">
            <img
              src="http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/06/24/190624120656994516.jpg"
            />
          </i>
          <h5>章子怡</h5>
        </dd>
        <dd>
          <i class="img">
            <img
              src="http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/06/24/190624120656994516.jpg"
            />
          </i>
          <h5>张译</h5>
        </dd>
        <dd>
          <i class="img">
            <img
              src="http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/04/23/190423000129911846.jpg"
            />
          </i>
          <h5>井柏然</h5>
        </dd>
        <dd>
          <i class="img">
            <img
              src="http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/06/24/190624120656994516.jpg"
            />
          </i>
          <h5>胡歌</h5>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class ChiefPeople extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/index.less';
</style>
