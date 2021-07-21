<template>
  <router-layout>
<!--    <div class="account-wrapper" v-if="account.name">-->
    <div class="account-wrapper">
      <van-cell title="姓名" :value="account.name"/>
      <van-cell title="性别" :value="account.gender" />
      <van-cell title="国家/地区" :value="account.country + account.province  + account.city" />
      <van-cell-group>
        <van-cell title="证件类型" :value="account.certType" />
        <van-cell title="证件号码" :value="account.certNo" />
        <van-cell title="手机号码" :value="account.phoneNo" />
        <van-cell title="生日" :value="account.birthday" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="学历" :value="form.education" is-link @click="handleEdu" />
        <van-cell title="婚姻状况" :value="form.marriage" is-link @click="handleMarr" />
        <van-field
                class="address-box"
                v-model="form.address"
                autosize
                label="家庭住址"
                type="textarea"
                maxlength="30"
                placeholder="请输入家庭住址"
                show-word-limit
                input-align="right"
        />
      </van-cell-group>
      <van-popup v-model="eduShow" round position="bottom">
        <van-picker title="学历" :columns="eduOpt" @cancel="eduShow = false" @confirm="onEduConfirm"
                    show-toolbar/>
      </van-popup>
      <van-popup v-model="marriageShow" round position="bottom">
        <van-picker title="婚姻状况" :columns="marriageOpt" @cancel="marriageShow = false" @confirm="onMarriageConfirm"
                    show-toolbar/>
      </van-popup>

      <van-button class="voucher-now-btn" @click="handleSave">保存</van-button>
    </div>
  </router-layout>
</template>

<script>
  import {userAccount, updateInfo } from "../../api";
  import {eduOpt, marriageOpt, S_No_Auth, S_No_Login, S_OK} from "../../utils/constant";

  export default {
    name: "index",
    data() {
      return {
        account: {
          name: '',
          gender: '',
          certType: '',
          certNo: '',
        },

        form: {
          education: null,
          marriage: null,
          address: null
        },
        education: null,
        marriage: null,
        eduShow: false,
        marriageShow: false,
        eduOpt: eduOpt,
        marriageOpt: marriageOpt
      }
    },
    created() {
      this.getAccount()
    },
    methods: {
      async getAccount() {
        let result = await userAccount()
        if(result.code === S_OK) {
          this.account = result.result
          this.form.education = result.result.education
          this.form.marriage = result.result.marriage
          this.form.address = result.result.address
        }
      },
      handleEdu() {
        this.eduShow = true
      },
      handleMarr() {
        this.marriageShow = true
      },
      onEduConfirm(v) {
        this.form.education = v.text
        this.education = v.value
        this.eduShow = false
      },
      onMarriageConfirm(v) {
        this.form.marriage = v.text
        this.marriage = v.value
        this.marriageShow = false
      },
      async handleSave() {
        let params = {
          education: this.education,
          marriage: this.marriage,
          address: this.form.address
        }
        let result = await updateInfo(params)
        if (result.code === S_OK) {
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .account-wrapper {
    min-height: 100vh;
    background: #f7f7f7;
    .van-cell-group {
      margin: 10px auto 0;
    }
    .address-box {
      .van-field__control {
        overflow-x: auto;
      }
    }
    .voucher-now-btn {
      margin-top: 100px;
    }
  }
</style>
