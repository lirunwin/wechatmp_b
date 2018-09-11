<template>
  <v-list class="py-0 team-member"
          v-if="items"
          dense
          avatar
          three-line>
    <template v-for="(item, index) in items">
      <v-list-tile :key="item.userId">
        <div class="avatar mx-3 flex-auto">
          <base-avatar :src="item.avatar"></base-avatar>
        </div>
        <v-list-tile-content class="pl-2">
          <v-list-tile-title>
            <v-layout align-center>
              <span>{{item.username}}</span>
              <base-tag color="accent"
                        v-if="item.position"
                        class="mx-3">{{item.position | valueToLabel(teamRoles)}}</base-tag>
            </v-layout>
          </v-list-tile-title>
          <v-list-tile-sub-title class="caption">
            <span>
              <v-icon class="icon--text mr-0">icon-phone iconfont</v-icon>{{item.tel}} |</span>
            <span>等级:{{item.level}} |</span>
            <span>信誉:{{item.reputation}}</span>

          </v-list-tile-sub-title>
          <v-list-tile-sub-title class="caption">
            <span>入队时间:{{item.createtime}}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="!noSelect">
          <span>
            <v-checkbox :value="item.userId"
                        v-model="checked"
                        color="primary"
                        class="flex-0"></v-checkbox>
          </span>
        </v-list-tile-action>
      </v-list-tile>
      <div class="px-3"
           v-if="index !== items.length - 1"
           :key="index">
        <v-divider/>
      </div>
    </template>
  </v-list>
</template>

<script>
import { teamRoles } from '@const'
export default {
  props: ['items', 'no-select'],
  data: () => ({
    checked: [],
    teamRoles
  }),
  watch: {
    checked: {
      handler(newValue) {
        this.$emit('input', this.checked)
      },
      immediate: true
    }
  }
}
</script>
