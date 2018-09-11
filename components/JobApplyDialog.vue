<template>
  <v-dialog v-model="dialog"
            v-if="detail"
            persistent
            max-width="500px"
            class="flex-auto">
    <template slot="activator">
      <slot :item="job"></slot>
    </template>
    <v-card class="pa-2">
      <v-card-text>
        <v-layout align-center>
          <v-flex>
            <div>
              <template v-if="detail.mintaskday || detail.minTaskDay">
                <div>最短申请周期:{{detail.mintaskday || detail.minTaskDay}}天</div>
                <div>任务周期：
                  <template v-if="detail.jobbegintime">{{detail.jobbegintime | formatDateTime('yyyy.MM.dd')}} - {{detail.jobendtime | formatDateTime('yyyy.MM.dd')}}</template>
                  <template v-else-if="detail.jobBeginTime">{{detail.jobBeginTime | formatDateTime('yyyy.MM.dd')}} - {{detail.jobEndTime | formatDateTime('yyyy.MM.dd')}}</template>
                </div>
              </template>
              <template v-else>全程参加</template>
            </div>
            <div class="py-2">
              <base-date-picker v-model="job.jobBeginTime"
                                placeholder="开始日期"
                                :min="minDay"
                                :max="maxDay"
                                ltr
                                bordered></base-date-picker>
            </div>
            <div class="py-2">
              <base-date-picker v-model="job.jobEndTime"
                                placeholder="结束日期"
                                :min="minDay"
                                :max="maxDay"
                                ltr
                                bordered></base-date-picker>
            </div>
          </v-flex>
        </v-layout>
        <v-layout align-center
                  class="mt-2">
          <v-flex>
            <div>
              <template v-if="detail.minTaskHour || detail.mintaskhour">最短申请时段:{{detail.minTaskHour||detail.mintaskhour}}小时</template>
              <template v-else>全程参加</template>
            </div>
            <div>工作时段：
              <template v-if="(+detail.jobPeriodBegin === 0 && +detail.jobPeriodEnd === 0)||(+detail.jobperiodbegin === 0 && +detail.jobperiodend === 0)">不限时段</template>
              <template v-else>{{detail.jobPeriod || detail.jobperiod }}</template>
            </div>
            <div class="py-2">
              <base-time-picker v-model="job.jobPeriodBegin"
                                bordered
                                placeholder="开始时间"></base-time-picker>
            </div>
            <div class="py-2">
              <base-time-picker v-model="job.jobPeriodEnd"
                                bordered
                                placeholder="结束时间"></base-time-picker>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent"
               flat
               @click="onCancel">取消</v-btn>
        <v-btn v-if="type === 'package'"
               color="primary"
               flat
               @click="setValue"
               :disabled="disableApply">确定</v-btn>
        <v-btn v-else
               color="primary"
               flat
               @click="join"
               :loading="loading"
               :disabled="disableApply">申请</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { addDays, dateGreater } from '@helper'

