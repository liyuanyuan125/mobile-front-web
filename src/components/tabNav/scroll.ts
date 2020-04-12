import scrollIntoViewLib from 'scroll-into-view-if-needed'

export function scrollIntoView(element: HTMLElement | null, box: HTMLElement) {
  element && scrollIntoViewLib(element, {
    block: 'start',
    scrollMode: 'always',
    behavior: actions => {
      const canSmoothScroll = 'scrollBehavior' in document.body.style
      const boxTop = parseInt(getComputedStyle(box).top, 10)
      const boxBottom = boxTop + box.offsetHeight
      actions.forEach(({ el, top: fromTop }) => {
        const top = fromTop - boxBottom
        el.scroll && canSmoothScroll
          ? el.scroll({ top, behavior: 'smooth' })
          : (el.scrollTop = top)
      })
    },
  })
}
