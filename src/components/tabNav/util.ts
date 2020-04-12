import { getRootScrollTop, scrollTopTo } from '@/util/scroll'

const getElementTop = (el: HTMLElement) => {
  return el.getBoundingClientRect().top + getRootScrollTop()
}

export function scrollIntoView(
  el: HTMLElement,
  box: HTMLElement,
  duration = 300
) {
  const boxTop = parseInt(getComputedStyle(box).top, 10)
  const boxBottom = boxTop + box.offsetHeight
  const top = Math.ceil(getElementTop(el)) - boxBottom
  return scrollTopTo(top, duration)
}
