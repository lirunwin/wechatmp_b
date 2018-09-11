import axios from 'axios'
export default {
  fetchCities: (params = { pid: 0 }) => axios.get('common/getArea', { params }),
  fetchPositions: data => axios.post('common/getPosition', data),
  fetchMetroPlatforms: data => axios.post('common/getMetroplat', data),
  fetchDistricts: data => axios.post('common/getDistrict', data),
  fetchDateTime: () => axios.post('common/getDateTime'),
  fetchCommentTags: () => axios.post('common/getEvaluationTag'),
  fetchSpecialTags: data => axios.post('common/getFeatureTag', data),
  duibaLogin: () => axios.post('duiba/login'),
  uploadFile: data => axios.post('common/upload', data),
  sendSmsCode: data => axios.post('jobuser/getTelCode', data),
  fetchMissionTags: () => axios.post('common/getTaskTag'),
  fetchJumpPages: data => axios.post('common/basisLine', data),
  fetchFamilies: () => axios.post('common/family')
}
