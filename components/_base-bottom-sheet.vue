<template>
  <v-bottom-sheet v-model="sheet"
                  lazy
                  v-if="items">
    <div slot="activator">
      <span class="body-1 base-bottom-sheet-activator"
            :class="picked ? 'text--primary':'grey--text'">{{ currentLabel | valueToLabel(items) }}</span>
    </div>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-tile :key="index"
                     @click="onChange(item)">
          <v-list-tile-title class="text-xs-center body-1"
                             :class="{ 'primary--text': item.value === value }">{{ item.label }}</v-list-tile-title>
        </v-list-tile>
        <v-divider v-if="index !== items.length - 1"
                   :key="item.value"
                   class="mx-3" />
      </template>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    value: [String, Object, Number],
    items: Array,
    placeholder: {
      type: [String, Number],
      default: '请选择'
    }
  },
  computed: {
    currentLabel() {
      return this.picked || this.value || this.placeholder
    }
  },
  data: () => ({
    picked: null,
    sheet: false
  }),
  methods: {
    onChange(val) {
      this.picked = val.label
      this.sheet = false
      this.$emit('input', val.value)
    },
    active() {
      this.sheet = true
    }
  }
}
</script>

<style lang="scss">
.v-dialog.v-bottom-sheet.v-dialog--active {
  overflow: auto;
}
.base-bottom-sheet-activator {
  padding: 0 12px;
}
</style>
