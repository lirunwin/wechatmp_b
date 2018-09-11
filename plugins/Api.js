import axios from 'axios'
import config from '@const/public'

export default ({ app, store, router, redirect }) => {
  axios.defaults.baseURL = config.BASE_URL
  axios.defaults.timeout = 30 * 1000
  axios.defaults.headers.common['x-requested-with'] = 'WX_APPLETS_JOBUSER'
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      // console.log(axios.interceptors.request)
      // console.log(config)
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    response => {
      // console.log({ response })
      // TODO: some auth stuff
      let code = +response.data.code
      if (code === 4000004) {
        redirect('/user/signIn')
        return Promise.reject(response.data)
      } else if (code === 4000009) {
        store.dispatch('sys/showSnackbar', { msg: response.data.msg, color: 'error' })
        redirect('/user/certification')
        return Promise.reject(response.data)
      } else if (code !== 1) {
        store.dispatch('sys/showSnackbar', {
          msg: response.data.msg || response.data,
          color: 'error'
        })
        return Promise.reject(response.data)
      }
      let data = response.data.data
      let msg = response.config.msg
      if (msg) {
        store.dispatch('sys/showSnackbar', { msg, color: 'primary' })
      }
      return data
    },
    error => {
      store.dispatch('sys/showSnackbar', {
        msg: '网络似乎出现了问题，请稍后再试。',
        color: 'error'
      })
      return Promise.reject(error)
    }
  )
}
