<template>
  <div class="job-items"
       v-if="items && items.length">
    <div class="job-item"
         v-for="item of items"
         :key="item.taskId">
      <v-card :class="{'ma-3 job-item-card': card}"
              v-bind="{flat: !card}">
        <v-layout align-center
                  class="pt-3">
          <span class="flex-auto"
                v-if="card">
            <slot name="action"
                  :item="item">
              <!--
              <v-checkbox color="primary"
                          class="caption my-0 ml-2"
                          hide-details
                          v-model="checkJobs"
                          :value="item.recruitmentId"
                          :label="item.name"></v-checkbox>
            -->
            </slot>
          </span>
          <v-flex class="px-3 white text-truncate">
            <div @click="$router.push({name: 'job-id', params: { id: item.recruitmentId, team }})"
                 v-ripple>
              <v-layout align-center
                        class="text-truncate">
                <v-flex class="subheading text-truncate pr-3">{{item.title}}</v-flex>
                <div class="error--text body-2 flex-auto">{{item.wageBegin}}-{{item.wageEnd}}元/天</div>
              </v-layout>
              <v-layout align-center>
                <v-flex>
                  <div class="pt-2 caption text-muted">
                    <v-icon class="iconfont icon-location icon--text mr-0"></v-icon>
                    <span v-if="item.anyAddress">不限地点</span>
                    <span v-else>{{item.county}}</span>
                    <template v-if="item.distance">/{{ item.distance | formatDistance}}</template>
                    <span class="pl-2">{{item.jobBeginTime | formatDateTime('MM.dd')}} - {{item.jobEndTime | formatDateTime('MM.dd')}}</span>

                  </div>
                  <v-layout class="caption text-muted mt-1"
                            align-center
                            v-if="item.jobPeriod">
                    <v-icon class="iconfont icon-time icon--text mr-1"></v-icon>
                    <span>{{item.jobPeriod}}</span>

                  </v-layout>
                  <div>
                    <base-tag color="grey">{{item.wageClearing}}</base-tag>
                    <base-tag color="primary">
                      <v-icon class="icon--text mr-0">iconfont icon-safety</v-icon>{{item.wageGeneration === '平台代发' ? '工资保障' : item.wageGeneration}}</base-tag>
                  </div>
                </v-flex>
                <div v-if="isApplied(item.deliveryStatus)"
                     class="primary--text flex-auto">已报名</div>
                <div class="primary--text flex-auto caption"
                     v-else-if="item.personalRewardPoints">
                  +{{item.personalRewardPoints}}积分
                </div>
              </v-layout>
            </div>
            <div :class="{'line-height-0': card}">
              <slot :item="item">
                <v-divider class="mt-2 job-item-divider"
                           v-if="!card"></v-divider>
              </slot>
            </div>
          </v-flex>

        </v-layout>

      </v-card>
    </div>
  </div>
</template>

<script>
import { applyStatuses } from '@const'
import { valueToLabel } from '@helper'
export default {
  props: {
    card: Boolean,
    items: {
      type: [Array, Object]
    },
    team: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    applyStatuses,
    checkJobs: []
  }),
  methods: {
    valueToLabel,
    isApplied(status) {
      let name = valueToLabel(status, applyStatuses, 'name')
      return ['confirm', 'pass', 'done'].includes(name)
    }
  }
  // watch: {
  //   checkJobs(newValue) {
  //     if (newValue) {
  //       this.$emit('input', newValue)
  //     }
  //   }
  // }
}
</script>

<style lang="scss">
.job-items {
  .job-item:last-child {
    .job-item-divider {
      border-color: transparent;
    }
  }
  .job-item-card1 {
    position: relative;
    .job-item-checkbox {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
