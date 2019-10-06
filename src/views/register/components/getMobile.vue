<template>
  <div class="getmobile">
    <p>广告主申请入驻</p>
    <div></div>
    <dl>
      <dd>
        <input type="text" placeholder="企业名称" />
      </dd>
      <dd>
        <input type="text" placeholder="姓名" />
      </dd>
      <dd>
        <input type="text" placeholder="手机号" />
      </dd>
      <dd>
        <input type="text" placeholder="推荐人手机号码 (选填)" />
      </dd>
      <dt>
        <i></i>《广告主合作协议》
      </dt>
    </dl>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { handleUploadImage } from '@/util/native'

@Component
export default class GetMobile extends ViewBase {
  @Prop({ type: Object }) companyItem!: object

  provinceData: any = undefined // 所有城市数据
  provinceList: any = [] // 省份列表
  cityList: any = [] // 城市列表
  qualificationList: any = [] // 企业类型列表
  credentialImg = ''

  async created() {
    // html加载完成之前，执行
  }

  /**
   * 选择省份
   */
  async selectProvince(val: any) {
    // this.companyItem.cityId = 0;
    for (const proItem of this.provinceData) {
      const pid = proItem.provinceId
      if (pid === val) {
        this.cityList = proItem.cityList
      }
    }
  }

  /**
   * 调取原生上传图片
   */
  async uploadImg() {
    const obj = {
      params: {
        sourceType: 3, // 1从相册选取 2拍照上传 3都有
        imageCount: 1 // 图片数量
      },
      callBackName: 'uploadImageCallBack' // 客户端回调JS方法
    }
    const result: any = await handleUploadImage(obj)

    // 防止操作中途停止时报错
    if (result) {
      const resultJSON = JSON.parse(result)
      this.credentialImg = resultJSON.data.imageList[0].url
      this.$emit('credentialFileId', resultJSON.data.imageList[0].fileId)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
