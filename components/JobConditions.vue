<template>
  <div class="job-conditions">
    <div class="white py-3">
      <v-layout align-center
                class="pl-3 pr-2">
        <span>工资保障</span>
        <v-spacer></v-spacer>
        <span>
          <v-checkbox color="primary"
                      class="ma-0"
                      hide-details
                      v-model="condition.wageGeneration"></v-checkbox>
        </span>
      </v-layout>
      <v-layout align-center
                class="pl-3 pr-2">
        <span>积分奖励</span>
        <v-spacer></v-spacer>
        <span>
          <v-checkbox color="primary"
                      class="ma-0"
                      hide-details
                      v-model="condition.personalRewardPoints"></v-checkbox>
        </span>
      </v-layout>
      <div class="py-1 px-3">
        <div class="body-2">兼职周期</div>
        <v-layout align-center
                  class="mt-1">
          <div class="job-conditions-input">
            <base-date-picker v-model="condition.jobBeginTime"
                              placeholder="兼职开始日期"
                              ltr
                              bordered></base-date-picker>
          </div>
          <span class="px-3">-</span>
          <div class="job-conditions-input">
            <base-date-picker v-model="condition.jobEndTime"
                              placeholder="兼职结束日期"
                              ltr
                              bordered></base-date-picker>
          </div>
        </v-layout>
      </div>
      <div class="py-1 px-3">
        <div class="body-2">工作时段</div>
        <v-layout align-center
                  class="mt-1">
          <div class="job-conditions-input">
            <base-time-picker v-model="condition.jobPeriodBegin"
                              bordered
                              placeholder="开始时间"></base-time-picker>
          </div>
          <span class="px-3">-</span>
          <div class="job-conditions-input">
            <base-time-picker v-model="condition.jobPeriodEnd"
                              bordered
                              placeholder="开始时间"></base-time-picker>
          </div>
        </v-layout>
      </div>
      <div class="py-1 px-3">
        <div class="body-2">工资模式</div>
        <div class="d-flex">
          <base-tag height="24px"
                    :color="condition.wageMode === '' ? 'primary' : 'grey'"
                    @click="condition.wageMode = ''">不限</base-tag>
          <base-tag height="24px"
                    v-for="salaryType of salaryTypes"
                    :key="salaryType.label"
                    :color="condition.wageMode === salaryType.value ? 'primary' : 'grey'"
                    @click="condition.wageMode = salaryType.value">{{salaryType.label}}</base-tag>
        </div>
      </div>
      <div class="py-1 px-3">
        工资范围
        <v-layout align-center>
          <div class="job-conditions-input">
            <base-input placeholder="最低薪资"
                        v-model="condition.wageBegin"
                        bordered></base-input>
          </div>
          <span class="px-3">-</span>
          <div class="job-conditions-input">
            <base-input placeholder="最高薪资"
                        v-model="condition.wageEnd"
                        bordered></base-input>
          </div>
        </v-layout>
      </div>
      <div class="py-1 px-3">
        <div class="body-2">结算方式</div>
        <div class="d-flex">
          <base-tag height="24px"
                    :color="condition.wageClearing === '' ? 'primary' : 'grey'"
                    @click="condition.wageClearing = ''">不限</base-tag>
          <base-tag height="24px"
                    v-for="paymentType of paymentTypes"
                    :key="paymentType.label"
                    :color="condition.wageClearing === paymentType.value ? 'primary' : 'grey'"
                    @click="onPaymentTypeSelected(paymentType)">{{paymentType.label}}</base-tag>
        </div>
      </div>
      <div class="py-1 px-3">
        <div class="body-2">特色兼职</div>
        <div class="d-flex">
          <!-- <base-tag height="24px"
                  v-model="condition.featuresId"
                  clickable
                  :val="tag.id"
                  v-for="tag of specialTags"
                  :key="tag.id">{{tag.name}}</base-tag> -->
          <base-tag height="24px"
                    v-model="condition.featuresId"
                    v-for="tag of specialTags"
                    :key="tag.id"
                    :color="condition.featuresId === tag.id ? 'primary' : 'grey'"
                    @click="onSpecialTagSelected(tag)">{{tag.name}}</base-tag>
        </div>
      </div>
      <v-layout class="pa-3 mt-3">
        <v-flex xs4>
          <v-btn color="primary"
                 outline
                 @click="$emit('reset')"
                 block>重置</v-btn>
        </v-flex>
        <v-flex ml-3
                xs8>
          <v-btn color="primary"
                 @click="onSubmit"
                 block>确定</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { salaryTypes, paymentTypes, jobTypes } from '@const'
import { mapGetters, mapActions } from 'vuex'
import { labelToValue } from '@helper'
export default {
  data: () => ({
    condition: {
      wageGeneration: false, // 工资保障
      personalRewardPoints: false, // 积分奖励
      jobBeginTime: '', // 兼职周期
      jobEndTime: '',
      jobPeriodBegin: '', // 工作时段
      jobPeriodEnd: '',
      wageBegin: '', // 工资范围
      wageEnd: '',
      wageMode: '', // 工资模式
      wageClearing: '', // 结算方式
      featuresId: [] // 特色兼职
    },
    salaryTypes,
    paymentTypes
  }),
  computed: {
    ...mapGetters({
      currentCity: 'common/currentCity',
      specialTags: 'common/specialTags'
    })
  },
  methods: {
    ...mapActions({
      fetchSpecialTags: 'common/fetchSpecialTags'
    }),
    onSalaryTypeSelected(salaryType) {
      // console.log(salaryType)
      this.condition.wageMode = salaryType.value
    },
    onPaymentTypeSelected(paymentType) {
      // console.log(paymentType)
      this.condition.wageClearing = paymentType.value
    },
    onSpecialTagSelected(tag) {
      // console.log(tag.id)
      this.condition.featuresId = tag.id
    },
    onSubmit() {
      this.$emit('filterChanged', this.condition)
    },
    reset() {
      this.condition = {
        wageGeneration: false, // 工资保障
        personalRewardPoints: false, // 积分奖励
        jobBeginTime: '', // 兼职周期
        jobEndTime: '',
        jobPeriodBegin: '', // 工作时段
        jobPeriodEnd: '',
        wageBegin: '', // 工资范围
        wageEnd: '',
        wageMode: '', // 工资模式
        wageClearing: '', // 结算方式
        featuresId: [] // 特色兼职
      }
    }
  },
  mounted() {
    if (!this.specialTags || this.specialTags.length === 0) {
      let type = labelToValue('parttime', jobTypes)
      this.fetchSpecialTags({ recruitmenttype: type })
    }
  }
}
</script>

<style lang="scss">
.job-conditions {
  .job-conditions-input {
    width: 8em;
  }
  .job-conditions-special-item {
    display: inherit;
    margin-left: $tag-space;
  }
}
</style>
