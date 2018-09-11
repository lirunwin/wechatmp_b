<template>
  <v-layout class="base-input"
            v-bind="{'align-center': solo, 'align-end': !solo}"
            :class="{'base-input-bordered': bordered !== false }">
    <v-flex>
      <v-text-field outline
                    v-on="$listeners"
                    v-bind="$attrs"
                    v-model="inputValue"></v-text-field>
    </v-flex>
    <div>
      <v-btn class="base-input-btn body-1 ma-0"
             v-if="sms !== null"
             outline
             small
             color="primary"
             :disabled="!valiPhone || disableSms"
             @click="getCode">获取验证码{{ countDown ? countDown : '' }}</v-btn>
    </div>
    <div>
      <v-btn class="base-input-btn body-1 mx-0 px-0"
             v-if="captcha !== null"
             flat
             small
             color="primary"
             @click="changeImg">
        <img :src="url"
             class="w-100">
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import constant from '@const/public'
import rules from '@const/rules'
import { mapActions } from 'vuex'
import { smsTypes } from '@const'
import { labelToValue } from '@helper'
export default {
  inheritAttrs: false,
  props: {
    sms: {
      type: String,
      default: null
    },
    smsType: String,
    captcha: {
      type: String,
      default: null
    },
    value: String,
    bordered: {
      type: [String, Boolean],
      default: false
    },
    flat: {
      type: Boolean,
      default: true
    },
    solo: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    inputValue: null,
    initCountDown: constant.SMS_COUNTDOWN,
    countDown: 0,
    disableSms: false,
    url: constant.BASE_URL_CAPTCHA
  }),
  computed: {
    valiPhone() {
      return rules.phone.test(this.sms)
    }
  },
  methods: {
    ...mapActions({
      sendSmsCode: 'common/sendSmsCode'
    }),
    getCode() {
      if (!this.valiPhone) {
        alert(1)
        return
      }
      if (!this.disableSms) {
        this.disableSms = true

        let timer
        this.sendSmsCode({
          tel: this.sms,
          codeType: labelToValue(this.smsType || 'signup', smsTypes)
        })
          .then(res => {
            this.countDown = this.initCountDown
            timer = setInterval(() => {
              this.countDown--
              if (this.countDown === 0) {
                this.disableSms = false
                clearInterval(timer)
              }
            }, 1000)
          })
          .catch(error => {
            clearInterval(timer)
            this.countDown = 0
            this.disableSms = false
            this.$emit('sms:error')
            console.log(error)
          })
      }
    },
    changeImg() {
      this.url = `${constant.BASE_URL_CAPTCHA}?${Math.random()}`
    }
  },
  mounted() {
    this.inputValue = this.value
  }
}
</script>

<style lang="scss">
.base-input {
  // position: relative;
  .v-input__slot {
    border-width: 1px !important;
  }
}
</style>
