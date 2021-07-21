<template>
  <router-layout>
    <div class="real-wrapper">
      <div class="content">
        <van-form ref="voucherForm" class="form-box" :submit-on-enter="false">
          <div class="form-content">
            <van-field
                    label="姓名"
                    name="name"
                    clearable
                    readonly
                    :value="form.name"
            />
            <van-field
                    label="证件类型"
                    name="certType"
                    :value="form.certType"
                    readonly
            />
            <van-field
                    label="证件号码"
                    name="certNo"
                    readonly
                    :value="form.certNo"
            />
            <van-field
                    label="手机号"
                    name="phoneNo"
                    readonly
                    :value="form.phoneNo"
            />
            <van-field name="gender" label="性别" :value="form.gender" readonly />
            <van-field
                    readonly
                    label="出生日期"
                    name="birthday"
                    :value="form.birthday"
            />
          </div>
          <van-button class="voucher-now-btn" @click="handleSave">确定</van-button>
        </van-form>
      </div>
      <customer />
    </div>
  </router-layout>
</template>

<script>
  import Customer from "../../../components/customer";
  import {userAccount} from "../../../api";
  import {S_OK} from "../../../utils/constant";
  export default {
    name: 'YesReal',
    components: {Customer},
    data() {
      return {
        form: {
          name: '',
          gender: '',
          certType: '',
          certNo: '',
          phoneNo: '',
          birthday: ''
        }
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      async getInfo() {
        let result = await userAccount();
        if (result.code === S_OK) {
          this.form = result.result
        }
      },
      handleSave() {
        this.$router.push('/userCenter')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/variables";
  .real-wrapper {
    position: absolute;
    background: #E9F6FF url("../../../assets/images/auth-confirm.png") no-repeat;
    background-size: contain;
    width: 100%;
    min-height: 100vh;
    padding: 280px 20px 40px;
    .content {
      width: 100%;
      border-radius: 20px;
      margin:0 auto;
      background: white;
      overflow: auto;
      box-shadow: 20px 20px 10px rgba(18, 169, 232, 0.02);
      .form-content {
        padding: 0 30px 0;
      }
      .form-box {
        .van-field {
          font-size: 26px;
          margin: 10px auto;
          padding: 20px 0;
        }
      }
    }
    .voucher-now-btn {
      margin-bottom: 20px;
    }
  }
</style>
