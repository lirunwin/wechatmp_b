export default {
  // 评价类型
  /******
  EVALTAGE_PART_B2C: {
    text: 'B2C兼职',
    value: 'EVALTAGE_PART_B2C',
    code: 101
  },
  EVALTAGE_PART_C2B: {
    text: 'C2B兼职',
    value: 'EVALTAGE_PART_C2B',
    code: 102
  },
  EVALTAGE_PRACT_B2C: {
    text: 'B2C实习',
    value: 'EVALTAGE_PRACT_B2C',
    code: 103
  },
  EVALTAGE_PRACT_C2B: {
    text: 'C2B实习',
    value: 'EVALTAGE_PRACT_C2B',
    code: 104
  },
  // 提现类型
  WITHDRAW_TYPE_COM: {
    text: '企业提现',
    value: 'WITHDRAW_TYPE_COM',
    code: 301
  },
  WITHDRAW_TYPE_USER: {
    text: '用户提现',
    value: 'WITHDRAW_TYPE_USER',
    code: 302
  },
  // 提现处理
  WITHDRAW_HANDLETYPE_UNHANDLE: {
    text: '未处理',
    value: 'WITHDRAW_HANDLETYPE_UNHANDLE',
    code: 321
  },
  WITHDRAW_HANDLETYPE_SYSTEM: {
    text: '系统处理',
    value: 'WITHDRAW_HANDLETYPE_SYSTEM',
    code: 322
  },
  WITHDRAW_HANDLETYPE_PEOPLE: {
    text: '人工处理',
    value: 'WITHDRAW_HANDLETYPE_PEOPLE',
    code: 323
  },
  WITHDRAW_HANDLETYPE_CANCEL: {
    text: '已取消',
    value: 'WITHDRAW_HANDLETYPE_CANCEL',
    code: 324
  },
  // 付款方式
  PAY_TYPE_CASH: {
    text: '现金',
    value: 'PAY_TYPE_CASH',
    code: 291
  },
  PAY_TYPE_ALIPAY: {
    text: '支付宝',
    value: 'PAY_TYPE_ALIPAY',
    code: 292
  },
  PAY_TYPE_WECHAT: {
    text: '微信',
    value: 'PAY_TYPE_WECHAT',
    code: 293
  },
  PAY_TYPE_BANK: {
    text: '银行',
    value: 'PAY_TYPE_BANK',
    code: 294
  },
  // 工资类型
  FINANCE_TYPE_RECHARGE: {
    text: '充值',
    value: 'FINANCE_TYPE_RECHARGE',
    code: 331
  },
  FINANCE_TYPE_WITHDRAW: {
    text: '提现',
    value: 'FINANCE_TYPE_WITHDRAW',
    code: 332
  },
  FINANCE_TYPE_PLATFORM_RECHARGE: {
    text: '后台充值',
    value: 'FINANCE_TYPE_PLATFORM_RECHARGE',
    code: 333
  },
  FINANCE_TYPE_PLATFORM_DEDUCT: {
    text: '后台扣除',
    value: 'FINANCE_TYPE_PLATFORM_DEDUCT',
    code: 334
  },
  FINANCE_TYPE_SALARY: {
    text: '工资',
    value: 'FINANCE_TYPE_SALARY',
    code: 335
  },
  // 积分类型
  INTEGRA_TYPE_CHARACTERTEST: {
    text: '性格测试',
    value: 'INTEGRA_TYPE_CHARACTERTEST'
  },
  INTEGRA_TYPE_PERFECTRESUME: {
    text: '完善简历',
    value: 'INTEGRA_TYPE_PERFECTRESUME'
  },
  INTEGRA_TYPE_VERIFIED: {
    text: '实名认证',
    value: 'INTEGRA_TYPE_VERIFIED'
  },
  INTEGRA_TYPE_STUDENTVERIFIED: {
    text: '学生认证',
    value: 'INTEGRA_TYPE_STUDENTVERIFIED'
  },
  INTEGRA_TYPE_DAYLOGIN: {
    text: '每日登录',
    value: 'INTEGRA_TYPE_DAYLOGIN'
  },
  INTEGRA_TYPE_EVALUATION: {
    text: '任务评价',
    value: 'INTEGRA_TYPE_EVALUATION'
  },
  INTEGRA_TYPE_TEAMREWARD: {
    text: '战队分配',
    value: 'INTEGRA_TYPE_TEAMREWARD'
  },
  INTEGRA_TYPE_TASKREWARD: {
    text: '任务奖励',
    value: 'INTEGRA_TYPE_TASKREWARD'
  },
  INTEGRA_TYPE_PLATFORMREWARD: {
    text: '平台奖励',
    value: 'INTEGRA_TYPE_PLATFORMREWARD'
  },
  INTEGRA_TYPE_PLATFORMDEDUCTION: {
    text: '平台扣除',
    value: 'INTEGRA_TYPE_PLATFORMDEDUCTION'
  },
  // 战队任务状态
  TEAM_DLLIV_STATUS_RECRUIT: {
    text: '正在招募',
    value: 'TEAM_DLLIV_STATUS_RECRUIT',
    code: 341
  },
  TEAM_DLLIV_STATUS_APPLY: {
    text: '已申请',
    value: 'TEAM_DLLIV_STATUS_APPLY',
    code: 342
  },
  TEAM_DLLIV_STATUS_PASS: {
    text: '申请成功',
    value: 'TEAM_DLLIV_STATUS_PASS',
    code: 343
  },
  TEAM_DLLIV_STATUS_FAIL: {
    text: '申请失败',
    value: 'TEAM_DLLIV_STATUS_FAIL',
    code: 344
  },
  TEAM_DLLIV_STATUS_CANCEL: {
    text: '已取消',
    value: 'TEAM_DLLIV_STATUS_CANCEL',
    code: 345
  },
  TEAM_DLLIV_STATUS_FINISH: {
    text: '已完成',
    value: 'TEAM_DLLIV_STATUS_FINISH',
    code: 346
  },
  // 战队职位
  TEAM_POSITION_MANAGER: {
    text: '管理员',
    value: 'TEAM_POSITION_MANAGER',
    code: 371
  },
  TEAM_POSITION_ASSIST: {
    text: '助理',
    value: 'TEAM_POSITION_ASSIST',
    code: 372
  },
  TEAM_POSITION_MEMBER: {
    text: '队员',
    value: 'TEAM_POSITION_MEMBER',
    code: 373
  },

  // 战队状态
  TEAM_STATUS_WAIT: {
    text: '创建中',
    value: 'TEAM_STATUS_WAIT',
    code: 151
  },
  TEAM_STATUS_SUCCESS: {
    text: '创建成功',
    value: 'TEAM_STATUS_SUCCESS',
    code: 152
  },
  TEAM_STATUS_DISBAND: {
    text: '禁用',
    value: 'TEAM_STATUS_DISBAND',
    code: 153
  },
  // 战队加入权限
  TEAM_PERMISSION_OPEN: {
    text: '公开',
    value: 'TEAM_PERMISSION_OPEN',
    code: 161
  },
  TEAM_PERMISSION_CLOSE: {
    text: '需验证',
    value: 'TEAM_PERMISSION_CHECK',
    code: 162
  },
  //  投诉反馈类型
  FEEDBACK_TYPE_INFO: {
    text: '信息投诉',
    value: 'FEEDBACK_TYPE_INFO',
    code: 191
  },
  FEEDBACK_TYPE_SALARY: {
    text: '工资申诉',
    value: 'FEEDBACK_TYPE_SALARY',
    code: 192
  },
  FEEDBACK_TYPE_SERVICE: {
    text: '客服投诉',
    value: 'FEEDBACK_TYPE_SERVICE',
    code: 193
  },
  FEEDBACK_TYPE_SUGGEST: {
    text: '建议反馈',
    value: 'FEEDBACK_TYPE_SUGGEST',
    code: 194
  },
  //  投诉反馈处理状态
  FEEDBACK_STATUS_UNHANDLE: {
    text: '未处理',
    value: 'FEEDBACK_STATUS_UNHANDLE',
    code: 195
  },
  FEEDBACK_STATUS_HANDLED: {
    text: '已处理',
    value: 'FEEDBACK_STATUS_HANDLED',
    code: 196
  },
  FEEDBACK_STATUS_TRUTH: {
    text: '反馈属实',
    value: 'FEEDBACK_STATUS_TRUTH',
    code: 197
  },
  //  兼职投递状态
  DELIVER_STATUS_WAITCONFIRM: {
    text: '待确认',
    value: 'DELIVER_STATUS_WAITCONFIRM',
    code: 251
  },
  DELIVER_STATUS_REFUSED: {
    text: '已拒绝',
    value: 'DELIVER_STATUS_REFUSED',
    code: 252
  },
  DELIVER_STATUS_PASS: {
    text: '已通过',
    value: 'DELIVER_STATUS_PASS',
    code: 253
  },
  DELIVER_STATUS_FINISH: {
    text: '已完成',
    value: 'DELIVER_STATUS_FINISH',
    code: 254
  },
  DELIVER_STATUS_CANCEL: {
    text: '已取消',
    value: 'DELIVER_STATUS_CANCEL',
    code: 255
  },

  DELIVER_TYPE_USER: {
    text: '用户申请',
    value: 'DELIVER_TYPE_USER',
    code: 261
  },
  DELIVER_TYPE_COM: {
    text: '企业邀请',
    value: 'DELIVER_TYPE_COM',
    code: 262
  },
  DELIVER_TYPE_TEAM: {
    text: '战队报名',
    value: 'DELIVER_TYPE_TEAM',
    code: 263
  },
  DELIVER_TYPE_MATCH: {
    text: '任务搭配',
    value: 'DELIVER_TYPE_MATCH',
    code: 264
  },

  BASE_WAGE_HOURE: {
    text: '小时',
    value: 'BASE_WAGE_HOURE',
    code: 141
  },
  BASE_WAGE_DAY: {
    text: '天',
    value: 'BASE_WAGE_DAY',
    code: 142
  },
  BASE_WAGE_MONTH: {
    text: '月',
    value: 'BASE_WAGE_MONTH',
    code: 143
  },

  WAGE_MODE_BASIC: {
    text: '基本工资',
    value: 'WAGE_MODE_BASIC',
    code: 131
  },
  WAGE_MODE_COMMISSION: {
    text: '提成',
    value: 'WAGE_MODE_COMMISSION',
    code: 132
  },
  WAGE_MODE_BASICCOMMISSION: {
    text: '底薪加提成',
    value: 'WAGE_MODE_BASICCOMMISSION',
    code: 132
  },

  WAGE_CLEARING_DAY: {
    text: '日结',
    value: 'WAGE_CLEARING_DAY',
    code: 121
  },
  WAGE_CLEARING_WEEK: {
    text: '周结',
    value: 'WAGE_CLEARING_WEEK',
    code: 122
  },
  WAGE_CLEARING_MONTH: {
    text: '月结',
    value: 'WAGE_CLEARING_MONTH',
    code: 123
  },

  RECRUITMENT_PARTTIME: {
    text: '兼职',
    value: 'RECRUITMENT_PARTTIME',
    code: 91
  },
  RECRUITMENT_PRACTICE: {
    text: '实习',
    value: 'RECRUITMENT_PRACTICE',
    code: 92
  },

  // 学历
  EDUCATION_LEVEL_1: {
    text: '小学及小学以下',
    value: 'EDUCATION_LEVEL_1',
    code: 311
  },
  EDUCATION_LEVEL_2: {
    text: '初中/中专',
    value: 'EDUCATION_LEVEL_2',
    code: 312
  },
  EDUCATION_LEVEL_3: {
    text: '高中/高职',
    value: 'EDUCATION_LEVEL_3',
    code: 313
  },
  EDUCATION_LEVEL_4: {
    text: '大学专科',
    value: 'EDUCATION_LEVEL_4',
    code: 314
  },
  EDUCATION_LEVEL_5: {
    text: '大学本科',
    value: 'EDUCATION_LEVEL_5',
    code: 315
  },
  EDUCATION_LEVEL_6: {
    text: '硕士研究生',
    value: 'EDUCATION_LEVEL_6',
    code: 316
  },
  EDUCATION_LEVEL_7: {
    text: '博士及以上',
    value: 'EDUCATION_LEVEL_7',
    code: 317
  },

  PARTTIME_JOB_STATUS_NEW: {
    text: '发布待审核',
    value: 'PARTTIME_JOB_STATUS_NEW',
    code: 241
  },
  PARTTIME_JOB_STATUS_PASS: {
    text: '审核通过',
    value: 'PARTTIME_JOB_STATUS_PASS',
    code: 242
  },
  PARTTIME_JOB_STATUS_UNPASS: {
    text: '审核不通过',
    value: 'PARTTIME_JOB_STATUS_UNPASS',
    code: 243
  },
  PARTTIME_JOB_STATUS_FINISH: {
    text: '完成招募',
    value: 'PARTTIME_JOB_STATUS_FINISH',
    code: 244
  },
  PARTTIME_JOB_STATUS_OFFLINE: {
    text: '已取消',
    value: 'PARTTIME_JOB_STATUS_OFFLINE',
    code: 245
  },
  CHECK_AWAIT: {
    text: '待审核',
    value: 'CHECK_AWAIT',
    code: 81
  },
  CHECK_OK: {
    text: '审核通过',
    value: 'CHECK_OK',
    code: 82
  },
  CHECK_FAIL: {
    text: '审核失败',
    value: 'CHECK_FAIL',
    code: 83
  },
  COM_LEVEL_GENERAL: {
    text: '一般企业',
    value: 'COM_LEVEL_GENERAL',
    code: 171
  },
  COM_LEVEL_VIP: {
    text: 'VIP企业',
    value: 'COM_LEVEL_VIP',
    code: 172
  },
  COMP_STATUS_NEW: {
    text: '新入驻',
    value: 'COMP_STATUS_NEW',
    code: 71
  },
  COMP_STATUS_NORMAL: {
    text: '正常',
    value: 'COMP_STATUS_NORMAL',
    code: 72
  },
  COMP_STATUS_CHANGE: {
    text: '信息变更中',
    value: 'COMP_STATUS_CHANGE',
    code: 73
  },
  COMP_STATUS_NEW_CHECK_FAIL: {
    text: '入驻审核失败',
    value: 'COMP_STATUS_NEW_CHECK_FAIL',
    code: 74
  },
  COMP_STATUS_CHANGE_CHECK_FAIL: {
    text: '变更审核失败',
    value: 'COMP_STATUS_CHANGE_CHECK_FAIL',
    code: 75
  },
  COM_NATURE_1: {
    text: '国有企业',
    value: 'COM_NATURE_1',
    code: 211
  },
  COM_NATURE_2: {
    text: '集体企业',
    value: 'COM_NATURE_2',
    code: 212
  },
  COM_NATURE_3: {
    text: '有限责任公司',
    value: 'COM_NATURE_3',
    code: 213
  },
  COM_NATURE_4: {
    text: '股份有限公司',
    value: 'COM_NATURE_4',
    code: 214
  },
  COM_NATURE_5: {
    text: '私营企业',
    value: 'COM_NATURE_5',
    code: 215
  },
  COM_NATURE_6: {
    text: '中外合资企业',
    value: 'COM_NATURE_6',
    code: 216
  },
  COM_NATURE_7: {
    text: '外商投资企业',
    value: 'COM_NATURE_7',
    code: 217
  },
  LINK_UPP_LPAGE: {
    text: '用户端引导页',
    value: 'LINK_UPP_LPAGE',
    code: 311
  },
  LINK_UPP_BANNER: {
    text: '用户端banner',
    value: 'LINK_UPP_BANNER',
    code: 312
  },
  LINK_CPP_LPAGE: {
    text: '企业端引导页',
    value: 'LINK_CPP_LPAGE',
    code: 313
  },
  LINK_CPP_BANNER: {
    text: '企业端banner',
    value: 'LINK_CPP_BANNER',
    code: 314
  },
  LINK_WEB_PARTNER: {
    text: '合作伙伴',
    value: 'LINK_WEB_PARTNER',
    code: 315
  },
  LINK_TEAM_BANNER: {
    text: '战队介绍',
    value: 'LINK_TEAM_BANNER',
    code: 316
  },

  DATA_NORMAL: {
    text: '正常',
    value: 'DATA_NORMAL',
    code: 1
  },
  DATA_DISABLED: {
    text: '停用',
    value: 'DATA_DISABLED',
    code: 2
  },
  DATA_DELETED: {
    text: '删除',
    value: 'DATA_DELETED',
    code: 3
  },
  ADMIN: {
    text: '系统管理员',
    value: 'ADMIN'
  },
  USER_B: {
    text: '企业用户',
    value: 'USER_B'
  },
  USER_C: {
    text: '注册用户',
    value: 'USER_C'
  },

  // gender
  SEX_BOY: {
    text: '男',
    value: 'SEX_BOY'
  },
  SEX_GIRL: {
    text: '女',
    value: 'SEX_GIRL'
  },
  SEX_SECRET: {
    text: '保密',
    value: 'SEX_SECRET'
  },
  IDENTITY_STUDENT: {
    text: '学生',
    value: 'IDENTITY_STUDENT'
  },
  IDENTITY_OTHER: {
    text: '其它',
    value: 'IDENTITY_OTHER'
  }  *****/
}
const gender = [{ name: 'male', label: '男', value: 'SEX_BOY' }, { name: 'female', label: '女', value: 'SEX_GIRL' }]
const eduList = [
  // { name: 'EDUCATION_LEVEL_0', label: '不限学历', value: 0 },
  { name: 'EDUCATION_LEVEL_1', label: '小学及小学以下', value: 311 },
  { name: 'EDUCATION_LEVEL_2', label: '初中/中专', value: 312 },
  { name: 'EDUCATION_LEVEL_3', label: '高中/高职', value: 313 },
  { name: 'EDUCATION_LEVEL_4', label: '大学专科', value: 314 },
  { name: 'EDUCATION_LEVEL_5', label: '大学本科', value: 315 },
  { name: 'EDUCATION_LEVEL_6', label: '硕士研究生', value: 316 },
  { name: 'EDUCATION_LEVEL_7', label: '博士及以上', value: 317 }
]
const identity = [
  { name: 'student', label: '学生', value: 'IDENTITY_STUDENT' },
  { name: 'other', label: '非学生', value: 'IDENTITY_OTHER' }
]
const collectionTypes = [
  { name: 'job', label: '兼职', value: 'COLLECTION_TYPE_PARTTIME' },
  { name: 'corp', label: '企业', value: 'COLLECTION_TYPE_COMPANY' }
]
const jobTypes = [
  { name: 'parttime', label: '兼职', value: 'RECRUITMENT_PARTTIME' },
  { name: 'train', label: '实习', value: 'RECRUITMENT_PRACTICE' }
]
const expTypes = [
  { name: 'parttime', label: '兼职', value: 'WORK_TYPE_PARTTIME' },
  { name: 'trian', label: '实习', value: 'WORK_TYPE_PRACTICE' },
  { name: 'fulltime', label: '全职', value: 'WORK_TYPE_FULLTIME' }
]
const jobOrderBy = [
  { name: 'default', label: '默认发布', value: '' },
  { name: 'newest', label: '最新发布', value: 'newest' },
  { name: 'salary', label: '工资最高', value: 'salary' },
  { name: 'distance', label: '距离最近', value: 'distance' },
  { name: 'integral', label: '积分最高', value: 'integral' }
]

