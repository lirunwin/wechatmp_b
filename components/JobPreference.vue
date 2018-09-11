<template>
  <div class="job-preference white min-h-100">
    <v-layout class="job-preference-city pt-2"
              align-center>
      <div class="body-2 pl-3">城市</div>
      <v-icon class="icon--text ml-3 mr-0">iconfont icon-location</v-icon>
      <city-selector auto-select
                     disable-county
                     v-model="currentLocation"
                     :defaultRegion="defaultRegion"
                     @input="getData">
        <v-btn color="primary"
               class="ma-0"
               flat
               small>{{ currentLocation.city.areaname }}</v-btn>
      </city-selector>
    </v-layout>
    <div class="job-preference-date mt-3"
         v-if="noSave">
      <div class="px-3">工作周期(必填项)</div>
      <v-layout class="px-3 mt-2"
                align-center>
        <div class="pr-3">
          <base-date-picker v-model="jobBeginDate"
                            ltr
                            placeholder="开始日期"
                            bordered></base-date-picker>
        </div>
        <div> - </div>
        <div class="pl-3">
          <base-date-picker v-model="jobEndDate"
                            ltr
                            placeholder="结束日期"
                            bordered></base-date-picker>
        </div>
      </v-layout>
    </div>
    <div class="job-preference-region mt-3">
      <div class="px-3">地区</div>
      <v-layout wrap
                class="px-3">
        <v-flex xs3
                v-for="item of currentCounties"
                :key="item.id">
          <v-checkbox color="primary"
                      class="caption mt-1"
                      off-icon="iconfont icon-checkbox_off"
                      on-icon="iconfont icon-checkbox_on"
                      hide-details
                      :disabled="region.length >= maxRegion && !region.includes(item.id)"
                      v-model="region"
                      :value="item.id"
                      v-if="!isNonRegionItem(item.id)"
                      :label="item.areaname"></v-checkbox>
        </v-flex>
      </v-layout>
    </div>
    <div class="job-preference-district mt-3">
      <div class="px-3">商区</div>
      <v-layout wrap
                class="px-3">
        <v-flex xs3
                v-for="item of businessDistricts"
                :key="item.id">
          <v-checkbox color="primary"
                      class="caption mt-1"
                      off-icon="iconfont icon-checkbox_off"
                      on-icon="iconfont icon-checkbox_on"
                      hide-details
                      v-model="district"
                      :value="item.id"
                      :label="item.name"></v-checkbox>
        </v-flex>
      </v-layout>
    </div>
    <div class="job-preference-metro mt-3">
      <div class="px-3">地铁</div>
      <v-layout wrap
                class="px-3">
        <template v-for="(item, index) of metroLines">
          <v-flex xs12
                  v-if="groupdMetroPlatforms[item.id] && checkedMetroLines.includes(item.id)"
                  :key="index"></v-flex>
          <v-flex xs3
                  :key="item.id">
            <v-checkbox color="primary"
                        class="caption mt-1"
                        off-icon="iconfont icon-checkbox_off"
                        on-icon="iconfont icon-checkbox_on"
                        hide-details
                        v-model="checkedMetroLines"
                        :value="item.id"
                        :label="item.name"></v-checkbox>
          </v-flex>
          <v-flex xs12
                  class="pt-2"
                  :key="item.name"
                  v-if="groupdMetroPlatforms[item.id] && checkedMetroLines.includes(item.id)">
            <v-layout wrap>
              <v-flex xs3
                      v-for="platform of groupdMetroPlatforms[item.id]"
                      :key="platform.id">
                <v-checkbox color="primary"
                            class="caption mt-1"
                            off-icon="iconfont icon-checkbox_off"
                            on-icon="iconfont icon-checkbox_on"
                            hide-details
                            v-model="checkedMetroPlatforms"
                            :value="`${platform.metroid}|${platform.id}`"
                            :label="platform.name"></v-checkbox>
              </v-flex>
              <v-flex xs12
                      class="my-3">
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-flex>
        </template>

      </v-layout>
    </div>
    <div class="job-preference-time mt-3"
         v-if="!noSave">
      <div class="px-3">工作时段</div>
      <v-layout class="px-3 mt-2"
                align-center>
        <div class="pr-3">
          <base-time-picker v-model="startTime"
                            ltr
                            bordered></base-time-picker>
        </div>
        <div> - </div>
        <div class="pl-3">
          <base-time-picker v-model="endTime"
                            ltr
                            bordered></base-time-picker>
        </div>
      </v-layout>
    </div>

    <div class="job-preference-payment mt-3">
      <div class="px-3">结算方式</div>
      <v-layout wrap
                class="px-3">
        <base-tag height="28px"
                  v-for="payment of paymentTypes"
                  block
                  :key="payment.value"
                  :color="paymentType === payment.value ? 'primary': 'grey'"
                  @click="handleTagClick(payment.value, 'paymentType')">{{payment.label}}</base-tag>
      </v-layout>
    </div>
    <div class="job-preference-payment-platforms mt-3">
      <div class="px-3">工资发放</div>
      <v-layout wrap
                class="px-3">
        <base-tag height="28px"
                  v-for="platform of paymentPlatforms"
                  block
                  :key="platform.value"
                  :color="paymentPlatform === platform.value ? 'primary': 'grey'"
                  @click="handleTagClick(platform.value, 'paymentPlatform')">{{platform.label}}</base-tag>
      </v-layout>
    </div>
    <div class="job-preference-action mt-3"
         v-if="!noSave">
      <v-layout align-center
                justify-center>
        <v-checkbox color="primary"
                    class="caption mt-1 flex-auto mx-2"
                    off-icon="iconfont icon-checkbox_off"
                    on-icon="iconfont icon-checkbox_on"
                    hide-details
                    v-model="allow"
                    label="允许简历推荐"></v-checkbox>
        <v-checkbox color="primary"
                    class="caption mt-1 flex-auto mx-2"
                    off-icon="iconfont icon-checkbox_off"
                    on-icon="iconfont icon-checkbox_on"
                    hide-details
                    v-model="subscribe"
                    label="订阅"></v-checkbox>
      </v-layout>
    </div>
    <v-layout class="py-4">
      <v-btn block
             class="mx-3"
             color="primary"
             :loading="loading"
             :disabled="disabled"
             @click="onUpdatePreference">确定</v-btn>
    </v-layout>
  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { paymentTypes, paymentPlatforms } from '@const'
