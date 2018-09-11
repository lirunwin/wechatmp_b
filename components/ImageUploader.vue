<template>
  <div class="image-uploader">
    <slot>
      <div v-for="(img, index) of base64s"
           v-if="base64s.length && index < maxImages"
           :key="index"
           :style="`backgroundImage: url(${img.base64})`">
        <v-btn small
               icon
               color="secondary"
               class="image-uploader-item-close ma-0"
               @click="deleteImg(index)">
          <v-icon class="caption"
                  color="white">iconfont icon-x</v-icon>
        </v-btn>
      </div>
      <div class="image-uploader-btn d-flex align-center">
        <v-btn small
               class="ma-0 pa-0"
               outline
               color="grey"
               @click="chooseFile"
               :disabled="base64s.length >= maxImages"
               :loading="loading">
          <v-icon color="grey"
                  large>iconfont icon-plus</v-icon>
        </v-btn>
      </div>
    </slot>
    <input type="file"
           class="d-none"
           ref="uploadImage"
           accept="image/*"
           @change="onFilePicked"
           :multiple="maxImages > 1">
  </div>
</template>

<script>
import { unionBy } from 'lodash'
import constant from '@const/public'
import { readFiles } from '@helper'
import { mapActions } from 'vuex'
export default {
  props: {
    max: Number
  },
  data: () => ({
    loading: false,
    images: [],
    base64s: []
  }),
  computed: {
    maxImages() {
      return this.max ? this.max : constant.MAX_IMAGES_UPLOAD
    }
  },
  methods: {
    ...mapActions({
      uploadFile: 'common/uploadFile'
    }),
    chooseFile() {
      this.$refs.uploadImage.click()
    },
    async onFilePicked(event) {
      this.loading = true
      let files = event.target.files
      files = Array.from(files).slice(0, this.maxImages - this.images.length)

      readFiles(files).then(res => {
        this.base64s = unionBy(res, this.base64s, 'name')
      })
      let formDataPromise = files.map((file, index) => {
        let formData = new FormData()
        formData.append('file', file)
        return Promise.resolve(this.uploadFile(formData))
      })
      let newImages
      try {
        newImages = await Promise.all(formDataPromise)
      } catch (error) {
        this.loading = false
        console.log(error)
      }
      this.images = unionBy(newImages, this.images, 'title')
      this.loading = false

      this.$emit('input', this.maxImages === 1 ? this.images[0] : this.images)
    },
    deleteImg(index) {
      this.base64s.splice(index, 1)
      this.images.splice(index, 1)
      this.$emit('input', this.images)
    }
  }
}
</script>

<style lang="scss">
.image-uploader {
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex: 0 0 88px;
    width: 88px;
    height: 88px;
    margin: 16px;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    img {
      width: 100%;
    }
  }
  .image-uploader-btn {
    .v-btn.v-btn--outline {
      border-style: dashed;
      height: 100%;
      width: 100%;
      display: block;
      border-radius: $border-radius * 2;
    }
  }
  .image-uploader-item-close {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    transform: translate3d(50%, -50%, 0);
  }
}
</style>
