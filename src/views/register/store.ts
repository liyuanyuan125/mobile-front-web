import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const applicationStore = new Vuex.Store({
    state: {
        requestId: '',
        userType: '1',
        companyName: '',
        userName: '',
        userMobile: '',
        password: '',
        recommendPhone: '',
        guestId: ''
    },
    mutations: {
        requestId(state, value: string) {
            state.requestId = value
        },
        userType(state, value: string) {
            state.userType = value
        },
        companyName(state, value: string) {
            state.companyName = value
        },
        userName(state, value: string) {
            state.userName = value
        },
        userMobile(state, value: string) {
            state.userMobile = value
        },
        password(state, value: string) {
            state.password = value
        },
        recommendPhone(state, value: string) {
            state.recommendPhone = value
        },
        guestId(state, value: string) {
            state.guestId = value
        }
    }
})

// 校验验证码时的requestId和password传给表单页面
export function setRequestId(value?: string) {
    applicationStore.commit('requestId', value)
}
export function setUserType(value?: string) {
    applicationStore.commit('userType', value)
}
export function setCompanyName(value?: string) {
    applicationStore.commit('companyName', value)
}
export function setUserName(value?: string) {
    applicationStore.commit('userName', value)
}
export function setUserMobile(value?: string) {
    applicationStore.commit('userMobile', value)
}
export function setPassword(value?: string) {
    applicationStore.commit('password', value)
}
export function setRecommendPhone(value?: string) {
    applicationStore.commit('recommendPhone', value)
}
export function setGuestId(value?: string) {
    applicationStore.commit('guestId', value)
}

export default applicationStore