export default {
  props: {
    type: String,
    teamInfo: Object,
    jobDetail: Object,
    activeDialog: Boolean,
    value: {
      type: [Array, String],
      default: () => []
    },
    checkedIds: {
      type: [Array, String],
      default: () => []
    }
  },
  data: () => ({
    dialog: false,
    detail: null,
    marked: false,
    applied: false,
    loading: false,
    checkedProxy: false,
    job: {}
  }),
  computed: {
    ...mapGetters({
      today: 'common/today'
    }),
    minDay() {
      if (!this.detail) return ''
      let begin = this.detail.jobBeginTime || this.detail.jobbegintime || ''
      if (begin) {
        begin = begin.replace(/\./g, '-')
      }
      return begin
    },
    maxDay() {
      if (!this.detail) return ''
      let end = this.detail.jobEndTime || this.detail.jobendtime || ''
      if (end) {
        end = end.replace(/\./g, '-')
      }
      return end
    },
    // minDay() {
    //   if (!this.detail) return ''
    //   let begin = this.detail.jobBeginTime || this.detail.jobbegintime || ''
    //   if (begin) {
    //     begin = begin.replace(/\./g, '-')
    //   }
    //   return dateGreater(this.today, begin)
    // },
    // minDay() {
    //   // 工作开始的最小日期
    //   if (!this.detail) return ''
    //   let begin = this.detail.jobBeginTime || ''
    //   if (begin) {
    //     begin = begin.replace(/\./g, '-')
    //   }
    //   return dateGreater(addDays(this.today, 1), begin)
    // },
    // minAvailableDay() {
    //   // 选了最日期后 根据最短工作周期 算出最小日期
    //   return this.job.jobEndTime
    //     ? addDays(this.job.jobEndTime, -this.detail.minTaskDay + 1)
    //     : addDays(this.maxDay, -this.detail.minTaskDay + 1)
    // },
    // maxDay() {
    //   // 工作结束日期
    //   if (!this.detail) return ''
    //   let end = this.detail.jobEndTime || ''
    //   if (end) {
    //     end = end.replace(/\./g, '-')
    //   }
    //   return end
    // },
    // maxAvailableDay() {
    //   // 选了开始日期后 根据最短工作周期 算出最大日期
    //   return this.job.jobBeginTime // ? '2018-08-21' : '2018-08-22'
    //     ? addDays(this.job.jobBeginTime, +this.detail.minTaskDay - 1)
    //     : addDays(this.minDay, +this.detail.minTaskDay - 1)
    // },
    disableApply() {
      return !(!!this.job.jobBeginTime && !!this.job.jobEndTime && !!this.job.jobPeriodBegin && !!this.job.jobPeriodEnd)
    }
  },
  methods: {
    ...mapActions({
      datetime: 'common/fetchDateTime',
      fetchJob: 'job/fetchJob',
      applyJob: 'job/applyJob',
      claimMissionByOwner: 'team/claimMissionByOwner'
    }),
    setDetail() {
      this.detail = Object.assign({}, this.jobDetail)
    },
    setDefaultDialogItems() {
      let dialogItems = this.value.find(job => job.parttimeId === this.jobDetail.recruitmentId)
      if (dialogItems) {
        this.job = dialogItems
      }
    },
    join() {
      this.loading = true

      this.apply(this.job)
        .then(res => {
          this.loading = false
          this.dialog = false
          this.$emit('applied', res)
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
    apply(job) {
      if (this.type === 'team') {
        job.parttimeId = this.detail.recruitmentId
        return Promise.resolve(this.claimMissionByOwner(job))
      } else {
        job.parttimeId = this.$route.params.id
        return Promise.resolve(this.applyJob(job))
      }
    },
    setValue() {
      this.job.parttimeId = this.detail.recruitmentId
      let value = [].concat(this.value)
      let job = value.find(job => job.parttimeId === this.job.parttimeId)
      if (!job) {
        value.push(this.job)
      } else {
        job = Object.assign({}, this.job)
      }
      this.$emit('input', value)
      this.dialog = false
    },
    setChecked() {
      console.log(1)
      this.setValue()
    },
    onCancel() {
      this.dialog = false
      this.$emit('cancel')
    },
    active() {
      this.dialog = true
    }
  },
  watch: {
    activeDialog(newValue) {
      this.dialog = newValue
    }
    // checkedIds: {
    //   handler(newIds) {
    //     if (newIds && !newIds.includes(this.job.parttimeId)) {
    //       let index = this.value.findIndex(job => job.parttimeId === this.job.parttimeId)
    //     }
    //   }
    // }
  },
  mounted() {
    if (!this.today) this.datetime()
    this.setDetail()
    this.setDefaultDialogItems()
    // let index = this.value.findIndex(job => job.parttimeId === this.job.parttimeId)
    // if (index > -1) {
    //   this.checkedProxy = true
    // }
  }
}
</script>
