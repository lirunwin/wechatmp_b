<template>
  <v-card v-if="item"
          class="mx-3 white"
          color="white">
    <v-layout row
              wrap
              class="pa-3 my-2">
      <svg-message-dot class="svg-sm" />
      <span class="subheading">{{item.title}}</span>
      <v-flex xs12
              class="py-1">{{item.createtime}}</v-flex>
      <v-flex xs12
              text-muted
              rich-text
              v-html="item.content">
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss">
.message-item.active {
  svg circle {
    fill: #8bc271;
  }
}
</style>
