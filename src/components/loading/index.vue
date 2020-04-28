<template>
   <van-loading color="#1989fa" size="30" class="loading" />
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Loading } from 'vant'

@Component({
  components: {
    [Loading.name]: Loading,
  }
})
export default class Main extends Vue {
}

</script>

<style lang='less' scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -15px;
  margin-top: -15px;
}
</style>
