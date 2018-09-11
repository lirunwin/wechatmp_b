export const state = {
  meta: null,
  snackbar: {
    show: false,
    msg: ''
  },
  deviceInfo: null,
  wechatLoginCode: null,
  wechatUserInfo: null
}

export const getters = {
  meta: state => state.meta,
  snackbar: state => state.snackbar,
  deviceInfo: state => state.deviceInfo,
  wechatLoginCode: state => state.wechatLoginCode,
  wechatUserInfo: state => state.wechatUserInfo
}

export const mutations = {
  SET_META(state, newMeta) {
    state.meta = newMeta[0]
  },
  SET_SNACKBAR(state, snackbar) {
    if (typeof snackbar === 'string') {
      state.snackbar = { show: true, msg: snackbar }
    } else {
      snackbar.show = true
      state.snackbar = snackbar
    }
  },
  RESET_SNAKBAR(state) {
    state.snackbar = { show: false, msg: '' }
  },
  SET_DEVICE_INFO(state, deviceInfo) {
    state.deviceInfo = deviceInfo
  },
  SET_WECHAT_LOGIN_CODE(state, wechatLoginCode) {
    state.wechatLoginCode = wechatLoginCode
  },
  SET_WECHAT_USER_INFO(state, wechatUserInfo) {
    state.wechatUserInfo = wechatUserInfo
  }
}

export const actions = {
  showSnackbar({ commit }, payload) {
    commit('RESET_SNAKBAR')
    commit('SET_SNACKBAR', payload)
  }
}
