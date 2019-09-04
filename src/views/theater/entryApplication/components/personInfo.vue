<template>
  <div class="companyBox">
    <dl>
      <dd>
        <span class="input">
          <input type="text" class="inputTxt" placeholder="联系人姓名" v-model="personItem.contact" />
        </span>
      </dd>
      <dd>
        <span class="input">
          <input
            type="tel"
            class="inputTxt"
            maxlength="11"
            placeholder="手机号码"
            disabled="false"
            v-model="personItem.contactTel"
          />
        </span>
      </dd>
      <dd>
        <select
          class="select"
          v-model="personItem.voucherId"
          @change="changeVoucher"
          :style="{color:personItem.voucherId === 'NULL' ? '' :'#404d66'}"
        >
          <option v-for="per in voucherList" :key="per.key" :value="per.key">{{per.text}}</option>
        </select>
      </dd>
      <dd class="uploadFile">
        <div class="rowTwo" v-if="personItem.voucherId ==='ID_CARD'">
          <span @click="uploadImg($event)" data-type="front">
            <img :src="voucherImgs[0]" v-if="voucherImgs[0]" alt="身份证正面照" />
            <em v-else>身份证正面照</em>
          </span>
          <span @click="uploadImg($event)" data-type="back">
            <img :src="voucherImgs[1]" v-if="voucherImgs[1]" alt="身份证背面照" />
            <em v-else>身份证背面照</em>
          </span>
        </div>
        <div class="row" v-else>
          <span @click="uploadImg($event)">
            <img :src="voucherImgs[0]" v-if="voucherImgs[0]" alt="上传证件" />
            <em v-else>上传证件</em>
          </span>
        </div>
      </dd>
      <dd>
        <span class="input">
          <input
            type="number"
            maxlength="11"
            class="inputTxt"
            placeholder="推荐人手机号码"
            v-model="personItem.recommendTel"
          />
        </span>
      </dd>
    </dl>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { getQualification } from '@/api/commonData'
import { handleUploadImage } from '@/util/native'

@Component
export default class PersonInfo extends ViewBase {
  @Prop({ type: Object }) personItem!: any

  voucherList: any = []
  voucherImgs: any = []
  fileIds: any = []

  async created() {
    // html加载完成之前，执行
    this.getPersonVoucher()
  }

  /**
   * 获取个人证件类型列表
   */
  async getPersonVoucher() {
    try {
      const { data } = await getQualification('PERSON_QUALIFICATION_TYPE')
      this.voucherList.push({
        key: 'NULL',
        text: '选择证件'
      })
      for (const item of data) {
        if (item.controlStatus === 1) {
          this.voucherList.push(item)
        }
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * 监听证件切换
   */
  changeVoucher() {
    this.voucherImgs = []
  }
  /**
   * 调取原生上传图片
   */
  async uploadImg(e: any) {
    const obj = {
      params: {
        sourceType: 3, // 1从相册选取 2拍照上传 3都有
        imageCount: 1 // 图片数量
      },
      callBackName: 'uploadImageCallBack' // 客户端回调JS方法
    }
    const result: any = await handleUploadImage(obj)
    const resultJSON = JSON.parse(result)
    // 防止操作中途停止时报错
    if (!resultJSON.code) {
      // 判断一下身份证，身份证需两张图片
      switch (this.personItem.voucherId) {
        case 'ID_CARD':
          // 暂存 给最外层 span 加的点击事件，但点击里面的图片或文字的时候，会发现获不到 span 的 dataset 待解决
          const upType = e.target.dataset.type || e.target.parentNode.dataset.type
          if (upType === 'front') {
            this.voucherImgs.splice(0, 1, resultJSON.data.imageList[0].url)
            this.fileIds.splice(0, 1, resultJSON.data.imageList[0].fileId)
          } else {
            this.voucherImgs.splice(1, 1, resultJSON.data.imageList[0].url)
            this.fileIds.splice(1, 1, resultJSON.data.imageList[0].fileId)
          }
          this.$emit(
            'credentialFileId',
            this.fileIds.length === 2 ? this.fileIds.join(',') : ''
          )
          break
        default:
          this.voucherImgs.splice(0, 1, resultJSON.data.imageList[0].url)
          this.$emit('credentialFileId', resultJSON.data.imageList[0].fileId)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/infoList.less';
</style>
