import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    requestId: '',
    password: '',
    phoneNumber: ''
  },
  mutations: {
    requestId(state, value: string) {
      state.requestId = value
    },
    password(state, value: string) {
      state.password = value
    },
    phoneNumber(state, value: string) {
      state.phoneNumber = value
    },
  }
})

// 校验验证码时的requestId和password传给表单页面
export function setRequestId(value?: string) {
  store.commit('requestId', value)
}

export function setPassword(value?: string) {
  store.commit('password', value)
}
export function setPhoneNumber(value?: string) {
  store.commit('phoneNumber', value)
}

export default store