const salaryTypes = [
  { name: 'basic', label: '基本工资', value: 'WAGE_MODE_BASIC' },
  { name: 'bonus', label: '提成', value: 'WAGE_MODE_COMMISSION' },
  { name: 'both', label: '底薪加提成', value: 'WAGE_MODE_BASICCOMMISSION' }
]

const paymentTypes = [
  { name: 'day', label: '日结', value: 'WAGE_CLEARING_DAY' },
  { name: 'week', label: '周结', value: 'WAGE_CLEARING_WEEK' },
  { name: 'month', label: '月结', value: 'WAGE_CLEARING_MONTH' }
]

const paymentPlatforms = [
  { name: 'platform', label: '平台代发', value: 'WAGE_GIVE_PLATFORM' },
  { name: 'company', label: '公司发放', value: 'WAGE_GIVE_COMPANY' }
]

const applyTypes = [
  { name: 'user', label: '用户申请', label2: '报名', value: 'DELIVER_TYPE_USER' },
  { name: 'team', label: '战队报名', label2: '战队', value: 'DELIVER_TYPE_TEAM' },
  { name: 'company', label: '企业邀请', label2: '邀请', value: 'DELIVER_TYPE_COM' },
  { name: 'match', label: '任务搭配', label2: '搭配', value: 'DELIVER_TYPE_MATCH' }
]

