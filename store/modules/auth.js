import UserService from '@/services/UserService'
import axios from 'axios'
// import Cookie from 'js-cookie'
// import cookieparser from 'cookieparser'
export const state = {
  currentUser: getSavedState('auth.currentUser')
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  }
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  }
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, payload = {}) {
    // if (getters.loggedIn) {
    //   return dispatch('validate')
    // }

    return UserService.signIn(payload).then(res => {
      console.log(res)
      commit('SET_CURRENT_USER', res)
      return res
    })
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', '')
    UserService.logOut()
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)

    // return axios
    //   .get('/api/session')
    //   .then(response => {
    //     const user = response.data
    //     commit('SET_CURRENT_USER', user)
    //     return user
    //   })
    //   .catch(error => {
    //     if (error.response.status === 401) {
    //       commit('SET_CURRENT_USER', null)
    //     }
    //     return null
    //   })
  },
  nuxtServerInit({ commit }, { req }) {
    let accessToken = null
    // if (req.headers.cookie) {
    //   let parsed = cookieparser.parse(req.headers.cookie)
    //   accessToken = JSON.parse(parsed.auth)
    // }
    commit('SET_CURRENT_USER', accessToken)
  }
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  if (process.browser) {
    return JSON.parse(window.localStorage.getItem(key))
  } else return 'asd'
}

function saveState(key, state) {
  // Cookie.set('auth', state)
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
  console.log(state.currentUser)
  axios.defaults.headers.common.user_author = state.currentUser ? state.currentUser : ''
}
