<template>
  <v-dialog v-model="dialog"
            scrollable
            fullscreen
            persistent
            :overlay="false"
            max-width="500px"
            class="white"
            transition="dialog-transition">
    <div class="team-invitation h-100 white w-100">
      <v-toolbar flat
                 dense
                 clipped-left
                 color="white"
                 class="border-bottom">
        <v-btn icon
               @click="dialog = false">
          <v-icon class="iconfont icon-x"></v-icon>
        </v-btn>
        <div>邀请加入战队</div>
      </v-toolbar>
      <v-list class="py-0"
              dense
              two-line>
        <template v-for="(item, index) in inviteList">
          <v-list-tile :key="item.id">
            <v-list-tile-content class="pl-2">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-text="item.date"></v-list-tile-sub-title>

            </v-list-tile-content>
            <div>
              <v-checkbox :value="item.id"
                          v-model="checked"
                          color="primary"
                          class="flex-0"></v-checkbox>
            </div>
          </v-list-tile>
          <div class="px-3"
               v-if="index !== items.length - 1"
               :key="index">
            <v-divider/>
          </div>
        </template>
      </v-list>
      <bottom-btns :disabled="!checked"
                   border
                   rounded
                   class="px-4 py-3 border-bottom"></bottom-btns>
    </div>
  </v-dialog>

</template>

<script>
import BottomBtns from '@/components/BottomBtns'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    BottomBtns
  },
  head: () => ({
    title: '战队邀请'
  }),
  meta: {
    title: '战队邀请'
  },
  data: () => ({
    checked: false,
    dialog: false
  }),
  computed: {
    ...mapGetters({
      inviteList: 'team/inviteList'
    })
  },
  methods: {
    ...mapActions({
      fetchInviteList: 'team/fetchInviteList'
    }),
    active() {
      this.dialog = true
    }
  },
  mounted() {
    this.fetchInviteList({ keyword: '王' })
  }
}
</script>