const loginTypes = [
  { name: 'account', label: '密码登录', value: 'LOGIN_PASSWORD' },
  { name: 'mobile', label: '手机登录', value: 'LOGIN_TELCODE' },
  { name: 'signature', label: '签名登录', value: 'LOGIN_SIGNATURE' }
]

const smsTypes = [
  { name: 'signup', label: '用户注册', value: 'SMS_CODE_REGISTER' },
  { name: 'signin', label: '手机登录', value: 'SMS_CODE_LOGIN' },
  { name: 'reset', label: '修改手机号', value: 'SMS_CODE_SETNEWTEL' },
  { name: 'check', label: '手机安全验证', value: 'SMS_CODE_TELVELID' },
  { name: 'funevent', label: '体验师预约', value: 'SMS_CODE_RESERVATION' }
]

const applyStatuses = [
  { name: 'confirm', label: '待确认', value: 'DELIVER_STATUS_WAITCONFIRM' },
  { name: 'reject', label: '已拒绝', value: 'DELIVER_STATUS_REFUSED' },
  { name: 'pass', label: '已通过', value: 'DELIVER_STATUS_PASS' },
  { name: 'done', label: '已完成', value: 'DELIVER_STATUS_FINISH' },
  { name: 'cancel', label: '已取消', value: 'DELIVER_STATUS_CANCEL' }
]

