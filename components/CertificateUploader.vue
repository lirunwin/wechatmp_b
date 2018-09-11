<template>
  <v-layout class="certificate-uploader px-3 my-3">
    <v-flex class="mr-2 certificate-uploader-btn"
            :style="{backgroundImage: `url(${frontBg || ''})`}"
            v-ripple>
      <v-layout justify-center
                align-center
                column
                class="h-100">
        <v-btn class="text-xs-center"
               flat
               icon
               color="primary"
               :loading="frontLoading"
               @click="$refs.front.click()"
               :ripple="false">
          <v-icon color="white">iconfont icon-plus</v-icon>
        </v-btn>
        <div>上传{{text}}正面</div>
        <input type="file"
               class="d-none"
               accept="image/*"
               @change="onFilePicked($event, 'front')"
               ref="front" />
      </v-layout>
    </v-flex>
    <v-flex class="mr-2 certificate-uploader-btn"
            :style="{backgroundImage: `url(${backBg || ''})`}"
            v-ripple>
      <v-layout justify-center
                align-center
                column
                class="h-100">
        <v-btn class="text-xs-center"
               flat
               icon
               color="primary"
               :loading="backLoading"
               @click="$refs.back.click()"
               :ripple="false">
          <v-icon color="white">iconfont icon-plus</v-icon>
        </v-btn>
        <div>上传{{text}}反面</div>
        <input type="file"
               class="d-none"
               accept="image/*"
               @change="onFilePicked($event, 'back')"
               ref="back" />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { readFiles } from '@helper'
import { mapActions } from 'vuex'
import constant from '@const/public'
export default {
  props: {
    max: Number,
    multiple: {
      default: true
    },
    text: String,
    value: Object
  },
  data: () => ({
    certificate: {
      front: null,
      back: null
    },
    frontBg: null,
    backBg: null,
    frontLoading: false,
    backLoading: false
  }),
  methods: {
    ...mapActions({
      uploadFile: 'common/uploadFile'
    }),
    async onFilePicked(event, flag) {
      this[`${flag}Loading`] = true
      let file = await readFiles(event.target.files)
      this[`${flag}Bg`] = file[0].base64
      let formData = new FormData()
      formData.append('file', event.target.files[0])
      let url = await this.uploadFile(formData)
      this.certificate[flag] = url.src
      this[`${flag}Loading`] = false
    }
  },
  watch: {
    certificate: {
      handler: function(newValue) {
        this.$emit('input', this.certificate)
      },
      deep: true
    }
    // value: {
    //   handler: function(newValue) {
    //     // console.log(newValue)
    //   }
    // }
  },
  mounted() {
    if (this.value) {
      this.frontBg = constant.BASE_URL + this.value.front
      this.backBg = constant.BASE_URL + this.value.back
      this.certificate = {
        front: this.value.front,
        back: this.value.back
      }
    }
  }
}
</script>

<style lang="scss">
.certificate-uploader {
  height: 100px;
  .certificate-uploader-btn {
    border: 1px dashed $primary;
    border-radius: $border-radius;
    background-size: cover;
    i.iconfont {
      background-color: $primary;
      border-radius: 50%;
      padding: 6px;
    }
  }
}
</style>
