<template>
  <no-ssr>
    <div class="amap-page-container"
         v-if="currentCity.status !== 'loading' && currentCity.status !== 'located'">
      <el-amap vid="amap"
               :plugin="plugin"
               class="amap-demo">
      </el-amap>
      <div class="toolbar"
           v-if="locationOnly === false">
        <slot>
          <div class="d-inline-block">
            <v-icon class="icon--text mr-0">iconfont icon-location</v-icon>
            <span v-if="loaded">{{ address ? currentAddress : cityName }}
            </span>
          </div>
        </slot>
      </div>
    </div>
    <div v-else-if="!locationOnly">{{address ? currentLocation.address : currentLocation.city}}</div>
  </no-ssr>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    locationOnly: {
      type: [Boolean, String],
      default: false
    },
    address: {
      type: [Boolean, String],
      default: null
    },
    city: {
      type: [Boolean, String],
      default: null
    }
  },
  data() {
    let self = this
    return {
      loaded: false,
      cityName: '',
      currentAddress: '',
      isFailedOnce: false,
      map: {},
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              // console.log({ o })
              self.updateCurrentCity({ status: 'loading' })
              // self.updateCurrentCity({
              //   areaname: '成都市',
              //   id: 5101,
              //   pid: 51,
              //   status: 'loading'
              // })
              console.log('fetching location')

              o.getCurrentPosition((status, result) => {
                // console.log({ status }, { result })

                if (result && result.info === 'FAILED') {
                  console.log('get location failed')
                  if (!self.isFailedOnce) {
                    self.isFailedOnce = true
                    self.updateCurrentCity({
                      areaname: '成都市',
                      id: 5101,
                      pid: 51,
                      status: 'loading'
                    })
                  }
                }
                if (result && result.position) {
                  // console.log({ result })
                  console.log('get location success')
                  // alert(JSON.stringify(result, null, 2))

                  let address = result.addressComponent
                  let location = {}
                  if (address) {
                    location = {
                      adcode: address.adcode,
                      province: address.province,
                      city: address.city || address.province,
                      district: address.district,
                      township: address.township,
                      street: address.street,
                      streetNumber: address.streetNumber,
                      address: result.formattedAddress,
                      position: {
                        lat: result.position.lat,
                        lng: result.position.lng
                      }
                    }
                    self.updateCurrentCity({
                      areaname: location.city || location.province,
                      id: location.adcode.substr(0, 4),
                      pid: location.adcode.substr(0, 2),
                      position: location.position,
                      status: 'located'
                    })
                    self.currentAddress = result.formattedAddress
                    self.cityName = address.city || address.province
                    self.loaded = true
                  } else if (result.position) {
                    location = {
                      position: {
                        lat: result.position.lat,
                        lng: result.position.lng
                      }
                    }
                  }
                  self.$emit('input', location)
                  self.updateCurrentLocation(location)
                }
              })
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentLocation: 'common/currentLocation',
      currentCity: 'common/currentCity'
    })
  },
  methods: {
    ...mapMutations({
      updateCurrentLocation: 'common/UPDATE_CURRENT_LOCATION',
      updateCurrentCity: 'common/UPDATE_CURRENT_CITY'
    })
  },
  mounted11() {
    // lazyAMapApiLoaderInstance.load().then(() => {
    //   console.log('i am here')
    //   this.map = new AMap.Map('amapContainer', {})
    //   var geolocation = new AMap.Geolocation({
    //     enableHighAccuracy: true,
    //     timeout: 1000
    //   })
    //   // 我在main.js中加载了定位插件，这里还需要加载吗？
    //   this.map.plugin(geolocation)
    //   this.map.addControl(geolocation)
    //   geolocation.getCurrentPosition()
    //   // this.map可以打印出来
    //   // console.log(this.map)
    //   // 这样的事件无法触发
    //   AMap.event.addListener(geolocation, 'complete', data => {
    //     console.log(data)
    //   })
    //   AMap.event.addListener(geolocation, 'error', err => {
    //     console.log(err)
    //   })
    // })
  }
}
</script>
