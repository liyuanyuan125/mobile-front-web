<template>
  <span class="tip" @click="showNote">
    <Icon name="question-o" :size="size" :color="color"/>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'vant'
import { alert } from '@/util/toast'

@Component({
  components: {
    Icon
  }
})
export default class Tip extends Vue {
  @Prop({ type: String, default: '' }) text!: string

  @Prop({ type: Number, default: 16 }) size!: number

  @Prop({ type: String, default: '#303030' }) color!: string

  showNote() {
    alert({
      // title: '提示',
      message: this.text,
      showConfirmButton: true,
      width: '80%'
    })
  }
}
</script>

<style lang="less" scoped>
.tip {
  display: flex;
  align-content: center;
  padding: 0 10px;
}
</style>
