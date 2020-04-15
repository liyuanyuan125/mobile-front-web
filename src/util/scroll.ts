import EventChain from '@/fn/EventChain'
import { debounce } from 'lodash'
import raf from 'raf'

/**
 * 设置元素节点或 window 的竖向滚动位置
 * @param el 元素节点或 window
 * @param value 滚动位置
 */
export function setScrollTop(el: HTMLElement | Window, value: number) {
  if ('scrollTop' in el) {
    // 对于元素节点
    el.scrollTop = value
  } else {
    el.scrollTo(el.scrollX, value)
  }
}

/**
 * 获取页面根的竖向滚动位置，即 body 的竖向滚动位置
 */
export function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

/**
 * 设置页面根的竖向滚动位置，即 body 的竖向滚动位置
 * @param value 滚动位置
 */
export function setRootScrollTop(value: number) {
  setScrollTop(window, value)
  setScrollTop(document.body, value)
}

/**
 * watchScroll 函数选项
 */
export interface WatchScrollOptions {
  /** 节流毫秒数，默认 10 */
  throttle?: number
}

const eventNames = ['scroll', 'resize']

let event: EventChain | null = null

/**
 * 监听滚动改变（scroll、resize 等事件导致的滚动改变）
 * 并且节流事件发生的时间间隔，默认 10 毫秒
 *
 * 使用方法：
 * ```js
 * watchScroll().then(() => {
 *   // 随着页面滚动，该回调函数会被不断调用
 * })
 * ```
 *
 * 注意，这里虽然也有 then，但没有 catch，它也不是 Promise（Promise 的 then 也不会不断调用）
 */
export function watchScroll({
  throttle = 10
}: WatchScrollOptions = {}) {
  if (event == null) {
    event = new EventChain()
    const handler = debounce(() => event!.emit(), throttle)
    eventNames.forEach(name => window.addEventListener(name, handler))
    handler()
  }
  return event
}

/**
 * 监听页面根的竖向滚动位置
 *
 * 使用方法：
 *
 * ```js
 * useRootScrollTop().then(top => {
 *   // 随着页面滚动，该回调函数会被不断调用，top 不断改变
 * })
 *
 * 注意，这里虽然也有 then，但没有 catch，它也不是 Promise（Promise 的 then 也不会不断调用）
 * ```
 */
export function useRootScrollTop() {
  return watchScroll().then(() => {
    const top = getRootScrollTop()
    // 返回的值，会被作为参数，传给下一个 then 使用，
    // 这是类 `EventChain` 的特性，参见 watchScroll 的实现
    return top
  })
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
