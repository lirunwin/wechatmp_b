<template>
  <div class="city-selector">
    <v-dialog v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition">

      <div slot="activator"
           :class="{'grey--text': !currentLocation }">
        <slot>{{currentLocation || placeholder || '请选择城市'}}</slot>
      </div>
      <v-card>
        <div class="city-selector-action">
          <v-toolbar light
                     dense
                     flat
                     color="white"
                     class="border-bottom pr-0">
            <v-btn icon
                   light
                   @click.native="dialog = false">
              <v-icon class="iconfont icon-x"></v-icon>
            </v-btn>
            <div>选择城市</div>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn light
                     flat
                     @click="done"
                     class="mx-0 px-0">确定</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="secondary py-2"
               v-if="false">
            <base-input placeholder="请输入城市名称"
                        prepend-inner-icon="iconfont icon-search"
                        autofocus
                        clearable
                        v-model="inputValue"
                        class="mx-3"></base-input>
          </div>
          <v-layout class="px-3 py-2 border-bottom"
                    align-center>
            当前位置：
            <span class="primary--text">
              <base-location v-model="location"></base-location>
            </span>
            <v-spacer></v-spacer>
            <!-- <a href="#"
               v-scroll-to="{
                    el: '#province64',
                    container: '.city-selector-main-provinces',
                }">刷新</a> -->
          </v-layout>
        </div>
        <v-layout class="city-selector-main">
          <v-list class="city-selector-main-provinces secondary">
            <v-list-tile class="city-selector-main-province"
                         :class="{active: +province.id === +currentProvince.id}"
                         v-for="province of provinces"
                         :key="province.id"
                         @click="setCurrentProvince(province)"
                         :id="`province${province.id}`">
              <v-list-tile-content>
                <span class="body-1">{{ province.areaname }}</span>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
          <v-list class="city-selector-main-cities"
                  v-if="!disableCity">
            <v-list-tile class="city-selector-main-city"
                         v-for="city of currentCities"
                         :key="city.id"
                         @click="setCurrentCity(city)">
              <v-list-tile-content>
                <span class="px-3 body-1"
                      :class="{active: +city.id === +currentCity.id}">{{ city.areaname }}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list class="city-selector-main-cities"
                  v-if="!disableCity && !disableCounty">
            <v-list-tile class="city-selector-main-city"
                         v-for="county of currentCounties"
                         :key="county.id"
                         @click="setCurrentCounty(county)">
              <v-list-tile-content>
                <span class="px-3 body-1"
                      :class="{active: +county.id === +currentCounty.id}">{{ county.areaname }}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { labelToValue } from '@helper'
