<template>
  <div class="companyBox">
    <dl>
      <dd>
        <span class="input">
          <input type="text" class="inputTxt" placeholder="企业名称" v-model="companyItem.companyName" />
        </span>
      </dd>
      <dd>
        <span class="input">
          <input type="text" class="inputTxt" placeholder="联系人姓名" v-model="companyItem.contact" />
        </span>
      </dd>
      <dd>
        <span class="input">
          <input
            type="number"
            class="inputTxt"
            maxlength="11"
            placeholder="手机号码"
            v-model="companyItem.contactTel"
          />
        </span>
      </dd>
      <dd class="areaBox">
        <span class="selectbox">
          <select
            class="select"
            :style="{color:!companyItem.provinceId ? '' :'#404d66'}"
            v-model="companyItem.provinceId"
            @change="selectProvince(companyItem.provinceId)"
          >
            <option value="0">企业所在省份</option>
            <option
              v-for="pro in provinceList"
              :key="pro.provinceId"
              :value="pro.provinceId"
            >{{pro.provinceName}}</option>
          </select>
        </span>
        <span class="selectbox">
          <select
            class="select"
            v-model="companyItem.cityId"
            :style="{color:!companyItem.cityId ? '' :'#404d66'}"
          >
            <option value="0">城市</option>
            <option
              v-for="city in cityList"
              :key="city.cityId"
              :value="city.cityId"
            >{{city.cityName}}</option>
          </select>
        </span>
      </dd>
      <dd>
        <select
          class="select"
          v-model="companyItem.qualificationId"
          :style="{color:companyItem.qualificationId === 'NULL' ? '' :'#404d66'}"
        >
          <option
            v-for="quality in qualificationList"
            :key="quality.key"
            :value="quality.key"
          >{{quality.text}}</option>
        </select>
      </dd>
      <dd class="uploadFile">
        <div class="row">
          <span @click="uploadImg">
            <img :src="credentialImg" v-if="credentialImg" alt="营业执照" />
            <em v-else>上传营业执照</em>
          </span>
        </div>
      </dd>
      <dd>
        <span class="input">
          <input
            type="tel"
            maxlength="11"
            class="inputTxt"
            placeholder="推荐人手机号码"
            v-model="companyItem.recommendTel"
          />
        </span>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getProvinceList, getQualification } from '@/api/commonData'
import ViewBase from '@/util/ViewBase'
import { handleUploadImage } from '@/util/native'
// import { setTimeout } from 'timers'

@Component
export default class CompanyInfo extends ViewBase {
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
    const resultJSON = JSON.parse(result)
    this.credentialImg = result.data.imageList[0].url
    // console.log('result', result)
  }
}
</script>

<style lang="less" scoped>
@import '~@/views/theater/entryApplication/less/infoList.less';
</style>
