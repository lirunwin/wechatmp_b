<template>
  <div class="points-item"
       v-if="items">
    <div class="pointes-item-title subheading px-3 py-2 grey lighten-2">{{ items[0] | monthToCh}}</div>
    <v-layout row
              class="px-3 py-2 border-bottom"
              v-for="item of items[1]"
              :key="item.id"
              align-center>
      <div class="caption flex-auto">{{ item.createtime }}</div>
      <v-flex class="px-3">{{item.directions}}</v-flex>
      <div class="subheading"
           :class="{
             'success--text': item.number > 0,
             'error--text' : item.number < 0
           }">{{item.number}}</div>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    }
  }
}
</script>