import { areaStatuses } from '@const'
export default {
  props: {
    disableCity: {
      type: Boolean,
      default: false
    },
    disableCounty: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    defaultRegion: {
      type: Array,
      default: () => []
    },
    autoSelect: Boolean,
    open: Boolean
  },
  data() {
    return {
      dialog: false,
      inputValue: '',
      currentProvince: {},
      currentCity: {},
      currentCounty: {},
      location: null
    }
  },
  computed: {
    ...mapGetters({
      areas: 'common/areas'
    }),
    provinces() {
      return this.areas.filter(area => {
        if (this.open) {
          return +area.pid === 0 && area.openstatus === labelToValue('open', areaStatuses)
        } else return +area.pid === 0
      })
    },
    currentCities() {
      if (!this.currentProvince) return []
      let cities
      if (this.open) {
        cities = this.areas.filter(
          area => +area.pid === +this.currentProvince.id && area.openstatus === labelToValue('open', areaStatuses)
        )
      } else cities = this.areas.filter(area => +area.pid === +this.currentProvince.id)
      return cities
    },
    currentCounties() {
      if (!this.currentCity) return []
      let counties
      if (this.open) {
        counties = this.areas.filter(
          area => +area.pid === +this.currentCity.id && area.openstatus === labelToValue('open', areaStatuses)
        )
      } else counties = this.areas.filter(area => +area.pid === +this.currentCity.id)
      return counties
    },
    currentLocation() {
      let location = ''
      let province = this.currentProvince.areaname || ''
      let city = this.currentCity.areaname || ''
      let county = this.currentCounty.areaname || ''
      if (!province) return ''
      location += province
      if (this.disableCity === false) {
        location += city
        if (this.disableCounty === false) {
          location += county
        }
        return location
      }
      return location
    }
  },
  methods: {
    ...mapActions({
      fetchCities: 'common/fetchCities'
    }),
    setCurrentProvince(province) {
      this.currentProvince = province
      this.currentCity = {}
      this.currentCounty = {}
      this.fetchCities({ pid: province.id })
    },
    setCurrentCity(city) {
      this.currentCity = city
      this.currentCounty = {}
      this.fetchCities({ pid: city.id })
    },
    setCurrentCounty(county) {
      this.currentCounty = county
    },
    done() {
      this.dialog = false
      this.$emit('input', {
        province: this.currentProvince,
        city: this.currentCity,
        county: this.currentCounty,
        location: this.currentLocation
      })
    },
    getDefault() {
      let regions = this.defaultRegion

      if (regions.length) {
        let provinceId = regions[0]
        let cityId = regions[1]
        let countyId = regions[2]
        if (countyId) {
          provinceId = countyId.substr(0, 2)
          cityId = countyId.substr(0, 4)
        } else if (cityId) {
          provinceId = cityId.substr(0, 2)
        }
        let promises = []
        promises.push(Promise.resolve(this.fetchCities({ pid: 0 })))
        if (provinceId) promises.push(Promise.resolve(this.fetchCities({ pid: provinceId })))
        if (cityId) promises.push(Promise.resolve(this.fetchCities({ pid: cityId })))

        Promise.all(promises).then(res => {
          // console.log({ res })
          this.currentProvince = this.areas.find(area => +area.id === +provinceId) || {}
          this.currentCity = this.areas.find(area => +area.id === +cityId) || {}
          this.currentCounty = this.areas.find(area => +area.id === +countyId) || {}

          let location = {
            province: this.currentProvince,
            city: this.currentCity,
            county: this.currentCounty,
            location: this.currentLocation
          }
          this.$emit('input', location)
        })
        // if (region[0]) {
        //   this.fetchCities().then(() => {
        //     this.currentProvince = this.areas.find(area => +area.id === +regions[0]) || {}
        //   })
        // } else {
        //   this.fetchCities()
        // }
        // if (region[1]) {
        //   this.fetchCities({ pid: regions[0] }).then(() => {
        //     this.currentCity = this.areas.find(area => +area.id === +regions[1]) || {}
        //   })
        // }
        // if (region[2]) {
        //   this.fetchCities({ pid: regions[1] }).then(() => {
        //     this.currentCounty = this.areas.find(area => +area.id === +regions[2]) || {}
        //   })
        // }
      } else this.fetchCities()
    }
  },
  watch: {
    location(newValue) {
      if (
        this.autoSelect &&
        !this.currentProvince.id &&
        !this.currentCity.id &&
        !this.currentCounty.id &&
        !!newValue.adcode
      ) {
        this.$emit('input', {
          city: {
            id: newValue.adcode.substr(0, 4),
            areaname: newValue.city || newValue.province
          }
        })
      }
    },
    defaultRegion: {
      handler(newValue) {
        // console.log(newValue)
        this.getDefault()
      },
      immediate: true
    }
  }
}
// setTimeout(() => {
//   this.$nextTick(
//     this.$scrollTo('#province64', 1000, {
//       container: '.city-selector-main-provinces',
//       cancelable: false,
//       onStart: () => console.log(111),
//       onDone: () => console.log(222),
//       onCancel: () => console.log('为什么取消了??????!!!!!')
//     })
//   )
// }, 5000)
</script>

<style lang="scss">
.city-selector-main {
  height: calc(100vh - 87px);
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  ul {
    list-style: none;
    padding: 0;
  }
  .city-selector-main-provinces {
    flex: 0 0 25%;
    width: 25%;
    height: 100%;
    overflow: auto;
    .city-selector-main-province {
      position: relative;
      &.active {
        background-color: #ffffff;
        &::before {
          content: '';
          position: absolute;
          border-left: 2px solid $primary;
          border-radius: 4px;
          height: 100%;
          top: 0;
          left: 0.5em;
          transform: scaleY(0.5);
        }
      }
    }
  }
  .city-selector-main-cities {
    overflow: auto;
    height: 100%;
    flex: 1;
    .city-selector-main-city span {
      border-radius: $border-radius;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: lighten($primary, 15%);
      }
    }
  }
  .body-1 {
    line-height: 1.2;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>