const teamMissionApplyStatuses = [
  { name: 'recuiting', label: '正在招募', value: 'TEAM_DLLIV_STATUS_RECRUIT' },
  { name: 'confirm', label: '已申请', value: 'TEAM_DLLIV_STATUS_APPLY' },
  { name: 'pass', label: '申请成功', value: 'TEAM_DLLIV_STATUS_PASS' },
  { name: 'reject', label: '申请失败', value: 'TEAM_DLLIV_STATUS_FAIL' },
  { name: 'cancel', label: '已取消', value: 'TEAM_DLLIV_STATUS_CANCEL' },
  { name: 'done', label: '已完成', value: 'TEAM_DLLIV_STATUS_FINISH' }
]
const missionCheckTypes = [
  { name: 'checkin', label: '上班签到', value: 'UP_SIGNIN' },
  { name: 'checkout', label: '下班签到', value: 'DOWN_SIGNIN' },
  { name: 'overdue', label: '不在签到时间', value: 'OUT_SIGNIN_DATE' }
]
const orderStatuses = [
  { name: 'confrim', label: '等待验收', value: 'ACCEPTANCE_STATUS_WAITING' },
  { name: 'pass', label: '验收通过', value: 'ACCEPTANCE_STATUS_PASS' },
  { name: 'reject', label: '验收未通过', value: 'ACCEPTANCE_STATUS_DENY' },
  { name: 'done', label: '已生成工资', value: 'ACCEPTANCE_STATUS_SALARY' }
]

