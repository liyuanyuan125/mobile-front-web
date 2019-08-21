<template>
  <div class="companyBox">
    <dl>
      <dd>
        <input type="text" class="input" placeholder="企业名称" />
      </dd>
      <dd>
        <input type="text" class="input" placeholder="联系人姓名" />
      </dd>
      <dd>
        <input type="number" class="input" maxlength="11" placeholder="手机号码" />
      </dd>
      <dd>
        <select class="select">
          <option>企业所在省份</option>
        </select>
        <select class="select">
          <option>城市</option>
        </select>
      </dd>
      <dd>
        <select class="select">
          <option>企业所属行业</option>
        </select>
      </dd>
      <dd>
        <input type="file" placeholder="上传营业执照" />
      </dd>
      <dd>
        <input type="number" maxlength="11" class="input" placeholder="推荐人手机号码" />
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
// @import '~@/views/theater/components/less/common.less';
.companyBox {
  dd {
    margin-top: 20px;
  }
  .input,
  .select {
    background-color: rgba(241, 245, 251, 0.3);
    border: 1px solid rgba(175, 190, 212, 0.3);
    width: 100%;
    font-size: 30px;
    line-height: 30px;
    padding: 27px 20px;
    color: #404d66;
    box-sizing: border-box;
    &::-webkit-input-placeholder {
      color: #afbed4;
    }
  }
  .select {
    z-index: 1;
  }
}
</style>
