import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    requestId: '',
    password: ''
  },
  mutations: {
    requestId(state, value: string) {
      state.requestId = value
    },
    password(state, value: string) {
      state.password = value
    },
  }
})

// 校验验证码时的requestId和password传给表单页面
export function getRequestId(value?: string) {
  store.commit('requestId', value)
}

export function getPassword(value?: string) {
  store.commit('password', value)
}

export default store
