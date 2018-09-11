import Vue from 'vue'
Vue.mixin({
  methods: {
    showMsg(msg, color = 'error') {
      return this.$store.dispatch('sys/showSnackbar', { msg, color })
    }
  }
})
