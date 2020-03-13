<template>
  <SentimentBar :attribute="topbar" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar'

@Component({
  components: {
    SentimentBar
  }
})
export default class MoviePage extends ViewBase {
  topbar = {
    title: '流浪地球',
    diggShow: true,
    pkShow: true
  }
}
</script>

<style lang="less" scoped>
</style>
