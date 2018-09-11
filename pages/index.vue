<template>
  <div>
    <base-location location-only
                   v-if="!currentCity.id"></base-location>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    url: ''
  }),
  computed: {
    ...mapGetters({
      currentCity: 'common/currentCity',
      deviceInfo: 'sys/deviceInfo',
      wechatLoginCode: 'sys/wechatLoginCode',
      wechatUserInfo: 'sys/wechatUserInfo'
    })
  },
  watch: {
    currentCity: {
      handler(newValue) {
        if (newValue) {
          this.$router.replace('/job')
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setDeviceInfo: 'sys/SET_DEVICE_INFO',
      setWechatLoginCode: 'sys/SET_WECHAT_LOGIN_CODE',
      setWechatUserInfo: 'sys/SET_WECHAT_USER_INFO'
    }),
    getDeviceInfo() {
      try {
        let deviceInfo = this.$route.query.deviceInfo
        if (deviceInfo) this.setDeviceInfo(JSON.parse(decodeURI(deviceInfo)))
      } catch (error) {
        console.log(error)
      }
    },
    getWechatLoginCode() {
      try {
        let wechatLoginCode = this.$route.query.code
        if (wechatLoginCode) this.setWechatLoginCode(decodeURI(wechatLoginCode))
      } catch (error) {
        console.log(error)
      }
    },
    getWechatUserInfo() {
      try {
        let wechatUserInfo = this.$route.query.userInfo
        if (wechatUserInfo) this.setWechatUserInfo(JSON.parse(decodeURI(wechatUserInfo)))
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.$router.replace('user/signup')
    this.getDeviceInfo()
    this.getWechatLoginCode()
    this.getWechatUserInfo()
  }
}
</script>
