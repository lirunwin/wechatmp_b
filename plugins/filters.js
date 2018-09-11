import Vue from 'vue'
import { valueToLabel, formatTime } from '@helper'
import { units } from '@const'
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('valueToLabel', valueToLabel)

Vue.filter('monthToCh', function(value) {
  if (!value) return ''
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = value.trim().split(/\D/)
  if (year === +date[0] && month === +date[1]) return '本月'
  if (year !== +date[0]) return +date[0] + '年' + +date[1] + '月'
  else return +date[1] + '月'
})

Vue.filter('formatDistance', function(value) {
  if (!(value > 0)) return '未知'
  if (value > 999) return Math.round((value / 1000) * 100) / 100 + 'km'
  return value + 'm'
})

Vue.filter('starPhoneNumber', phoneNumber => {
  return !phoneNumber || phoneNumber === ''
    ? ''
    : phoneNumber.substring(0, 3) + '****' + phoneNumber.substring(7, phoneNumber.length)
})

Vue.filter('formatNumberTime', function(time) {
  if (time > 99 && time < 1000) {
    time = time + ''
    return `0${time.substr(0, 1)}:${time.substr(1, 2)}`
  } else if (time > 999 && time < 2400) {
    time = time + ''
    return `${time.substr(0, 2)}:${time.substr(2, 3)}`
  } else if (time === 2400) {
    return '00:00'
  }
  return time
})
Vue.filter('formatDateTime', formatTime)
Vue.filter('formatWorkHours', (val, unit) => {
  unit = units.find(item => item.value === unit)
  if (unit.name === 'hour') {
    return `${Math.floor(val / 60)}小时${val % 60}分`
  } else {
    return `${val}${unit.label}`
  }
})
// function (type, day) {
//   try {
//   //月结
//   if(type==GlobalEnumType.WAGE_CLEARING_MONTH.value){
//       return '每月'+day+'日';
//   }
//   //周结
//   else if(type==GlobalEnumType.WAGE_CLEARING_WEEK.value){
//       var week=['','星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
//       return '每周'+week[day];
//   }
//   //日结
//   else if(type==GlobalEnumType.WAGE_CLEARING_DAY.value){
//       return '日结'
//   }
//   }
//   catch(e) {
//       console.error(e);
//       return type+':'+day;
//   }
// },
