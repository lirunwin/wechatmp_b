<template>
  <v-list v-if="items">
    <v-list-tile v-for="item in items"
                 avatar
                 :key="item.rank">
      <v-list-tile-avatar tile>
        <template v-if="+item.rank === 1"><img src="@img/1st.png"></template>
        <template v-else-if="+item.rank === 2"><img src="@img/2nd.png"></template>
        <template v-else-if="+item.rank === 3"><img src="@img/3rd.png"></template>
        <template v-else>{{item.rank}}</template>
      </v-list-tile-avatar>
      <v-list-tile-avatar>
        <base-avatar :src="item.avatar" />
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <div>{{item.number}}{{unit}}</div>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: ['items', 'unit']
}
</script>
