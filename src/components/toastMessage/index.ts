import Vue from 'vue'
import vueToastMessage from './index.vue'
const toastTem = Vue.extend(vueToastMessage)
let instance: any
let timer: any = null
const toastMessage: any = (options: any) => {
  if (!instance) {
    instance = new toastTem()
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
  }
  if (timer) {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.message = ''
  }
  const time = 3000
  if (typeof options === 'string') {
    instance.message = options
  } else if (typeof options === 'object') {
    const {message} = options
    let {times} = options
    instance.message = message
    times = times || 3000
  } else {
    return
  }
  instance.show = true
  timer = setTimeout(() => {
    instance.show = false
    clearTimeout(timer)
    timer = null
    instance.message = ''
  }, time)
}
toastMessage.close = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
    instance.show = false
    instance.message = ''
  }
}
toastMessage.install = (vue: any) => {
  Vue.prototype.$toastMessage = toastMessage
}
export default toastMessage