const commentTypes = [
  { name: 'b2cParttime', label: 'B2C兼职', value: 'EVALTAGE_PART_B2C' },
  { name: 'c2bParttime', label: 'C2B兼职', value: 'EVALTAGE_PART_C2B' },
  { name: 'b2cTrain', label: 'B2C实习', value: 'EVALTAGE_PRACT_B2C' },
  { name: 'c2bTrain', label: 'C2B实习', value: 'EVALTAGE_PRACT_C2B' }
]
const messageTypes = [
  { name: 'mission', label: '任务通知', value: 'task' },
  { name: 'apply', label: '申请确认', value: 'apply' },
  { name: 'team', label: '战队消息', value: 'team' },
  { name: 'system', label: '系统消息', value: 'system' },
  { name: 'feedback', label: '投诉反馈', value: 'feedback' }
]
const feedbackTypes = [
  { name: 'info', label: '信息投诉', value: 'FEEDBACK_TYPE_INFO' },
  { name: 'salary', label: '工资申诉', value: 'FEEDBACK_TYPE_SALARY' },
  { name: 'customService', label: '客服投诉', value: 'FEEDBACK_TYPE_SERVICE' },
  { name: 'suggest', label: '建议反馈', value: 'FEEDBACK_TYPE_SUGGEST' }
]
const teamRoles = [
  { name: 'manager', label: '助理', value: 'TEAM_POSITION_ASSIST' },
  { name: 'owner', label: '管理员', value: 'TEAM_POSITION_MANAGER' },
  { name: 'member', label: '队员', value: 'TEAM_POSITION_MEMBER' }
]

