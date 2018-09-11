import Vue from 'vue'
import VueAMap from 'vue-amap'
import constant from '@const/public'
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: constant.AMAP_KEY,
  // 插件集合
  plugin: [
    'AMap.Geolocation'
    // 'AMap.Autocomplete',
    // 'AMap.PlaceSearch',
    // 'AMap.Scale',
    // 'AMap.OverView',
    // 'AMap.ToolBar',
    // 'AMap.MapType',
    // 'AMap.PolyEditor',
    // 'AMap.CircleEditor'
  ]
  // 高德 sdk 版本，默认为 1.4.4
})
