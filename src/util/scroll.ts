import EventChain from '@/fn/EventChain'
import { debounce } from 'lodash'
import raf from 'raf'

const eventNames = ['scroll', 'resize']

let event: EventChain | null = null

export function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

export function watchScroll() {
  if (event == null) {
    event = new EventChain()
    const handler = debounce(() => event!.emit(), 10)
    eventNames.forEach(name => window.addEventListener(name, handler))
    handler()
  }
  return event
}

export function usePosition() {
  return watchScroll().then(() => {
    const top = getRootScrollTop()
    return top
  })
}

export function setScrollTop(el: HTMLElement | Window, value: number) {
  if ('scrollTop' in el) {
    el.scrollTop = value
  } else {
    el.scrollTo(el.scrollX, value)
  }
}

export function setRootScrollTop(value: number) {
  setScrollTop(window, value)
  setScrollTop(document.body, value)
}

/**
 * 动画滚动 top 到某个位置
 * @param to 位置
 * @param duration 动画进行时间，毫秒数
 */
export function scrollTopTo(to: number, duration: number) {
  return new Promise(resolve => {
    let current = getRootScrollTop()
    const isDown = current < to
    const frames = duration === 0 ? 1 : Math.round(duration / 16)
    const step = (to - current) / frames

    const animate = () => {
      current += step

      if (isDown && current > to || !isDown && current < to) {
        current = to
      }

      setRootScrollTop(current)

      if (isDown && current < to || !isDown && current > to) {
        raf(animate)
      } else {
        resolve()
      }
    }

    animate()
  })
}
