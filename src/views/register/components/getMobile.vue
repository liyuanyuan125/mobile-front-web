<template>
  <div class="getmobile">
    <p>广告主申请入驻</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getProvinceList, getQualification } from '@/api/commonData'
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
    this.getProvince()
    this.getQualification()
  }

  /**
   * 获取省份城市
   */
  async getProvince() {
    try {
      const { data } = await getProvinceList()
      this.provinceData = data.provinceList
      if (data.provinceList.length) {
        this.provinceList = data.provinceList
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  /**
   * 获取省份城市
   */
  async getQualification() {
    try {
      const { data } = await getQualification('PARTNER_BUSINESS')
      const result = []
      // 添加默认 key
      result.push({
        key: 'NULL',
        text: '企业所属行业'
      })
      // controlStatus 有3个参数，0=未知 1=有效 2=无效 只取有效
      for (const item of data) {
        if (item.controlStatus === 1) {
          result.push(item)
        }
      }
      if (result.length) {
        this.qualificationList = result
      }
    } catch (err) {
      throw new Error(err)
    }
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
@import '../less/infoList.less';
</style>
