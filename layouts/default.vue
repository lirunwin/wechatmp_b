<template>
  <v-app light>
    <v-toolbar flat
               app
               dense
               clipped-left
               color="white"
               class="border-bottom"
               v-if="false">
      <v-btn icon
             @click.stop="$router.back">
        <v-icon class="iconfont icon-left"></v-icon>
      </v-btn>
      <div v-text="title"></div>
    </v-toolbar>
    <v-content>
      <v-container class="pa-0 main-container"
                   :class="{'android': os !== 'iOS'}">
        <nuxt/>
      </v-container>
    </v-content>
    <bottom-nav :class="{'bottom-nav-android': os !== 'iOS'}"
                v-if="path"></bottom-nav>
    <v-snackbar v-model="showSnackbar"
                :timeout="3000"
                top
                center
                :color="snackbar.color ? snackbar.color : 'primary'"
                auto-height>
      {{snackbar.msg}}
      <v-spacer></v-spacer>
      <v-btn color="currentColor"
             flat
             icon
             @click="showSnackbar = false">
        <v-icon>iconfont icon-x</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'
import { mapGetters } from 'vuex'
export default {
  components: {
    BottomNav
  },
  middleware: 'meta',
  data() {
    return {
      bottomNav: 'center',
      showSnackbar: false,
      test: true
    }
  },
  computed: {
    ...mapGetters({
      snackbar: 'sys/snackbar',
      location: 'common/currentLocation',
      meta: 'sys/meta'
    }),
    path() {
      let meta = this.meta
      return meta ? meta.bottomBar : false
    },
    title() {
      let meta = this.meta
      return meta ? meta.title || '懒虫动动兼职平台' : '懒虫动动兼职平台'
    },
    os() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera
      if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone'
      }
      if (/android/i.test(userAgent)) {
        return 'Android'
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS'
      }
      return 'unknown'
    }
  },
  watch: {
    snackbar(newValue) {
      this.showSnackbar = newValue.show
    }
  },
  mounted() {
    console.log('meta:', JSON.stringify(this.$route.path, null, 2))
  }
}
</script>
<style lang="scss">
.main-container {
  height: 100%;
  // &.android {
  //   padding-bottom: $wechat-nav-bar-height !important;
  // }
}
// .bottom-nav-android {
//   // bottom: $wechat-nav-bar-height !important;
// }
</style>
