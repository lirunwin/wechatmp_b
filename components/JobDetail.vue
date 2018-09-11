<template>
  <div v-if="detail">
    <template v-if="!noBase">
      <v-layout row
                wrap
                class="pa-3">
        <div class="subheading">{{detail.title}}</div>
        <v-spacer></v-spacer>
        <div class="error--text">
          <span class="body-2">{{detail.wagebegin}} - {{detail.wageend}}</span>元/天
        </div>
        <v-flex xs12>
          <base-tag>{{detail.wageclearing | valueToLabel(paymentTypes)}}</base-tag>
          <base-tag color="primary">
            <v-icon class="icon--text mr-0">iconfont icon-safety</v-icon>{{detail.wagegeneration | valueToLabel(paymentPlatforms)}}</base-tag>
          <base-tag>{{detail.wagemode | valueToLabel(salaryTypes)}}</base-tag>
        </v-flex>
      </v-layout>
      <v-divider class="mx-3"></v-divider>
      <div class="pa-3">
        <p class="mb-0">
          <span class="text-muted">兼职周期：</span>{{detail.jobbegintime}}-{{detail.jobendtime}}</p>
        <p class="mb-0">
          <span class="text-muted">工作时段：</span>{{detail.isanyjobperiod ? '不限' : detail.jobperiod }}</p>
        <p class="mb-0">
          <span class="text-muted">招聘时间：</span>{{detail.createtime}} - {{detail.endtime}}</p>
        <p class="mb-0">
          <span class="text-muted">公司名称：</span>{{detail.comname}}</p>
      </div>
      <v-divider class="mx-3"></v-divider>
    </template>
    <div class="pa-3">
      <p class="mb-0">
        <span class="text-muted">行业类别：</span>{{detail.industryname}}>{{detail.postionname}}</p>
      <p class="mb-0">
        <span class="text-muted">招聘人数：</span>{{detail.peoplenumber}}人</p>
      <p class="mb-0">
        <span class="text-muted">最低学历：</span>{{detail.mineducation | valueToLabel(eduList)}}</p>
    </div>
    <base-divider></base-divider>
    <div class="pb-3">
      <div class="job-detail-title subheading border-bottom py-2 px-3">薪资福利</div>
      <div class="pt-3 px-3">
        <p class="mb-0">
          <span class="text-muted">工资模式：</span>{{detail.wagemode | valueToLabel(salaryTypes)}}</p>
        <p class="mb-0">
          <span class="text-muted">基本底薪：</span>{{detail.wagebase}}元</p>
        <p class="mb-0">
          <span class="text-muted">提成工资：</span>{{detail.wagecommission}}元/单</p>
        <p class="mb-0">
          <span class="text-muted">工资结算：</span>{{detail.wageclearing | valueToLabel(paymentTypes)}}</p>
      </div>
    </div>
    <base-divider></base-divider>
    <div>
      <div class="job-detail-title subheading border-bottom py-2 px-3">工作地点</div>
      <div class="py-3"
           v-if="!detail.anyaddress && detail.longitude && detail.latitude">
        <no-ssr placeholder="地图加载中...">
          <!-- <baidu-map class="map-view"
                           :center="{ lng: detail.longitude, lat: detail.latitude }"
                           :zoom="15">
                  <bm-marker :position="{ lng: detail.longitude, lat: detail.latitude }"
                             :icon="mapIcon"
                             :offset="mapIconOffset">
                  </bm-marker>
                </baidu-map> -->

          <div class="map-view"
               @touchmove.stop="handleTouch"
               @touchstart.stop="handleTouch"
               @touchend.stop="handleTouch">
            <el-amap :center="center"
                     :zoom="15">
              <el-amap-marker :position="center"></el-amap-marker>
            </el-amap>
          </div>
        </no-ssr>
        <v-divider class="mt-2"></v-divider>
      </div>
      <div class="px-3 py-2">
        <v-icon class="icon--text mr-0">iconfont icon-location</v-icon>
        详细地址：{{detail.anyaddress ? '不限地址' : (!!detail.longitude && !!detail.latitude) ? detail.address : '地址不明确,请联系发布方确认地址'}}
      </div>
    </div>
    <base-divider></base-divider>
    <div>
      <div class="job-detail-title subheading border-bottom py-2 px-3">工作描述</div>
      <p class="pa-3 mb-0 rich-text"
         v-html="detail.workdescription"></p>
    </div>
    <base-divider></base-divider>
    <div>
      <div class="job-detail-title subheading border-bottom py-2 px-3">任职要求</div>
      <p class="pa-3 mb-0 rich-text"
         v-html="detail.jobrequirements">
      </p>
    </div>

  </div>
</template>

<script>
import { eduList, paymentTypes, salaryTypes, paymentPlatforms } from '@const'
import { bdDecrypt } from '@helper'

export default {
  props: {
    detail: {
      type: Object,
      default: () => null
    },
    noBase: Boolean
  },
  data: () => ({
    paymentTypes,
    paymentPlatforms,
    salaryTypes,
    eduList
  }),
  computed: {
    center() {
      // return bdDecrypt(104.070093, 30.662956)
      return bdDecrypt(this.detail.longitude, this.detail.latitude)
    }
  },
  methods: {
    handleTouch(e) {
      console.log('stop')
    }
  }
}
</script>

<style lang="scss">
.job-detail-item {
  min-height: calc(100vh - #{$top-nav-height} - 40px);
}
.job-detail-title::before {
  content: '';
  display: inline;
  border-left: 2px solid $primary;
  margin-right: 0.5rem;
  border-radius: $border-radius;
  transform: scaleY(0.8);
}
</style>
