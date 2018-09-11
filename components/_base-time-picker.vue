<template>
  <v-dialog ref="dialog"
            class="time-picker"
            v-model="modal"
            :return-value.sync="time"
            persistent
            lazy
            full-width
            width="290px">
    <base-input slot="activator"
                v-model="time"
                readonly
                class="px-0"
                :placeholder="$attrs.placeholder"
                :bordered="$attrs.bordered"
                ref="activator"></base-input>
    <v-time-picker v-if="modal"
                   v-bind="$attrs"
                   v-on="$listeners"
                   v-model="time"
                   format="24hr"
                   scrollable>
      <v-spacer></v-spacer>
      <v-btn flat
             color="primary"
             @click="modal = false">取消</v-btn>
      <v-btn flat
             color="primary"
             @click="onClick">确定</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    ltr: {
      type: [String, Boolean],
      defalut: false
    },
    value: String
  },
  data: () => ({
    time: null,
    modal: false
  }),
  watch: {
    value: {
      handler(newValue) {
        if (newValue) {
          this.time = newValue
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
      this.$refs.dialog.save(this.time)
      this.$emit('input', this.time)
    }
  }
}
</script>

<style lang="scss">
.time-picker {
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
