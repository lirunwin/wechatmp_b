<template>
  <div class="my-mission-checkinout"
       v-if="id">
    <v-layout class="py-5"
              align-center
              justify-center>
      <div class="btn-fancy"
           :class="{'btn-fancy-disabled': disableCheckInOut}">
        <v-btn color="primary"
               fab
               large
               depressed
               class="ma-0 body-2"
               :disabled="disableCheckInOut"
               :loading="loading"
               @click="onCheckIn">{{btnText}}</v-btn>
      </div>
    </v-layout>
    <v-layout align-center
              justify-center
              pb-3
              class="text-xs-center">
      <div class="px-4">
        <div class="title primary--text pb-2">{{checkInOutLog.signinNum||0}}</div>
        <div>总签到</div>
      </div>
      <div class="px-4">
        <div class="title primary--text pb-2">{{checkInOutLog.signConfirmNum||0}}</div>
        <div>已确认</div>
      </div>
      <div class="px-4">
        <div class="title primary--text pb-2">{{checkInOutLog.signDenyNum||0}}</div>
        <div>已驳回</div>
      </div>
    </v-layout>
    <v-layout align-top
              class="py-2 px-3 text-muted">
      <span class="flex-auto">当前位置：</span>
      <span class="caption">
        <base-location address
                       v-model="location"
                       @located="onLocated" />
      </span>
    </v-layout>
    <div class="body-2 py-2 px-3 grey lighten-3">签到记录</div>
    <div class="my-mission-checkinout-log">
      <div v-for="item of checkInOutLog.list"
           :key="item.signinId"
           class="my-mission-checkinout-log-item">
        <v-layout class="border-bottom px-3 py-2 body-2 grey--text text--darken-2">
          <v-spacer/>
          <span>{{item.acceptanceStatus | valueToLabel(orderStatuses)}}</span>
        </v-layout>
        <div class="py-2 px-3">
          <span class="primary--text">上班签到</span>
          <v-layout class="mt-1"
                    align-center>
            <v-icon class="icon--text"
                    color="grey darken-2"
                    v-if="item.upaddress">iconfont icon-location</v-icon>
            <span class="caption mr-4">地址：{{item.upaddress}}</span>
          </v-layout>
          <v-layout class="mt-1"
                    align-center>
            <v-icon class="icon--text"
                    color="grey darken-2"
                    v-if="item.uptime">iconfont icon-time</v-icon>
            <span class="body-2 flex-auto">{{item.uptime}}</span>
          </v-layout>
        </div>
        <div class="py-2 px-3"
             v-if="item.downaddress">
          <span class="primary--text">下班签到</span>
          <v-layout class="mt-1"
                    align-center>
            <v-icon class="icon--text"
                    color="grey darken-2">iconfont icon-location</v-icon>
            <span class="caption mr-4">地址：{{item.downaddress}}</span>

          </v-layout>
          <v-layout class="mt-1"
                    align-center>
            <v-icon class="icon--text"
                    color="grey darken-2">iconfont icon-time</v-icon>
            <span class="body-2 flex-auto">{{item.downtime}}</span>
          </v-layout>
        </div>
        <template v-if="item.directions">
          <v-divider class="mx-3"></v-divider>
          <div class="px-3 py-2 mb-0 text-muted">
            备注：{{item.directions}}
          </div>
        </template>
        <base-divider></base-divider>
        <img src="@img/reject.png"
             v-if="getCheckInOutStatus(item.acceptanceStatus) === 'reject'">
      </div>
      <base-infinite @infinite="infinite($event, fetchCheckInOutLog, {id})"
                     ref="infiniteLoading"></base-infinite>
    </div>
  </div>
</template>

<script>
import { page } from '@mixins'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { valueToLabel } from '@helper'
import { missionCheckTypes, orderStatuses, applyStatuses } from '@const'
export default {
  props: ['id', 'status'],
  mixins: [page],
  data: () => ({
    orderStatuses,
    loading: false,
    location: null
  }),
  computed: {
    ...mapGetters({
      currentLocation: 'common/currentLocation',
      checkStatus: 'mission/checkStatus',
      checkInOutLog: 'mission/checkInOutLog'
    }),
    disableCheckInOut() {
      let type = this.checkStatus.signType
      if (!type) return true
      let status = this.status
      return (
        !this.currentLocation.position ||
        valueToLabel(type, missionCheckTypes, 'name') === 'overdue' ||
        valueToLabel(status, applyStatuses, 'name') === 'done'
      )
    },
    btnText() {
      let type = this.checkStatus.signType
      let text = '签到'
      if (!type || valueToLabel(type, missionCheckTypes, 'name') === 'checkin') text = '上班签到'
      else if (valueToLabel(type, missionCheckTypes, 'name') === 'checkout') text = '下班签到'
      return text
    }
  },
  methods: {
    ...mapActions({
      fetchCheckInOutLog: 'mission/fetchCheckInOutLog',
      fetchCheckStatus: 'mission/fetchCheckStatus',
      checkIn: 'mission/checkIn',
      checkOut: 'mission/checkOut'
    }),
    ...mapMutations({
      updateCurrentLocation: 'common/UPDATE_CURRENT_LOCATION',
      updateCurrentCity: 'common/UPDATE_CURRENT_CITY'
    }),
    onCheckIn() {
      let checkIn = {
        deliveryid: this.$route.params.id,
        address: this.currentLocation.address,
        longitude: this.currentLocation.position.lng,
        latitude: this.currentLocation.position.lat
      }
      this.loading = true
      this.fetchCheckStatus({ id: checkIn.deliveryid }).then(res => {
        let id = res.upId
        let type = valueToLabel(res.signType, missionCheckTypes, 'name')
        if (type === 'checkout') {
          checkIn.id = id
          this.checkOut(checkIn)
            .then(res => {
              this.loading = false
              this.fetchCheckStatus({ id: checkIn.deliveryid })
              this.resetCheckInOutLog()
            })
            .catch(error => {
              console.log(error)
              this.loading = false
            })
        } else if (type === 'checkin') {
          this.loading = true
          this.checkIn(checkIn)
            .then(res => {
              this.loading = false
              this.fetchCheckStatus({ id: checkIn.deliveryid })
              this.resetCheckInOutLog()
            })
            .catch(error => {
              console.log(error)
              this.loading = false
            })
        } else {
          this.loading = false
          this.showMsg(res.note || '暂时不能签到')
        }
      })
    },
    resetCheckInOutLog() {
      this.$refs.infiniteLoading.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    },
    onLocated(location) {
      this.updateCurrentLocation(location)
      this.updateCurrentCity({
        areaname: location.city || location.province,
        id: location.adcode.substr(0, 4),
        pid: location.adcode.substr(0, 2),
        position: location.position
      })
    },
    getCheckInOutStatus(val) {
      return valueToLabel(val, orderStatuses)
    }
  },
  mounted() {
    this.fetchCheckStatus({ id: this.$route.params.id })
  }
}
</script>

<style lang="scss">
.my-mission-checkinout {
  .my-mission-checkinout-log-item {
    position: relative;
    z-index: 2;
    img {
      position: absolute;
      z-index: 1;
      right: 2rem;
      top: 5rem;
      width: 20vw;
    }
  }
}
</style>
