<template>
  <div class="company-wrapper">
    <div class="content">
      <div class="title-text">
        青岛
        <span class="title-name">"琴岛e保"</span>
        支持企事业单位、机关团队、社会团体以团体形式统一参保，如有意团体参保的，可在下方填写信息，将有工作人员提供专业服务。
      </div>
      <div>
        <van-form ref="companyForm" class="form-box" :submit-on-enter="false" @submit.native.prevent="onSubmit">
          <van-field
                  :rules="[{ required: true }]"
                  label="企业名称(全称)"
                  name="companyName"
                  clearable
                  v-model="form.companyName"
                  autocomplete="off"
                  placeholder="请填写企业名称(全称)"
          />
          <van-field
                  :rules="[{ required: true }]"
                  label="联系人姓名"
                  name="name"
                  clearable
                  v-model="form.name"
                  autocomplete="off"
                  placeholder="请填写联系人姓名"
          />
          <van-field
                  :rules="[{ required: true }]"
                  label="电话"
                  name="phoneNo"
                  type="tel"
                  clearable
                  v-model="form.phoneNo"
                  autocomplete="off"
                  placeholder="请填写电话"
          />
          <van-field
                  :rules="[{ required: true, validator: validatorEmail, message: '请输入正确的电子邮件' }]"
                  label="电子邮件"
                  name="email"
                  type="email"
                  clearable
                  v-model="form.email"
                  autocomplete="off"
          />
          <van-button class="now-btn" native-type="submit" type="info">提交</van-button>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { companyAdd } from '../../api'
import { S_OK } from '../../utils/constant'
import { Toast } from 'vant'
export default {
  name: 'Company',
  data() {
    return {
      form: {
        companyName: '',
        name: '',
        phoneNo: '',
        email: ''
      }
    }
  },
  methods: {
    validatorEmail(val) {
      return /^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val)
    },
    async onSubmit() {
      this.$refs.companyForm.validate().then(async res => {
        const result = await companyAdd(this.form)
        if (result.code === S_OK) {
          Toast.success({
            message: '录入成功',
            forbidClick: true
          })
          this.form = {}
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .company-wrapper {
    min-height: 100vh;
    background: $bg-color url("../../assets/images/company-bg.png") no-repeat;
    background-size: contain;
    .content {
      position: absolute;
      top: 260px;
      left: 5%;
      width: 90%;
      border-radius: 20px;
      margin: 0 auto;
      background: white;
      padding: 30px 20px;
      .title-text {
        color: #666;
        font-size: 30px;
        padding-bottom: 30px;
        border-bottom: 1px dotted #eee;
        text-align: justify;
        line-height: 50px;
        .title-name {
          font-size: 40px;
        }
      }
      .form-box {
        .van-field {
          font-size: 26px;
          margin: 30px auto;
        }
      }
    }
  }
</style>
