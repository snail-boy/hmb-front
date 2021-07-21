<template>
  <div class="real-wrapper">
    <div class="content">
      <van-form ref="voucherForm" class="form-box" :submit-on-enter="false" @submit.native.prevent="onSubmit">
        <div class="form-content">
          <van-field
                  :rules="[{ required: true, validator: validatorIsName, message: '请输入正确的姓名'}]"
                  label="姓名"
                  name="name"
                  clearable
                  v-model.trim="form.name"
                  autocomplete="off"
          />
          <van-field
                  :rules="[{ required: true }]"
                  readonly
                  clickable
                  label="证件类型"
                  name="certType"
                  :value="certTypeHan"
                  is-link
                  autocomplete="off"
                  placeholder="选择本人证件类型"
                  @click="idTypeShow = true"
          />
          <van-popup v-model="idTypeShow" round position="bottom">
            <van-picker title="证件类型" :columns="idOpt" @cancel="idTypeShow = false" @confirm="onConfirm"
                        show-toolbar/>
          </van-popup>
          <van-field
                  v-if="form.certType === '11'"
                  :rules="[{ required: true,  validator: $taiWan, message: '请输入正确的港澳台居民居住证证件号码' }]"
                  label="证件号码"
                  name="certNo"
                  clearable
                  autocomplete="off"
                  v-model.trim="form.certNo"
          />
          <van-field
                  v-if="form.certType==='1' && form.certType!=='11'"
                  :rules="[{ required: true, validator: validatorIDFun, message: '请输入正确的身份证号码' }]"
                  label="证件号码"
                  name="certNo"
                  clearable
                  autocomplete="off"
                  v-model.trim="form.certNo"
          />
          <van-field
                  v-if="form.certType!=='1'"
                  :rules="[{ required: true, validator: otherCertiCodeFun, message: '请输入正确的证件号码' }]"
                  label="证件号码"
                  name="certNo"
                  clearable
                  autocomplete="off"
                  v-model.trim="form.certNo"
                  placeholder="请填写证件号码"
          />
          <van-field
                  v-if="isShowBirGen"
                  :rules="[{ required: true }]"
                  readonly
                  clickable
                  label="出生日期"
                  name="birthday"
                  :value="form.birthday"
                  is-link
                  autocomplete="off"
                  placeholder="选择出生日期"
                  @click="birthdayShow = true"
          />
        </div>
        <van-button class="voucher-now-btn" native-type="submit" type="info">去认证</van-button>
      </van-form>
    </div>
    <customer />
    <van-popup v-model="birthdayShow" round position="bottom" :close-on-click-overlay="false">
      <van-datetime-picker
              v-model="currentData"
              type="date"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
              :formatter="formatter"
              @confirm="onBirthdayConfirm"
              @cancel="birthdayShow = false"
      />
    </van-popup>
    <van-dialog v-model="tipShow" title="确认信息" :confirm-button-color="$globalColor.baseColor" close-on-click-overlay >
      <div class="global-van-dialog">
        实名认证后，该帐号将永久绑定您的个人信息，且不能修改！
      </div>
    </van-dialog>
  </div>
</template>

<script>
  import {userIdentify} from '../../../api'
  import { idOpt, S_OK, statusClass} from '../../../utils/constant'
  import {isName, otherCertiCode, parseTime, unStrictvalidatorID} from '../../../utils'
  import { Toast } from "vant";
  import Customer from "../../../components/customer";

  export default {
    name: 'NoReal',
    components: {Customer},
    data() {
      return {
        form: {
          name: '',
          certType: '1',
          certNo: '',
          returnUrl: 'w',
          birthday: ''
        },
        idTypeShow: false,
        certTypeHan: '居民身份证',
        idOpt: idOpt,
        resultList: {
          approveDate: "",
          certNo: "",
          certType: "1",
          certificate: "",
          effectiveDate: "",
          gender: "",
          name: "",
        },
        statusClass: statusClass,
        tipShow: true,
        isShowBirGen: false,
        minDate: new Date(1900, 0, 1),
        maxDate: new Date(),
        currentData: new Date('1990-01-01'),
        birthdayShow: false
      }
    },
    mounted() {
      idOpt.filter(value => value.value === '1' ? this.certTypeHan = value.text : '')
    },
    methods: {
      formatter(type, val) {
        if (type === 'year') {
          return val + '年'
        }
        if (type === 'month') {
          return val + '月'
        }
        if (type === 'day') {
          return val + '日'
        }
        return val
      },
      onBirthdayConfirm(value) {
        this.form.birthday = parseTime(value, '{y}-{m}-{d}')
        this.birthdayShow = false
      },
      validatorIDFun(val) {
        return unStrictvalidatorID(val)
      },
      otherCertiCodeFun(val) {
        return otherCertiCode(val)
      },
      validatorIsName(val) {
        return isName(val)
      },
      onConfirm(value) {
        this.form.certType = value.value
        this.certTypeHan = value.text
        this.form.certNo = ''
        this.form.birthday = ''
        this.isShowBirGen = value.value !== '1'
        this.$refs.voucherForm.resetValidation('certNo')
        this.idTypeShow = false
      },
      async onSubmit() {
        this.$refs.voucherForm.validate().then(async res => {
          if (res && res.length > 0) {
            return
          } else {
            const result = await userIdentify(this.form)
            if (result.code === S_OK) {
              this.$router.push(result.result)
            }else {
              Toast(result.message)
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/variables";
  .real-wrapper {
    position: absolute;
    background: #E9F6FF url("../../../assets/images/auth.png") no-repeat;
    background-size: contain;
    width: 100%;
    padding-top: 280px;
    padding-bottom: 40px;
    min-height: 100vh;
    .content {
      width: 94%;
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
      .voucher-btn {
        margin-bottom: 40px;
      }
    }
    .content-result {
      margin-top: 20px;
      .van-cell {
        font-size: 26px;
        color: #646566;
      }
      .van-cell__value {
        color: #646566;
      }
    }
    .van-cell__title {
      flex: .4;
    }
    .voucher-now-btn {
      margin-bottom: 20px;
    }
  }
</style>
