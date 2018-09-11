import config from '../config'
const AVATAR = '/upload/default/user.png'
export default {
  BASE_URL: config.BASE_URL,
  BASE_URL_CAPTCHA: config.BASE_URL + 'jobuser/getVerifyCode',
  AMAP_KEY: config.AMAP_KEY,
  SMS_COUNTDOWN: 90,
  MAX_IMAGES_UPLOAD: 5,
  CUSTOM_SERVICE_TEL: '02882674077',
  DATE_PICKER_MIN_DATE: '1949-10-01',
  DATE_PICKER_MAX_DATE: new Date().toISOString().substr(0, 10),
  DEFAULT_PAGESIZE: {
    pagesize: 20,
    pageindex: 1
  },
  DEFAULT_PAGE_SIZE: 10,
  AVATAR: config.BASE_URL + AVATAR,
  TEAM_CREATE_MIN_MEMBER: 2,
  FUN_EVENT_COMMENT_MIN_LETTER_LENGTH: 80,
  FUN_EVENT_FEEDBACK_MIN_LETTER_LENGTH: 80,
  PREFERENCE_MAX_REGION: 3
}
