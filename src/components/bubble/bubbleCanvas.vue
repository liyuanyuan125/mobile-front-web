<template>
  <div class="bubble-warper">
    <canvas id="Bubble" width="400" height="571"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BubbleItem } from './types'

@Component({
  components: {
  }
})
export default class Bubble extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: BubbleItem[]

  $dataSelf: BubbleItem[] = []
  $el: any
  $ctx: any
  cbs: any
  balls: any
  total: number = 0
  $w: number = 0
  $h: number = 0

  mounted() {
    this.$dataSelf = this.data
    this.$el = document.querySelector('#Bubble')
    this.$ctx = this.$el.getContext('2d')
    // this.cbs = options && options.methods
    this.balls = []
    this.total = 0
    this.$w = this.$el.width
    this.$h = this.$el.height
    this.init()
  }

  init() {
    this.$dataSelf.forEach(item => {
      this.total += item.value
    })

    this.$dataSelf.forEach(item => {
      const r = (this.$h * (item.value / this.total))
      // 创建圆
      const prefix = this.createBall(r)
      const ball = {
        x: prefix.x,
        y: prefix.y,
        r,
        color: `#4f7aeb`,
        data: item
      }
      this.balls.push(ball)
      this.draw(ball)
    })
  }

  createBall(r: any) {
    let ball
    let count = 0
    while (this.isAxios(ball = this.getPrefix(r)) && count < 200) {
      count++
    }
    return ball
  }

  getPrefix(r: any) {
    let x = 0
    let y = 0
    x = 80 + Math.random() * (this.$w - 160)
    y = 80 + Math.random() * (this.$h - 160)
    return {
      x,
      y,
      r
    }
  }

  isAxios(circle: any) {
    const len = this.balls.length
    let axiosBall
    for (let i = 0; i < len; i++) {
      const x1 = this.balls[i].x
      const y1 = this.balls[i].y
      const r1 = this.balls[i].r
      const x2 = circle.x
      const y2 = circle.y
      const r2 = circle.r
      if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < (r2 + r1) * (r2 + r1)) {
        axiosBall = this.balls[i]
      }
    }
    return axiosBall
  }

  clearCanvas() {
    this.$el.height = this.$h
  }

  getInfo() {
    return {
      el: this.$el,
      width: this.$w,
      height: this.$h
    }
  }

  draw(ball: any) {
    this.$ctx.beginPath()
    this.$ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI)
    this.$ctx.stroke()
    this.$ctx.fillStyle = ball.color
    this.$ctx.fill()
    this.$ctx.fillStyle = '#fff'
    this.$ctx.fillText(ball.data.name, ball.x - ball.r / 2, ball.y)
  }
}
</script>

<style lang="less" scoped>
.bubble-warper {
  position: relative;
  width: 100%;
  height: 188px;
}

</style>
