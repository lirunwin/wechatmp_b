import JobService from '@/services/JobService'
import { unionBy } from 'lodash'
export const state = {
  jobs: [],
  hotKeywords: [],
  searchHistories: [],
  packageJobs: null,
  checkedRecommendJobs: [],
  checkedRecommendIds: [],
  recommendDateSetting: null
}

export const getters = {
  jobs: state => state.jobs,
  hotKeywords: state => state.hotKeywords,
  searchHistories: state => state.searchHistories,
  recommendJobs: state => state.searchHistories,
  packageJobs: state => state.packageJobs,
  checkedRecommendJobs: state => state.checkedRecommendJobs,
  checkedRecommendIds: state => state.checkedRecommendIds,
  recommendDateSetting: state => state.recommendDateSetting
}

export const mutations = {
  UPDATE_JOBS(state, jobs) {
    // state.jobs = unionBy(jobs, state.jobs, 'recruitmentId')
    state.jobs = state.jobs.concat(jobs)
    // console.log(JSON.stringify(state.jobs, null, 2))
  },
  RESET_JOBS(state, jobs) {
    state.jobs = []
  },
  UPDATE_HOT_KEYWORDS(state, hotKeywords) {
    state.hotKeywords = unionBy(hotKeywords, state.hotKeywords, 'recruitmentId')
  },
  UPDATE_SEARCH_HISTORIES(state, searchHistories) {
    state.searchHistories = unionBy(searchHistories, state.searchHistories, 'recruitmentId')
  },
  UPDATE_PACKAGE_JOBS(state, jobs) {
    state.packageJobs = jobs
  },
  UPDATE_CHECKED_RECOMMEND_JOBS(state, jobs) {
    state.checkedRecommendJobs = jobs
  },
  RESET_CHECKED_RECOMMEND_JOBS(state) {
    state.packageJobs = []
  },
  UPDATE_CHECKED_RECOMMEND_IDS(state, ids) {
    state.checkedRecommendIds = ids
  },
  RESET_CHECKED_RECOMMEND_IDS(state) {
    state.packageJobs = []
  },
  UPDATE_RECOMMEND_DATE_SETTING(state, setting) {
    state.recommendDateSetting = setting
  }
}

export const actions = {
  fetchJobs({ commit, state }, payload) {
    return JobService.fetchJobs(payload).then(res => {
      commit('UPDATE_JOBS', res)
      return res
    })
  },
  fetchJob({ commit, state }, payload) {
    return JobService.fetchJob(payload)
  },
  addToJobCollection({ commit, state }, payload) {
    return JobService.addToJobCollection(payload)
  },
  addToCorpCollection({ commit, state }, payload) {
    return JobService.addToCorpCollection(payload)
  },
  fetchRecommendJobs({ commit, state }, payload) {
    return JobService.fetchRecommendJobs(payload)
  },
  fetchCompanyInfo({ commit, state }, payload) {
    return JobService.fetchCompanyInfo(payload)
  },
  applyJob({ commit, state }, payload) {
    return JobService.applyJob(payload)
  },
  applyPackageJobs({ commit, state }, payload) {
    return JobService.applyPackageJobs(payload)
  },
  fetchHotKeywords({ commit, state }) {
    return JobService.fetchHotKeywords().then(res => {
      commit('UPDATE_HOT_KEYWORDS', res)
      return res
    })
  },
  fetchSearchHistory({ commit, state }) {
    return JobService.fetchSearchHistory().then(res => {
      commit('UPDATE_SEARCH_HISTORIES', res)
      return res
    })
  },
  fetchPackageJobs({ commit, state }, payload) {
    return JobService.fetchPackageJobs(payload).then(res => {
      commit('UPDATE_PACKAGE_JOBS', res)
      return res
    })
  }
}
