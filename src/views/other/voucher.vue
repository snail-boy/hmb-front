<template>
  <div>
    <van-notice-bar
            left-icon="volume-o"
            text="琴岛e保生效后请3-5天后再查询个人电子凭证并下载。"
    />
    <div class="voucher-wrapper">
      <div class="content">
        <van-form ref="voucherForm" class="form-box" :submit-on-enter="false" @submit.native.prevent="onSubmit">
          <div class="form-content">
            <van-field
                    :rules="[{ required: true }]"
                    label="姓名"
                    name="name"
                    clearable
                    v-model.trim="form.name"
                    autocomplete="off"
                    placeholder="请填写被保人姓名"
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
                    v-if="form.certType==='1'"
                    :rules="[{ required: true, validator: validatorIDFun, message: '请输入正确的身份证号码' }]"
                    label="证件号码"
                    name="certNo"
                    clearable
                    autocomplete="off"
                    v-model.trim="form.certNo"
                    placeholder="请填写被保人证件号码"
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
          </div>
          <van-button class="voucher-now-btn" native-type="submit" type="info">查询</van-button>
        </van-form>
      </div>
      <div class="content content-result" v-if="resultList.approveDate">
        <van-cell title="姓名" :border="false" :value="resultList.name"/>
        <van-cell title="参保状态" class="flex-sb">
          <template #right-icon>
            <van-tag :type="statusClass[4]">{{'4' | orderStatusFilter}}
            </van-tag>
          </template>
        </van-cell>
        <van-cell title="电子凭证号码" :border="false" :value="resultList.certificate"/>
        <van-cell title="保障期限" :border="false" :value="resultList.effectiveDate"/>
        <van-button class="voucher-now-btn voucher-btn" type="info" @click="voucherDownload">点击下载电子凭证</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getInsured} from '../../api'
  import { idOpt, S_OK, statusClass} from '../../utils/constant'
  import {otherCertiCode, unStrictvalidatorID} from '../../utils'
  import { Toast } from "vant";

  export default {
    name: 'Voucher',
    data() {
      return {
        form: {
          name: '',
          certType: '1',
          certNo: ''
        },
        idTypeShow: false,
        certTypeHan: '居民身份证',
        idOpt: idOpt,
        resultList: {},
        statusClass: statusClass
      }
    },
    async mounted() {
      idOpt.filter(value => value.value === '1' ? this.certTypeHan = value.text : '')
    },
    methods: {
      voucherDownload() {
        this.$router.push({ name: 'VoucherDownload', query: this.resultList })
      },
      validatorIDFun(val) {
        return unStrictvalidatorID(val)
      },
      otherCertiCodeFun(val) {
        return otherCertiCode(val)
      },
      onConfirm(value) {
        this.form.certType = value.value
        this.certTypeHan = value.text
        this.form.certNo = ''
        this.$refs.voucherForm.resetValidation('certNo')
        this.idTypeShow = false
      },
      async onSubmit() {
        this.$refs.voucherForm.validate().then(async res => {
          if (res && res.length > 0) {
            return
          } else {
            const result = await getInsured(this.form)
            if (result.code === S_OK) {
              this.resultList = result.data
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
  @import "../../styles/variables";
  .voucher-wrapper {
    position: absolute;
    background: #E9F6FF url("../../assets/images/voucher.png") no-repeat;
    background-size: contain;
    width: 100%;
    padding-top: 400px;
    padding-bottom: 40px;
    min-height: calc(100% - 80px);
    .content {
      width: 94%;
      border-radius: 20px;
      margin:0 auto;
      background: white;
      overflow: auto;
      box-shadow: 20px 20px 10px rgba(18, 155, 217, 0.1);
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
    .voucher-now-btn {
      display: block;
      width: 600px;
      height: 80px;
      font-size: 28px;
      line-height: 70px;
      background-color: $base-color;
      border: none;
      text-align: center;
      margin: 50px auto 20px;
      color: white;
    }
    .van-cell__title {
      flex: .4;
    }
  }
</style>
