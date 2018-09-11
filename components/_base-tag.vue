<template>
  <!-- <div class="base-tag"
       :class="`${color}--text`">
    <slot>已认证</slot>
  </div> -->
  <v-btn :outline="outline"
         small
         :color="active ? activeColor : color"
         tag="div"
         depressed
         :ripple="false"
         class="base-tag"
         v-bind="$attrs"
         v-on="$listeners"
         @click="onClick"
         :style="height ? style : ''">
    <slot>{{label}}</slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'grey'
    },
    activeColor: {
      type: String,
      default: 'primary'
    },
    outline: {
      type: [String, Boolean],
      default: true
    },
    height: {
      type: String,
      default: ''
    },
    value: {
      type: [Array, String],
      default: () => []
    },
    val: [String, Number, Object],
    label: [String, Number],
    clickable: {
      type: [String, Boolean],
      default: null
    },
    returnObject: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkedProxy: false,
      active: false
    }
  },
  mounted() {
    // set the checked proxy if we start with this value included.
    if (this.value.includes(this.val)) {
      this.checkedProxy = true
    }
  },
  methods: {
    onClick() {
      if (this.clickable !== null && this.clickable !== false) {
        this.checkedProxy = !this.checkedProxy
        let value = [].concat(this.value)

        if (!this.checkedProxy && value.includes(this.val)) {
          value.splice(value.indexOf(this.val), 1)
          this.active = false
        } else {
          value.push(this.val)
          this.active = true
        }
        this.$emit('input', value)
      }
    }
  },
  watch: {
    value(newValue) {
      if (newValue.length === 0) {
        this.active = false
      }
    }
  },
  computed: {
    style() {
      return {
        height: this.height
      }
    }
  }
}
</script>

<style lang="scss">
.base-tag {
    border-radius: 2px;
    color: $primary;
    font-size: $size1;
    height: $size2 + 2px;
    line-height: $size2 + 2px;
    min-width: $size1 * 3;
    margin-left: 0;
    margin-right: 0;
    + .base-tag {
        margin-left: $tag-space;
    }
}
</style>
