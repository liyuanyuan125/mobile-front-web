import Vue from 'vue'

Vue.directive('real-img', async (el: any, binding: any) => {
  // 没传default-img 属性则用默认的url属性
  const selfImg = el.getAttribute('default-img')
  const defaultURL = selfImg

  const imgURL: any = binding.value
  if (!imgURL) {
    el.setAttribute('src', defaultURL)
    return
  }

  const exist: any = await imageIsExist(imgURL)
  const srcUrl = exist ? imgURL : defaultURL
  el.setAttribute('src', srcUrl)
})

// 检测图片是否有效
const imageIsExist = (url: any) => {
  return new Promise((resolve: any) => {
      let img: any = new Image()
      img.src = url
      img.onload =  () => {
        resolve(true)
        img = null
      }
      img.onerror = () => {
        resolve(false)
        img = null
      }
  })
}

