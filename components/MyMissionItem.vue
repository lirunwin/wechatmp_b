<template>
  <div v-if="items">
    <div v-for="(item, index) of items"
         :key="index"
         class="border-bottom px-3 py-2"
         @click="navigareTo(item)">
      <v-layout align-center
                class="text-trucate">
        <span class="subheading text-truncate">{{item.title}}</span>
        <slot :item="item">
          <v-spacer></v-spacer>
          <!-- <base-tag outline
                    color="accent"
                    height="20px"
                    class="my-0">{{item.deliveryType | valueToLabel(applyTypes,'label2')}}</base-tag> -->
        </slot>
      </v-layout>
      <v-layout class="caption mt-2"
                align-center>
        <div>
          <div>{{item.county}} {{item.jobPeriod }}</div>
          <div> {{item.jobBeginTime | formatDateTime('yyyy.MM.dd')}} - {{item.jobEndTime | formatDateTime('yyyy.MM.dd')}}</div>
        </div>
        <v-spacer></v-spacer>
        <span>{{item.createTime }}</span>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { applyStatuses, applyTypes } from '@const'
export default {
  props: {
    items: Array,
    goDetail: Boolean
  },
  data: () => ({
    applyStatuses,
    applyTypes
  }),
  methods: {
    navigareTo(item) {
      if (this.goDetail) {
        this.$router.push(`/job/${item.recruitmentId}`)
      } else {
        this.$router.push(`/job/mission/${item.deliveryId}`)
      }
    }
  }
}
</script>
