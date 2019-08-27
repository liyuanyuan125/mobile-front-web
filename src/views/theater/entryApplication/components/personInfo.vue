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
        <select class="select" v-model="personItem.voucherId">
          <option>选择证件</option>
        </select>
      </dd>
      <dd class="uploadFile">
        <!-- <div class="row">
          <span>上传证件</span>
        </div>-->
        <div class="rowTwo">
          <span>身份证正面照</span>
          <span>身份证背面照</span>
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

@Component
export default class PersonInfo extends Vue {
  @Prop({ type: Object }) personItem!: object
}
</script>

<style lang="less" scoped>
@import '~@/views/theater/entryApplication/less/infoList.less';
</style>
