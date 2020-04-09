<template>
  <div class="viewpage">
    <dl class="login">
      <dt>user:</dt>
      <dd>
        <input type="text" v-model.trim="account" />
      </dd>
      <dt>password:</dt>
      <dd>
        <input type="text" v-model.trim="password" />
      </dd>
      <dt>
        <button @click="goLogin">登录</button>
      </dt>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import GetMobile from './components/getMobile.vue'
import VerifyCode from './components/verifyCode.vue'
import SetPassWord from './components/setPassWord.vue'
import SuccessPage from './components/success.vue'
import { submitApplicationInfo } from '@/api/theater'
import { toast } from '@/util/toast'
import { get, post, put, del } from '@/fn/ajax'

@Component({
  components: {}
})
export default class Login extends Vue {
  account: string = ''
  password: string = ''

  async goLogin() {
    const res = await post('/auth/login', {
      account: this.account,
      password: this.password
    })
    return res
  }
}
</script>

<style lang="less" scoped>
.login {
  padding: 100px 50px;
  input {
    border: 1px solid #d8d8d8;
    font-size: 26px;
    line-height: 2;
    width: 80%;
    padding: 0 15px;
  }
  dt {
    margin-top: 30px;
  }
  dd {
    margin-top: 15px;
  }
  button {
    border-radius: 6px;
    background: #88aaf6;
    color: #fff;
    text-align: center;
    line-height: 60px;
    padding: 0 40px;
  }
}
</style>