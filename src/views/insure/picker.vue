<template>
  <div class="picker-wrapper">
    <van-popup v-model="insuredIdShow" round position="bottom" :close-on-click-overlay="false">
      <van-picker title="证件类型" :columns="idOpt" @cancel="cancel" @confirm="onInsuredConfirm"
                  show-toolbar/>
    </van-popup>
  </div>
</template>

<script>
import { idOpt } from '../../utils/constant'

export default {
  name: 'Picker',
  props: {
    insuredIdShow: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    value(val) {
      this.activePicker = val
    },
    activePicker(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      idOpt: idOpt,
      activePicker: {}
    }
  },
  methods: {
    onInsuredConfirm(value) {
      this.activePicker.certiType = value.value
      this.activePicker.certiTypeHan = value.text
      this.activePicker.certiCode = ''
      this.activePicker.isShowGender = this.activePicker.certiType !== '1'
      if(this.activePicker.certiType === '1') {
        this.activePicker.gender = ''
        this.activePicker.birthday = ''
      }
      this.$emit('close')
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
