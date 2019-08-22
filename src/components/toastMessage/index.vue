<template>
  <div class="toastMessageBox" v-show="show">{{message}}</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class ToastMessage extends Vue {
    message: any
    show: any
  }
</script>

<style lang='less' scoped>
  .toastMessageBox{
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 8px;
    font-size: 16px;
    border-radius: 8px;
    text-align: center;
  }
</style>
