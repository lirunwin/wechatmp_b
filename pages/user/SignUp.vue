<template>
  <v-layout column
            justify-space-between
            class="px-3 primary min-h-100">
    <div class="step">
      <ul class="white--text">
        <li>
          <span :class="step === 1 ? 'white primary--text' : 'primary white--text'">1</span>
          <div>手机验证</div>
        </li>
        <li>
          <span :class="step === 2 ? 'white primary--text' : 'primary white--text'">2</span>
          <div>企业基本信息</div>
        </li>
        <li>
          <span :class="step === 3 ? 'white primary--text' : 'primary white--text'">3</span>
          <div>后台验证</div>
        </li>
      </ul>
    </div>
    <v-form>
      <v-card class="pa-3 my-3">
        <v-layout column
                  class="signup-form">
          <v-flex xs12>
            <base-input color="primary"
                        label="手机号码"></base-input>
          </v-flex>
          <v-flex xs12>
            <base-input color="primary"
                        label="手机验证码"></base-input>
          </v-flex>
          <v-flex xs12>
            <base-input color="primary"
                        label="登录密码"></base-input>
          </v-flex>
          <v-flex xs12>
            <base-input color="primary"
                        small
                        label="确认密码"></base-input>
          </v-flex>
          <v-flex xs12>
            <v-btn color="primary"
                   class="ma-0"
                   large
                   block>立即注册</v-btn>
          </v-flex>
        </v-layout>
        <div class="divider"></div>
        <div class="text-xs-center py-3">
          <span class="primary--text subheading"
                @click="$router.back()">已有账号?立即登录</span>
        </div>
        <div class="error--text">
          一个手机号只能在企业端或学生端选择一个注册哦！如果您想进行账号转换请微信联系懒虫动动客服：tx-130313。
        </div>
      </v-card>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    step: 1
  })
}
</script>

<style lang="scss">
.step {
  padding-top: 3em;
  font-size: 14px;
  // color: $stepper-text-color;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    li {
      text-align: center;
      font-size: 1em;
      position: relative;
      z-index: 1;
      flex: 1;
      // color: $stepper-text-color;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        top: 1em;
        display: block;
        border-bottom: 2px #ffffff solid;
        z-index: -1;
      }
      &:first-of-type {
        flex: 0 0 4em;
        &::before {
          transform: scaleX(0.5);
          transform-origin: right;
        }
      }
      &:last-of-type {
        flex: 0 0 4em;
        &::before {
          transform: scaleX(0.5);
          transform-origin: left;
        }
      }

      div {
        padding-top: 0.5em;
        font-size: 12px;
      }

      span {
        display: inline-block;
        width: 2em;
        height: 2em;
        line-height: 2em;
        text-align: center;
        border-radius: 50%;
        border: $white 1px solid !important;
        // color: $stepper-text-color;
      }

      &.active span {
        // background-color: $stepper-text-color;
        // color: map-get($primary, color);
      }
    }
  }
}
.signup-form {
  transform: scale(0.9);
}
</style>
