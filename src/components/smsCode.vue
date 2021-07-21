<template>
  <div class="sms-code-wrapper">
    <van-dialog v-model="smsDialogShow" title="请发送短信验证码验证身份" theme="round-button" :confirm-button-color="$globalColor.baseColor" show-cancel-button :cancel-button-color="$globalColor.baseColor" close-on-click-overlay :before-close="beforeClose">
      <div  class="sms-code-box">
        <van-field
                :rules="[{ required: true, validator: validatorIphone, message: '请填写正确的手机号码' }]"
                label="手机号码"
                name="phoneNo"
                clearable
                type="tel"
                autocomplete="off"
                v-model.trim="phoneNoFilter"
                placeholder="请填写本人手机号码"
                readonly
        />
        <van-field
                :rules="[{ required: true }]"
                v-model.trim="smsCode"
                type="digit"
                center
                clearable
                label="短信验证码"
                name="smsCode"
                maxlength="6"
                :autofocus="true"
                autocomplete="off"
                placeholder="请输入"
        >
          <template #button>
            <van-button class="code-btn" native-type="button" size="small" type="primary" :disabled="disabled" :color="$globalColor.baseColor"
                        @click.stop.prevent="getCode">{{checkCodeText}}
            </van-button>
          </template>
        </van-field>
      </div>
    </van-dialog>
  </div>
</template>

<script>
  import {countTime, validatorIphone} from "../utils";
  import {Toast} from "vant";
  import {getOrderPayToken, getRefundToken} from "../api";
  import {phoneNumberFilter} from "../filters";
  import {S_OK} from "../utils/constant";

  export default {
    name: "smsCode",
    props: {
      smsCodeVisible: {
        type: Boolean,
        default: false
      },
      smsCodePhone: {
        type: String,
        default: ''
      },
      smsCodeId: {
        type: String,
        default: ''
      },
      smsCodeFrom: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        validatorIphone: validatorIphone,
        checkCodeText: '获取验证码',
        smsDialogShow: false,
        smsCode: '',
        smsToken: '',
        disabled: false,
        timer: null,
        countDownTime: ''
      }
    },
    watch: {
      smsCodeVisible(v) {
        if(v) {
          this.smsDialogShow = v
        }
      }
    },
    computed: {
      phoneNoFilter () {
        return phoneNumberFilter(this.smsCodePhone)
      }
    },
    created() {
      this.smsDialogShow = this.smsCodeVisible
    },
    methods: {
      // 短信验证码
      beforeClose(action, done) {
        let _this = this
        if (action === "confirm") {
          if(!this.smsCode) {
            Toast({
              message: '请先输入验证码',
              duration: 1000
            })
            return done(false)
          }else if(this.smsCode.length !== 6) {
            Toast({
              message: '请输入六位验证码',
              duration: 1000
            })
            return done(false)
          } else {
            // 判断从哪里过来的，调不同的短信接口
            if (this.smsCodeFrom === 'returnPay') {
              let params = {
                id: this.smsCodeId,
                smsCode: this.smsCode,
                smsToken: this.smsToken
              }
              this.$parent.$parent.refundOrderFun(params, function (res) {
                if(res) {
                  _this.refresh()
                  return done(true)
                }else {
                  return done(false)
                }
              })
              this.$emit('smsCodeCancel')
            }else {
              let params = {
                smsCode: this.smsCode,
                smsToken: this.smsToken
              }
              this.$parent.$parent.getOrderYbPay(params, function(res) {
                if(res) {
                  _this.refresh()
                  return done(true)
                }else {
                  return done(false)
                }
              })
              this.$emit('smsCodeCancel')
            }
          }
        }else if (action === "cancel") {
          _this.refresh()
          this.$emit('smsCodeCancel')
          return done(true)
        }
      },
      refresh() {
        this.smsCode = ''
        this.smsToken = ''
        this.$emit('upData:smsCodeVisible', false);
      },
      async getCode() {
        const params = {
          phoneNo: this.smsCodePhone,
          bizType: 'valid'
        }
        if(this.smsCodePhone) {
          this.disabled = true
          let result = {}
          if (this.smsCodeFrom === 'returnPay') {
            result = await getRefundToken(params)
          } else if(this.smsCodeFrom === 'payWay') {
            result = await getOrderPayToken(params)
          }
          if (result.code === S_OK) {
            Toast({
              message: '验证码发送成功',
              duration: 1000
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
            this.smsToken = result.data
          } else {
            this.disabled = false
            Toast({
              message: result.message,
              duration: 1000
            })
          }
        } else {
          Toast('没有获取到手机号')
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  .sms-code-wrapper {
    .code-btn {
      background: $base-color;
      border: none;
      width: 160px;
    }
  }
</style>
<style lang="scss">
  .sms-code-wrapper {
    .van-dialog__footer {
      justify-content: space-between;
    }
    .van-dialog__cancel, .van-dialog__confirm {
      flex: .4;
    }
    .van-goods-action-button--first, .van-goods-action-button--last {
      border-radius: 50px;
    }
  }
</style>
