<template>
  <router-layout>
    <div class="check-code-wrapper">
      <img class="logo-box" src="../../assets/images/logo.png" alt="" />
      <div class="check-title">手机号登录</div>
      <van-form ref="ruleForm" class="form-box" :submit-on-enter="false" @submit.native.prevent="onSubmit">
        <van-field
                :rules="[{ required: true, validator: $validatorIphone, message: '请填写正确的手机号码' }]"
                label="手机号码"
                name="phoneNo"
                clearable
                type="tel"
                autocomplete="off"
                v-model.trim="form.phoneNo"
                placeholder="请填写本人手机号码"
        />
        <van-field
                :rules="[{ required: true, validator: $validatorSmsCode, message: '请填写六位验证码' }]"
                v-model.trim="form.smsCode"
                type="digit"
                center
                clearable
                label="短信验证码"
                name="smsCode"
                autocomplete="off"
                maxlength="6"
        >
          <template #button>
            <van-button class="code-btn" native-type="button" size="small" type="primary" :disabled="disabled"
                        @click.stop.prevent="getCode">{{checkCodeText}}
            </van-button>
          </template>
        </van-field>
        <van-button class="now-btn" native-type="submit" type="info">登录</van-button>
      </van-form>
    </div>
  </router-layout>
</template>

<script>
  import {countTime} from "../../utils";
  import {S_OK} from "../../utils/constant";
  import { Toast } from 'vant'
  import {loginByPhone, userSendSmsCode} from "../../api";
  export default {
    name: "CheckCode",
    data() {
      return {
        form: {
          phoneNo: '',
          smsCode: '',
          token: ''
        },
        checkCodeText: '获取验证码',
        disabled: false,
        timer: null,
        countDownTime: ''
      }
    },
    methods: {
      async onSubmit() {
        this.$refs.ruleForm.validate().then(async res => {
          if (res && res.length > 0) {
            return
          } else {
            let params = {
              phoneNo: this.form.phoneNo,
              smsCode: this.form.smsCode,
              returnUrl: '/userCenter?from=checkCode'
            }
            let result = await loginByPhone(params)
            if(result.code === S_OK) {
              this.$router.push(result.result)
            }
          }
        }, error => {
          if (error && error.length > 0) {
            return
          }
        })
      },
      async getCode() {
        this.smsCodeFunc()
      },
      smsCodeFunc() {
        const params = {
          phoneNo: this.form.phoneNo,
          bizType: 'login'
        }
        this.$refs.ruleForm.validate('phoneNo').then(async res => {
          this.disabled = true
          const result = await userSendSmsCode(params)
          if (result.code === S_OK) {
            Toast({
              message: '验证码发送成功',
              duration: 2000
            })
            clearInterval(this.timer)
            this.countDownTime = 60
            this.timer = setInterval(() => {
              this.countDownTime = this.countDownTime - 1
              this.checkCodeText = countTime(this.countDownTime).seconds + 's'
              if (this.countDownTime <= 0) {
                clearInterval(this.timer)
                this.checkCodeText = '获取验证码'
                this.disabled = false
              }
            }, 1000)
            // this.form.token = result.data
          } else {
            this.disabled = false
            Toast({
              message: result.message,
              duration: 1000
            })
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .check-code-wrapper {
    .check-title {
      text-align: left;
      font-size: 50px;
      height: 100px;
      line-height: 100px;
      margin: 200px 0 100px 50px;
    }
    .logo-box {
      display: block;
      width: 300px;
      margin: 100px auto 30px;
    }
  }
</style>