import constant from '@const/public'
import { difference, groupBy } from 'lodash'
export default {
  props: {
    noSave: Boolean
  },
  components: {
    CitySelector
  },
  data: () => ({
    paymentTypes,
    paymentPlatforms,
    currentLocation: {
      city: {}
    },
    region: [],
    maxRegion: constant.PREFERENCE_MAX_REGION,
    district: [],
    startTime: '',
    endTime: '',
    jobBeginDate: '',
    jobEndDate: '',
    paymentType: '',
    paymentPlatform: '',
    subscribe: '',
    allow: '',
    loading: false,
    defaultRegion: [],
    checkedMetroLines: [],
    checkedMetroPlatforms: []
  }),
  methods: {
    ...mapActions({
      fetchCities: 'common/fetchCities',
      fetchDistricts: 'common/fetchDistricts',
      fetchMetroes: 'common/fetchMetroPlatforms',
      updatePreference: 'users/updatePreference',
      fetchPreference: 'users/fetchPreference'
    }),
    ...mapMutations({
      updateRecommendDateSetting: 'job/UPDATE_RECOMMEND_DATE_SETTING'
    }),
    getData(location) {
      this.fetchCities({ pid: location.city.id })
      // this.fetchDistricts({ areaid: location.city.id })
      this.fetchMetroes({ areaid: location.city.id, metroid: 0 })
    },
    getPreference() {
      this.fetchPreference({})
        .then(res => {
          if (res) {
            this.currentLocation.city.id = res.cityid || this.currentCity.id
            this.allow = res.isrecommend
            this.subscribe = res.subscription
            this.paymentType = res.wageclearing
            this.startTime = res.jobperiodbegin
            this.endTime = res.jobperiodend
            this.region = res.countyids
            this.district = res.districtids
            this.checkedMetroLines = this.getMetroLine(res.metroAndPlatform)
            this.checkedMetroPlatforms = res.metroAndPlatform
            this.defaultRegion = [0, res.cityid, 0]
          } else {
            this.currentLocation.city = this.currentCity
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onUpdatePreference() {
      this.loading = true
      let preference = {
        cityid: this.currentLocation.city.id,
        isrecommend: this.allow,
        subscription: this.subscribe,
        wagegeneration: this.paymentPlatform,
        wageclearing: this.paymentType,
        jobperiodbegin: this.startTime,
        jobperiodend: this.endTime,
        countyids: this.region,
        districtids: this.computedDistrict,
        metroAndPlatform: this.selectedMetro
      }
      if (this.noSave) {
        preference.jobBeginDate = this.jobBeginDate
        preference.jobEndDate = this.jobEndDate
        this.loading = false
        this.$emit('input', preference)
      } else {
        this.updatePreference(preference)
          .then(res => {
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            console.log(error)
          })
      }
    },
    isNonRegionItem(id) {
      id = id.substr(id.length - 2, id.length)
      return +id === 99
    },
    setLoading(flag) {
      this.loading = !!flag
    },
    handleTagClick(val, property) {
      if (this[property]) {
        this[property] = this[property] === val ? '' : val
      } else {
        this[property] = val
      }
    },
    getMetroLine(metroes) {
      metroes = metroes.map(item => item.split('|'))
      metroes = groupBy(metroes, item => item[0])
      return Object.keys(metroes)
    }
  },
  computed: {
    ...mapGetters({
      areas: 'common/areas',
      districts: 'common/districts',
      metroes: 'common/metroPlatforms',
      groupdMetroPlatforms: 'common/groupdMetroPlatforms',
      preference: 'users/preference',
      currentCity: 'common/currentCity',
      recommendDateSetting: 'job/recommendDateSetting'
    }),
    currentCounties() {
      if (!this.currentLocation || !this.currentLocation.city) return []
      let counties = this.areas.filter(area => +area.pid === +this.currentLocation.city.id)
      return counties
    },
    metroLines() {
      if (!this.currentLocation || !this.currentLocation.city) return []
      // let metroes = this.metroes.filter(metro => this.currentLocation.city.id === metro.areaid && +metro.metroid === 0)
      let metroes = this.metroes.filter(
        metro => +metro.areaid === +this.currentLocation.city.id && +metro.metroid === 0
      )
      return metroes.sort((a, b) => a.sort - b.sort)
    },
    businessDistricts() {
      // let businessDistricts = this.districts.filter(district => +this.currentLocation.city.id === 5101 )
      let businessDistricts = this.districts.filter(district => this.region.includes(district.areaid))
      return businessDistricts
    },
    computedDistrict() {
      if (!this.region || this.region.length === 0) return []
      let district = []
      this.district.forEach((districtId, index) => {
        let districtObj = this.districts.find(item => item.id === districtId)
        if (!districtObj) return
        if (this.region.includes(districtObj.areaid)) {
          district.push(districtId)
        }
      })
      return district
    },
    isLocationLoading() {
      return !this.currentLocation.city.areaname
    },
    selectedMetro() {
      let lines = this.checkedMetroLines.slice(0)
      let platforms = this.checkedMetroPlatforms.slice(0)
      if (lines.length) {
        return lines
          .map(line => {
            return platforms
              .filter(platform => {
                let metro = platform.split('|')
                return metro[0] === line
              })
              .join()
          })
          .join()
          .split(',')
      }
    },
    disabled() {
      if (this.noSave) {
        return !(this.jobBeginDate && this.jobEndDate)
      } else {
        return false
      }
    },
    jobDate() {
      return {
        jobBeginDate: this.jobBeginDate,
        jobEndDate: this.jobEndDate
      }
    }
  },
  watch: {
    region(newValue) {
      if (newValue && newValue.length) {
        newValue.forEach(areaid => {
          this.fetchDistricts({ areaid })
        })
      }
    },
    checkedMetroLines(newValue, oldValue) {
      if (newValue && newValue.length) {
        let areaId = this.currentLocation.city.id
        if (!areaId) return
        let diff = oldValue ? difference(newValue, oldValue) : newValue
        if (!diff.length) return
        let promises = diff.map(id =>
          Promise.resolve(
            this.fetchMetroes({
              areaid: areaId,
              metroid: id
            })
          )
        )
        Promise.all(promises).then(res => {
          console.log(res)
        })
      }
    },
    jobDate(newValue) {
      if (newValue.jobBeginDate && newValue.jobEndDate) {
        this.updateRecommendDateSetting(newValue)
      }
    }
  },
  mounted() {
    this.getPreference()
    console.log(JSON.stringify(this.recommendDateSetting, null, 2))
    if (this.recommendDateSetting) {
      this.jobBeginDate = this.recommendDateSetting.jobBeginDate
      this.jobEndDate = this.recommendDateSetting.jobEndDate
    }
  }
}
</script>

<style lang="scss">
.job-preference {
  .v-label {
    font-size: $size1;
  }
  .v-input--selection-controls__input {
    align-self: flex-start;
  }
}
</style>
