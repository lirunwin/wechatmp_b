<template>
  <v-dialog v-model="dialog"
            max-width="500">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>
        {{ msg}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary darken-1"
               flat="flat"
               @click="cancel">
          取消
        </v-btn>

        <v-btn color="error darken-1"
               flat="flat"
               :loading="loading"
               @click="confirm">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    msg: {
      type: String,
      default: '你确认要执行这项操作吗'
    }
  },
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    active() {
      this.dialog = true
    },
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.dialog = false
      this.$emit('cancel')
    }
  }
}
</script>
