<template>
  <v-dialog ref="dialog"
            v-model="modal"
            persistent
            lazy
            full-width
            width="290px"
            class="data-picker-dialog">
    <!-- <v-text-field slot="activator"
                  v-model="date"
                  label="Picker in dialog"
                  prepend-icon="event"
                  readonly></v-text-field> -->

    <div slot="activator">
      <slot>
        <base-input v-model="date"
                    readonly
                    class="px-0"
                    :class="{'input-rtl': ltr === false}"
                    :placeholder="$attrs.placeholder"
                    :bordered="$attrs.bordered"
                    ref="activator"></base-input>
      </slot>
    </div>
    <v-date-picker v-model="pickedDate"
                   v-bind="$attrs"
                   locale="zh-cn"
                   :min="min"
                   :max="max"
                   :day-format="date => date.split('-')[2]"
                   scrollable
                   color="primary"
                   class="data-picker">
      <v-spacer></v-spacer>
      <v-btn flat
             color="primary"
             @click="modal = false">取消</v-btn>
      <v-btn flat
             color="primary"
             @click="onClick">确定</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import constant from '@const/public'
export default {
  inheritAttrs: false,
  props: {
    min: {
      type: String,
      defalut: constant.DATE_PICKER_MIN_DATE
    },
    max: String,
    ltr: {
      type: [String, Boolean],
      defalut: false
    },
    value: String
  },
  data: () => ({
    date: null,
    pickedDate: null,
    modal: false
  }),
  watch: {
    value: {
      handler(newValue) {
        if (newValue) {
          this.date = newValue
        }
      },
      immediate: true
    }
  },
  methods: {
    active() {
      this.$refs.activator.click()
    },
    onClick() {
      this.$refs.dialog.save(this.pickedDate)
      this.date = this.pickedDate
      this.$emit('input', this.pickedDate)
    }
  }
}
</script>

<style lang="scss">
.data-picker {
  .v-date-picker-years {
    -webkit-overflow-scrolling: touch;
    user-select: none;
    li:hover {
      background: unset;
    }
  }
  .v-btn:hover:before {
    background: unset;
  }
}
</style>
