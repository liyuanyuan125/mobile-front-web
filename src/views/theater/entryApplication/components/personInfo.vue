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
            v-model="personItem.contactTel"
          />
        </span>
      </dd>
      <dd>
        <select
          class="select"
          v-model="personItem.voucherId"
          :style="{color:personItem.voucherId === 'NULL' ? '' :'#404d66'}"
        >
          <option v-for="per in voucherList" :key="per.key" :value="per.key">{{per.text}}</option>
        </select>
      </dd>
      <dd class="uploadFile">
        <div class="rowTwo" v-if="personItem.voucherId ==='ID_CARD'">
          <span>身份证正面照</span>
          <span>身份证背面照</span>
        </div>
        <div class="row" v-else>
          <span>上传证件</span>
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

@Component
export default class PersonInfo extends ViewBase {
  @Prop({ type: Object }) personItem!: object

  voucherList: any = []

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
}
</script>

<style lang="less" scoped>
@import '~@/views/theater/entryApplication/less/infoList.less';
</style>