const teamInvitationHandlerTypes = [
  { name: 'accept', label: '通过', value: 'TEAM_APPLYFOR_STATUS_PASS' },
  { name: 'reject', label: '拒绝', value: 'TEAM_APPLYFOR_STATUS_DENY' }
]
const teamPermissionTypes = [
  { name: 'open', label: '公开', value: 'TEAM_PERMISSION_OPEN' },
  { name: 'check', label: '确认验证', value: 'TEAM_PERMISSION_CHECK' },
  { name: 'close', label: '拒绝加入', value: 'TEAM_PERMISSION_CLOSE' }
]
const teamApplicationHandleTypes = [
  { name: 'accept', label: '通过', value: 'TEAM_APPLYFOR_STATUS_PASS' },
  { name: 'reject', label: '拒绝', value: 'TEAM_APPLYFOR_STATUS_DENY' }
]
const funStatusTypes = [
  { name: 'confirm', label: '待确认', value: 'EXPERIENCE_RESERVATION_AWAIT' },
  { name: 'success', label: '预约成功', value: 'EXPERIENCE_RESERVATION_SUCCESS' },
  { name: 'fail', label: '预约失败', value: 'EXPERIENCE_RESERVATION_FAIL' },
  { name: 'done', label: '已完成', value: 'EXPERIENCE_RESERVATION_END' },
  { name: 'overdue', label: '过期', value: 'EXPERIENCE_RESERVATION_EXPIRED' },
  { name: 'new', label: '新投递', value: 'EXPERIENCE_APPLY_NEW' },
  { name: 'reject', label: '被拒绝', value: 'EXPERIENCE_APPLY_REFUSED' },
  { name: 'accept', label: '已接受', value: 'EXPERIENCE_APPLY_ACCEPT' },
  { name: 'finish', label: '已完成', value: 'EXPERIENCE_APPLY_COMPLETE' },
  { name: 'cancel', label: '已取消', value: 'EXPERIENCE_APPLY_CANCEL' }
]

