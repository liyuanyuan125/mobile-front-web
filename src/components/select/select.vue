<template>
  <span class="select">
    <select v-model="model">
      <option
        v-for="{ name, value } in list"
        :key="value"
        :value="value"
      >{{name}}</option>
    </select>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { SelectValue, NameValue } from './types'

@Component
export default class Select extends Vue {
  /** 选项列表 */
  @Prop({ type: [ String, Number, Boolean ], default: '' }) value!: SelectValue

  /** 选项列表 */
  @Prop({ type: Array, default: () => [] }) list!: NameValue[]

  model: SelectValue = ''

  @Watch('value', { immediate: true })
  watchValue(value: SelectValue) {
    this.model = value
  }

  @Watch('model')
  watchModel(value: SelectValue) {
    this.$emit('input', value)
  }
}
</script>

<style lang="less" scoped>
.select {
  position: relative;
  display: inline-block;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  border: 2px solid #ebebeb;
  text-align: center;
  color: #303030;
  font-size: 14px;
  padding: 0 58px 0 24px;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    width: 0;
    height: 0;
    border-top: 10px solid #404d66;
    border-left: 8px solid #fff;
    border-right: 8px solid #fff;
    background-color: #404d66;
    transform: translateY(-50%);
  }

  select {
    width: 100%;
    height: 56px;
    line-height: 56px;
    background: transparent;
    font-size: 26px;
    appearance: none;
    color: rgba(48, 48, 48, 0.6);
  }
}
</style>
