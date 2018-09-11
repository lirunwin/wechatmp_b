import axios from 'axios'
const msg = { msg: '操作成功' }

export default {
  fetchFunEvents: data => axios.post('experience/inRecruit', data),
  fetchFunEventDetail: data => axios.post('experience/detail', data),
  applyFunEvent: data => axios.post('experience/apply', data, msg),
  fetchAppliedFunEvents: data => axios.post('experience/myApply', data),
  reserveFunEvent: data => axios.post('experience/myApply/book', data, msg),
  fetchComments: data => axios.post('experience/myEvaluation', data),
  addComment: data => axios.post('experience/myEvaluation/add', data, msg)
}
