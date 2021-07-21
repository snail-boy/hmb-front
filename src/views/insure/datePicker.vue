<template>
  <div class="date-picker-wrapper">
    <van-popup v-model="insureBirthdayShow" round position="bottom" :close-on-click-overlay="false">
      <van-datetime-picker
              v-model="currentData"
              type="date"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
              :formatter="formatter"
              @confirm="onBirthdayConfirm"
              @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { parseTime } from '../../utils'

export default {
  name: 'DatePicker',
  props: {
    insureBirthdayShow: {
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
      this.activeDatePicker = val
    },
    activeDatePicker(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      activeDatePicker: {},
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentData: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 20)
    }
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
      this.activeDatePicker.birthday = parseTime(value, '{y}-{m}-{d}')
      this.$emit('close')
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
  .date-picker-wrapper {

  }
</style>
