<template>
  <div class="avatar-wrap">
    <v-avatar size="100%"
              ref="avatar"
              color="primary">
      <img :src="imgUrl"
           v-bind="$attrs"
           v-on="$listeners">
    </v-avatar>
  </div>

</template>

<script>
import constant from '@const/public'
export default {
  inheritAttrs: false,
  props: ['src'],
  computed: {
    imgUrl() {
      if (!this.src) return constant.AVATAR
      return /^http/.test(this.src) ? this.src : constant.BASE_URL + this.src
    }
  }
}
</script>

<style lang="scss">
.avatar-wrap {
  width: 100%;
  padding-top: 100%;
  position: relative;
  .v-avatar {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }
}
</style>
