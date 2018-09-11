import axios from 'axios'
const msg = { msg: '操作成功' }
export default {
  signIn: data => axios.post('jobuser/login', data),
  //
  signUp: data => axios.post('jobuser/register', data),
  //
  logOut: () => axios.post('jobuser/logout', {}),

  // center页面信息
  fetchBaseInfo: data => axios.post('jobuser/center', data),

  // 用户认证信息
  fetchCertification: data => axios.post('jobuser/verify', data),

  // 身份证认证
  identifyByIdCard: data => axios.post('jobuser/verify/idcard', data, msg),

  // 学生证认证
  identifyByStudentCard: data => axios.post('jobuser/verify/student', data, msg),

  // 收藏明细
  fetchCollections: data => axios.post('jobuser/collection', data),

  // 删除收藏
  deleteCollection: data => axios.post('jobuser/collection/delete', data, msg),

  // 浏览记录
  fetchHistories: data => axios.post('jobuser/history', data),

  // 用户评价
  fetchComments: data => axios.post('jobuser/evaluation', data),

  // 信誉记录
  fetchScoreLog: data => axios.post('jobuser/reputation', data),

  // 积分记录
  fetchPointsLog: data => axios.post('jobuser/integral', data),

  // 钱包记录
  fetchWalletLog: data => axios.post('jobuser/money', data),

  // 用户经验值
  fetchExpLog: data => axios.post('jobuser/experience', data),

  // 投诉建议
  fetchFeedBack: data => axios.post('jobuser/platform/add', data),

  // 用户申述
  fetchCharges: data => axios.post('jobuser/company/add', data),

  // 简历信息
  fetchResume: () => axios.post('jobuser/resume'),

  // 修改基本信息
  updateUserBaseInfo: data => axios.post('jobuser/updateUserInfo', data, msg),
  updateUserContacts: data => axios.post('jobuser/addCommunication', data, msg),
  updateUserEducation: data => axios.post('jobuser/addEducation', data, msg),

  updateUserJobExp: data => axios.post('jobuser/addWork', data, msg),
  deleteUserJobExp: data => axios.post('jobuser/deleteWork', data, msg), // 没有接口

  updateUserAbout: data => axios.post('jobuser/addSelfEvaluation', data, msg),
  updateUserSkill: data => axios.post('jobuser/addAbility', data, msg),
  updatePreference: data => axios.post('customize/add', data, msg),
  fetchPreference: () => axios.post('customize/query'),

  // 领取经验
  collectExp: data => axios.post('jobuser/experience/receive', data, msg),

  // 领取积分
  collectPoints: data => axios.post('jobuser/integral/receive', data, msg),
  platformFeedback: data => axios.post('feedback/platform/add', data, msg),
  companyFeedback: data => axios.post('feedback/company/add', data, msg),

  withdraw: data => axios.post('jobuser/withdraw/apply', data, msg),

  // 登陆状态修改密码
  updataPassword: data => axios.post('jobuser/updatePassword', data, msg),
  // 修改登录手机号
  changePhone: data => axios.post('jobuser/newTel', data, msg)
}
