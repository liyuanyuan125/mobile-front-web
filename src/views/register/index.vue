<template>
  <div class="viewpage">
    <GetMobile />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import GetMobile from './components/getMobile.vue'
import VerifyCode from './components/verifyCode.vue'
import SetPassWord from './components/setPassWord.vue'
import Success from './components/success.vue'
import { submitApplicationInfo } from '@/api/theater'
import { toast } from '@/util/toast'

@Component({
  components: {
    GetMobile,
    VerifyCode,
    SetPassWord,
    Success
  }
})
export default class Application extends Vue {}
</script>

<style lang="less" scoped>
@import url('./less/main.less');
</style>