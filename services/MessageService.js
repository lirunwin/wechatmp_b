import axios from 'axios'

export default {
  fetchMsgs: data => axios.post('jobuser/message', data)
}