const teamStatuses = [
  { name: 'confirm', label: '创建中', value: 'TEAM_STATUS_WAIT' },
  { name: 'normal', label: '创建成功', value: 'TEAM_STATUS_SUCCESS' },
  { name: 'disable', label: '已禁用', value: 'TEAM_STATUS_DISBAND' }
]
const teamApplyStatuses = [
  { name: 'confirm', label: '未处理', value: 'TEAM_APPLYFOR_STATUS_WAIT' },
  { name: 'pass', label: '已通过', value: 'TEAM_APPLYFOR_STATUS_PASS' },
  { name: 'reject', label: '未通过', value: 'TEAM_APPLYFOR_STATUS_DENY' },
  { name: 'overdue', label: '已失效', value: 'TEAM_APPLYFOR_STATUS_NOUSE' }
]

const teamApplyTypes = [
  { name: 'create', label: '战队签名', value: 'TEAM_APPLYFOR_TYPE_CREATE' },
  { name: 'invite', label: '入队邀请', value: 'TEAM_APPLYFOR_TYPE_INVITE' },
  { name: 'apply', label: '申请入队', value: 'TEAM_APPLYFOR_TYPE_JOIN' }
]

const jumpPageTypes = [
  { name: 'guide', label: '用户端引导页', value: 'LINK_UPP_LPAGE' },
  { name: 'banner', label: '用户端banner', value: 'LINK_UPP_BANNER' },
  { name: 'guideForCorp', label: '企业端引导页', value: 'LINK_CPP_LPAGE' },
  { name: 'bannerForCorp', label: '企业端banner', value: 'LINK_CPP_BANNER' },
  { name: 'partner', label: '合作伙伴', value: 'LINK_WEB_PARTNER' },
  { name: 'teamIntro', label: '战队介绍banner', value: 'LINK_TEAM_BANNER' },
  { name: 'funEvents', label: '趣味体验', value: 'LINK_UPP_EXPERIENCE' }
]
const identityCheckStatuses = [
  { name: 'confirm', label: '待审核', value: 'CHECK_AWAIT' },
  { name: 'pass', label: '审核通过', value: 'CHECK_OK' },
  { name: 'reject', label: '审核失败', value: 'CHECK_FAIL' },
  { name: 'overdue', label: '已过期', value: 'CHECK_OUTDATE' }
]
const areaStatuses = [{ name: 'open', label: '开启', value: 'OPEN' }, { name: 'close', label: '关闭', value: 'CLOSE' }]

