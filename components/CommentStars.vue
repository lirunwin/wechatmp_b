<template>
  <div class="d-flex">
    <v-icon class="iconfont icon-star icon--text"
            v-for="n of 5"
            :key="n"
            :class="{ 'accent--text': n <= (value || stars || 0) }"
            @click="setValue(n)" />
  </div>
</template>

<script>
export default {
  props: {
    stars: {
      type: [Number, String],
      default: 0
    },
    value: {
      type: [String, Number],
      default: 0
    },
    clickable: {
      type: [String, Boolean],
      default: null
    }
  },
  methods: {
    setValue(val) {
      if (this.clickable !== null && this.clickable !== false) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
