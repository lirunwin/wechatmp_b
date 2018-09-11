<template>
  <v-textarea outline
              solo
              flat
              @input="$emit('input', inputValue)"
              v-on="$listeners"
              v-bind="$attrs"
              :value="value"
              class="base-textarea body-1"></v-textarea>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['value'],
  data: () => ({
    inputValue: null
  })
}
</script>

<style lang="scss">
.base-textarea {
  &:not(.v-input--is-focused) {
    &.v-text-field--outline .v-input__slot {
      border-color: $border-color;
    }
  }
  &.v-text-field--outline .v-input__slot {
    border-width: 1px;
  }
  &.v-text-field--outline:not(.v-input--is-focused) .v-input__slot:hover {
    border-color: $border-color;
    border-width: 1px;
  }
}
</style>
