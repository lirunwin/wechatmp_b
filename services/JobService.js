import axios from 'axios'
import constant from '@const/public'
const DEFAULT_PAGESIZE = constant.DEFAULT_PAGESIZE
const msg = { msg: '操作成功' }
export default {
  // 获取工作列表
  fetchJobs: (data = DEFAULT_PAGESIZE) => axios.post('job/search', data),
  fetchJob: data => axios.post('job/detail', data),
  addToJobCollection: data => axios.post('job/collection', data, msg),
  addToCorpCollection: data => axios.post('job/company/toCollection', data, msg),
  fetchRecommendJobs: data => axios.post('job/sameJob', data),
  fetchCompanyInfo: data => axios.post('job/companyInfo', data),
  applyJob: data => axios.post('parttimeApply/add', data, msg),
  fetchHotKeywords: () => axios.post('job/search/hot'),
  fetchSearchHistory: () => axios.post('job/search/history'),
  fetchPackageJobs: data => axios.post('customize/findJob', data),
  applyPackageJobs: data => axios.post('customize/batchApply', data)
}