const partTimeJobStatuses = [
  { name: 'confirm', label: '发布待审核', value: 'PARTTIME_JOB_STATUS_NEW' },
  { name: 'pass', label: '审核通过', value: 'PARTTIME_JOB_STATUS_PASS' },
  { name: 'reject', label: '审核不通过', value: 'PARTTIME_JOB_STATUS_UNPASS' },
  { name: 'done', label: '完成招募', value: 'PARTTIME_JOB_STATUS_FINISH' },
  { name: 'cancel', label: '已取消', value: 'PARTTIME_JOB_STATUS_OFFLINE' }
]
const units = [
  { name: 'hour', label: '小时', value: 'BASE_WAGE_HOURE' },
  { name: 'day', label: '天', value: 'BASE_WAGE_DAY' },
  { name: 'month', label: '月', value: 'BASE_WAGE_MONTH' }
]
export {
  gender,
  eduList,
  identity,
  collectionTypes,
  jobTypes,
  jobOrderBy,
  salaryTypes,
  paymentTypes,
  paymentPlatforms,
  applyTypes,
  loginTypes,
  smsTypes,
  applyStatuses,
  missionCheckTypes,
  orderStatuses,
  commentTypes,
  messageTypes,
  feedbackTypes,
  teamRoles,
  teamMissionApplyStatuses,
  teamInvitationHandlerTypes,
  teamPermissionTypes,
  teamApplicationHandleTypes,
  teamApplyStatuses,
  teamApplyTypes,
  funStatusTypes,
  teamStatuses,
  jumpPageTypes,
  identityCheckStatuses,
  expTypes,
  areaStatuses,
  partTimeJobStatuses,
  units
}
