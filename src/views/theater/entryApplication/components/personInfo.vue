<template>
  <div class="companyBox">
    <dl>
      <dd>
        <input type="text" class="input" placeholder="联系人姓名" v-model="personItem.contact" />
      </dd>
      <dd>
        <input
          type="number"
          class="input"
          maxlength="11"
          placeholder="手机号码"
          v-model="personItem.contactTel"
        />
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
        <input
          type="number"
          maxlength="11"
          class="input"
          placeholder="推荐人手机号码"
          v-model="personItem.recommendTel"
        />
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
