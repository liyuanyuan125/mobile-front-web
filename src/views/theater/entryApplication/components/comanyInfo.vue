<template>
  <div class="companyBox">
    <dl>
      <dd>
        <input type="text" class="input" placeholder="企业名称" v-model="companyItem.companyName" />
      </dd>
      <dd>
        <input type="text" class="input" placeholder="联系人姓名" v-model="companyItem.contact" />
      </dd>
      <dd>
        <input
          type="number"
          class="input"
          maxlength="11"
          placeholder="手机号码"
          v-model="companyItem.contactTel"
        />
      </dd>
      <dd class="areaBox">
        <span>
          <select class="select" v-model="companyItem.provinceId">
            <option>企业所在省份</option>
          </select>
        </span>
        <span>
          <select class="select" v-model="companyItem.cityId">
            <option>城市</option>
          </select>
        </span>
      </dd>
      <dd>
        <select class="select" v-model="companyItem.qualificationId">
          <option>企业所属行业</option>
        </select>
      </dd>
      <dd class="uploadFile">
        <div class="row">
          <span>上传营业执照</span>
        </div>
      </dd>
      <dd>
        <input
          type="number"
          maxlength="11"
          class="input"
          placeholder="推荐人手机号码"
          v-model="companyItem.recommendTel"
        />
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class CompanyInfo extends Vue {
  @Prop({ type: Object }) companyItem!: object
}
</script>

<style lang="less" scoped>
@import '~@/views/theater/entryApplication/less/infoList.less';
</style>
