import CommonService from '@/services/CommonService'
import { unionBy, groupBy } from 'lodash'

export const state = {
  currentLocation: {},
  currentCity: {},
  areas: [],
  positions: [],
  metroPlatforms: [],
  districts: [],
  commentTags: [],
  specialTags: [],
  datetime: null,
  today: '',
  now: '',
  jumpPages: [],
  families: null
}

export const getters = {
  currentLocation: state => state.currentLocation,
  currentCity: state => state.currentCity,
  areas: state => state.areas,
  positions: state => state.positions,
  jumpPages: state => state.jumpPages,
  families: state => {
    let families = state.families
    if (families) {
      return families.split('|').map(family => {
        return {
          label: family,
          value: family
        }
      })
    } else return []
  },
  groupedPositions: state => {
    let list = groupPosition(state.positions)
    // console.log(JSON.stringify(list, null, 2))
    return list
  },
  metroPlatforms: state => state.metroPlatforms,
  groupdMetroPlatforms: state => groupBy(state.metroPlatforms, 'metroid'),
  districts: state => state.districts,
  commentTags: state => state.commentTags,
  specialTags: state => state.specialTags,
  today: state => {
    if (!state.datetime || state.datetime === 'fetching') return ''
    return state.datetime.trim().split(' ')[0]
  },
  now: state => {
    if (!state.datetime || state.datetime === 'fetching') return ''
    return state.datetime.trim().split(' ')[1]
  }
}

export const mutations = {
  UPDATE_CURRENT_LOCATION(state, location) {
    state.currentLocation = location
  },
  UPDATE_CURRENT_CITY(state, city) {
    state.currentCity = city
  },
  UPDATE_CITIES(state, cities) {
    state.areas = unionBy(cities, state.areas, 'id')
  },
  UPDATE_POSITIONS(state, positions) {
    state.positions = unionBy(positions, state.positions, 'id')
  },
  UPDATE_JUMP_PAGES(state, jumpPages) {
    state.jumpPages = unionBy(jumpPages, state.jumpPages, 'id')
  },
  UPDATE_METRO_PLATFORMS(state, metroPlatforms) {
    state.metroPlatforms = unionBy(metroPlatforms, state.metroPlatforms, 'id')
  },
  UPDATE_DISTRICTS(state, districts) {
    state.districts = unionBy(districts, state.districts, 'id')
  },
  UPDATE_COMMENT_TAGS(state, commentTags) {
    state.commentTags = unionBy(commentTags, state.commentTags, 'id')
  },
  UPDATE_SPECIAL_TAGS(state, specialTags) {
    state.specialTags = unionBy(specialTags, state.specialTags, 'id')
  },
  UPDATE_DATETIME(state, datetime) {
    state.datetime = datetime
  },
  UPDATE_FAMILIES(state, families) {
    state.families = families
  }
}

export const actions = {
  fetchCities({ commit, state }, payload) {
    if (payload) {
      let exist = state.areas.find(area => +area.pid === +payload.pid)
      if (exist) return
    }
    return CommonService.fetchCities(payload).then(res => {
      commit('UPDATE_CITIES', res)
      return res
    })
  },
  fetchPositions({ commit, state }, payload) {
    if (payload) {
      let exist = state.positions.find(position => +position.pid === +payload.pid)
      if (exist) return
    }
    return CommonService.fetchPositions(payload).then(res => {
      commit('UPDATE_POSITIONS', res)
      return res
    })
  },
  fetchMetroPlatforms({ commit, state }, payload) {
    if (payload) {
      let exist = state.metroPlatforms.find(metroPlatform => +metroPlatform.metroid === +payload.metroid)
      if (exist) return
    }
    return CommonService.fetchMetroPlatforms(payload).then(res => {
      commit('UPDATE_METRO_PLATFORMS', res)
      return res
    })
  },
  fetchDistricts({ commit, state }, payload) {
    if (payload) {
      let exist = state.districts.find(district => +district.areaid === +payload.areaid)
      if (exist) return
    }
    return CommonService.fetchDistricts(payload).then(res => {
      commit('UPDATE_DISTRICTS', res)
      return res
    })
  },
  fetchDateTime({ commit, state }) {
    if (state.datetime !== 'fetching') {
      commit('UPDATE_DATETIME', 'fetching')
      return CommonService.fetchDateTime().then(res => {
        commit('UPDATE_DATETIME', res)
        return res
      })
    }
  },
  fetchCommentTags({ commit, state }) {
    return CommonService.fetchCommentTags().then(res => {
      commit('UPDATE_COMMENT_TAGS', res)
      return res
    })
  },
  fetchSpecialTags({ commit, state }, payload) {
    return CommonService.fetchSpecialTags(payload).then(res => {
      commit('UPDATE_SPECIAL_TAGS', res)
      return res
    })
  },
  duibaLogin({ commit, state }) {
    return CommonService.duibaLogin().then(res => {
      return res
    })
  },
  uploadFile({ commit }, payload) {
    return CommonService.uploadFile(payload)
  },
  sendSmsCode({ commit }, payload) {
    return CommonService.sendSmsCode(payload)
  },
  fetchJumpPages({ commit }, payload) {
    return CommonService.fetchJumpPages(payload).then(res => {
      commit('UPDATE_JUMP_PAGES', res)
      return res
    })
  },
  fetchFamilies({ commit }) {
    return CommonService.fetchFamilies().then(res => {
      commit('UPDATE_FAMILIES', res)
      return res
    })
  }
}
const groupPosition = data => {
  if (!(data && data.length)) return []
  let group = Object.entries(groupBy(data, ele => ele.pid))
  let headers = group.find(ele => ele[0] === '0')[1]
  if (!headers) return []
  let groupedList = headers.map(header => {
    let list = group.find(ele => ele[0] === header.id)
    return {
      header,
      list: list ? list[1] : []
    }
  })
  return groupedList
}
