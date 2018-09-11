// import axios from 'axios'
import UserService from '@/services/UserService'
import { groupBy, unionBy } from 'lodash'
import { collectionTypes } from '@const'
import { labelToValue, dateGreater } from '@helper'
export const state = {
  baseInfo: {},
  scoreLog: [],
  pointsLog: [],
  walletLog: [],
  expLog: [],
  collections: [],
  jobCollections: [],
  corpCollections: [],
  histories: [],
  comments: [],
  resume: {},
  userBaseInfo: {},
  certification: {},
  preference: null
}

export const getters = {
  baseInfo: state => state.baseInfo,
  scoreLog: state => state.scoreLog,
  groupedScoreLog: state => groupByMonth(state.scoreLog),
  expLog: state => state.expLog,
  unCollectedExp: state => state.expLog.filter(points => !points.isreceive),
  // collectedExp: state => state.expLog.filter(points => points.isreceive),
  groupedExpLog: state => groupByMonth(state.expLog.filter(points => points.isreceive)),

  pointsLog: state => state.pointsLog,
  unCollectedPoints: state => state.pointsLog.filter(points => !points.isreceive),
  // collectedPoints: state => state.pointsLog.filter(points => points.isreceive),
  groupedPointsLog: state => groupByMonth(state.pointsLog.filter(points => points.isreceive)),

  walletLog: state => state.walletLog,
  collections: state => state.collections,
  jobCollections: state => state.jobCollections,
  corpCollections: state => state.corpCollections,
  histories: state => state.histories,
  comments: state => state.comments,
  resume: state => state.resume,
  userBaseInfo: state => state.userBaseInfo,
  pointsCollectList: state => state.pointsCollectList,
  certification: state => state.certification,
  preference: state => state.preference
}

export const mutations = {
  UPDATE_BASE_INFO(state, info) {
    state.baseInfo = info
  },
  UPDATE_SCORE_LOG(state, scoreLog) {
    state.scoreLog = unionBy(scoreLog, state.scoreLog, 'id')
  },
  UPDATE_POINTS_LOG(state, pointsLog) {
    state.pointsLog = unionBy(pointsLog, state.pointsLog, 'id')
  },
  UPDATE_EXP_LOG(state, expLog) {
    state.expLog = unionBy(expLog, state.expLog, 'id')
  },
  UPDATE_WALLET_LOG(state, walletLog) {
    state.walletLog = unionBy(walletLog, state.walletLog, 'id')
  },
  UPDATE_JOB_COLLECTIONS(state, jobCollections) {
    state.jobCollections = unionBy(jobCollections, state.jobCollections, 'collectionId')
  },
  REMOVE_JOB_COLLECTIONS_ITEM(state, id) {
    let index = state.jobCollections.findIndex(collection => collection.collectionId === id)
    if (index > -1) state.jobCollections.splice(index, 1)
  },
  UPDATE_CORP_COLLECTIONS(state, corpCollections) {
    state.corpCollections = unionBy(corpCollections, state.corpCollections, 'comId')
  },
  REMOVE_CORP_COLLECTIONS_ITEM(state, id) {
    let index = state.corpCollections.findIndex(collection => collection.comId === id)
    if (index > -1) state.corpCollections.splice(index, 1)
  },
  UPDATE_HISTORIES(state, histories) {
    state.histories = unionBy(histories, state.histories, 'recruitmentId')
  },
  UPDATE_COMMENTS(state, comments) {
    state.comments = unionBy(comments, state.comments, 'id')
  },
  UPDATE_RESUME(state, resume) {
    state.resume = resume
  },
  UPDATE_USER_BASE_INFO(state, userBaseInfo) {
    state.userBaseInfo = userBaseInfo
  },
  UPDATE_CERTIFICATION(state, certification) {
    state.certification = certification
  },
  UPDATE_PREFERENCE(state, preference) {
    state.preference = preference
  }
}

export const actions = {
  fetchUser({ commit, state, rootState }, { username }) {
    // 1. Check if we already have the user as a current user.
    const { currentUser } = rootState.auth
    if (currentUser && currentUser.username === username) {
      return Promise.resolve(currentUser)
    }

    // 2. Check if we've already fetched and cached the user.
    const matchedUser = state.cached.find(user => user.name === username)
    if (matchedUser) {
      return Promise.resolve(currentUser)
    }

    // 3. Fetch the user from the API and cache it in case
    //    we need it again in the future.
    // return axios.get(`/users/${username}`).then(response => {
    //   const user = response.data
    //   commit('CACHE_USER', user)
    //   return user
    // })
  },
  signUp({ commit }, payload) {
    return UserService.signUp(payload).then(res => {
      commit('auth/SET_CURRENT_USER', res, { root: true })
      return res
    })
  },
  fetchBaseInfo({ commit }, payload) {
    return UserService.fetchBaseInfo(payload).then(res => {
      commit('UPDATE_BASE_INFO', res)
      return res
    })
  },

  fetchScoreLog({ commit }, payload) {
    return UserService.fetchScoreLog(payload).then(res => {
      commit('UPDATE_SCORE_LOG', res)
      return res
    })
  },

  fetchPointsLog({ commit }, payload) {
    return UserService.fetchPointsLog(payload).then(res => {
      console.log(res.length)

      commit('UPDATE_POINTS_LOG', res)
      return res
    })
  },

  fetchWalletLog({ commit }, payload) {
    return UserService.fetchWalletLog(payload).then(res => {
      commit('UPDATE_WALLET_LOG', res)
      return res
    })
  },

  fetchExpLog({ commit }, payload) {
    return UserService.fetchExpLog(payload).then(res => {
      commit('UPDATE_EXP_LOG', res)
      return res
    })
  },

  fetchCollections({ commit }, payload) {
    let type = payload.type
    payload.type = labelToValue(payload.type, collectionTypes)
    return UserService.fetchCollections(payload).then(res => {
      if (type === 'job') {
        commit('UPDATE_JOB_COLLECTIONS', res)
      } else if (type === 'corp') {
        commit('UPDATE_CORP_COLLECTIONS', res)
      }
      return res
    })
  },
  deleteCollection({ commit }, { id, type }) {
    return UserService.deleteCollection({ id }).then(res => {
      if (type === 'job') {
        commit('REMOVE_JOB_COLLECTIONS_ITEM', id)
      } else if (type === 'corp') {
        commit('REMOVE_CORP_COLLECTIONS_ITEM', id)
      }
      return res
    })
  },
  fetchHistories({ commit }, payload) {
    return UserService.fetchHistories(payload).then(res => {
      commit('UPDATE_HISTORIES', res)
      return res
    })
  },
  fetchComments({ commit }, payload) {
    return UserService.fetchComments(payload).then(res => {
      commit('UPDATE_COMMENTS', res)
      return res
    })
  },
  fetchResume({ commit }) {
    return UserService.fetchResume().then(res => {
      commit('UPDATE_RESUME', res)
      return res
    })
  },
  fetchUserBaseInfo({ commit }, payload) {
    return UserService.fetchUserBaseInfo().then(res => {
      commit('UPDATE_USER_BASE_INFO', payload)
      return res
    })
  },
  updateUserBaseInfo({ commit }, payload) {
    return UserService.updateUserBaseInfo(payload).then(res => {
      commit('UPDATE_USER_BASE_INFO', payload)
      return res
    })
  },
  updateUserContacts({ commit }, payload) {
    return UserService.updateUserContacts(payload)
  },
  updateUserEducation({ commit }, payload) {
    return UserService.updateUserEducation(payload)
  },
  updateUserJobExp({ commit }, payload) {
    return UserService.updateUserJobExp(payload)
  },
  deleteUserJobExp({ commit }, payload) {
    return UserService.deleteUserJobExp(payload).then(res => {
      commit('REMOVE_USER_JOB_EXP', payload)
    })
  },
  updateUserAbout({ commit }, payload) {
    return UserService.updateUserAbout(payload)
  },
  updateUserSkill({ commit }, payload) {
    return UserService.updateUserSkill(payload)
  },
  fetchCertification({ commit }, payload) {
    return UserService.fetchCertification(payload).then(res => {
      commit('UPDATE_CERTIFICATION', res)
      return res
    })
  },
  identifyByIdCard({ commit }, payload) {
    return UserService.identifyByIdCard(payload)
  },
  identifyByStudentCard({ commit }, payload) {
    return UserService.identifyByStudentCard(payload)
  },
  updatePreference({ commit }, payload) {
    return UserService.updatePreference(payload)
  },
  fetchPreference({ commit }) {
    return UserService.fetchPreference().then(res => {
      commit('UPDATE_PREFERENCE', res)
      return res
    })
  },

  collectPoints({ commit }, payload) {
    return UserService.collectPoints(payload)
  },
  collectExp({ commit }, payload) {
    return UserService.collectExp(payload)
  },
  platformFeedback({ commit }, payload) {
    return UserService.platformFeedback(payload)
  },
  companyFeedback({ commit }, payload) {
    return UserService.companyFeedback(payload)
  },
  withdraw({ commit }, payload) {
    return UserService.withdraw(payload)
  },
  updataPassword({ commit }, payload) {
    return UserService.updataPassword(payload)
  },
  changePhone({ commit }, payload) {
    return UserService.changePhone(payload)
  }
}

const groupByMonth = data => {
  if (!(data || data.length)) return []
  let group = Object.entries(groupBy(data, ele => ele.createtime.substr(0, 7)))
  return group.sort((a, b) => a[0] < b[0]).map(ele => {
    ele[1] = ele[1].sort((a, b) => dateGreater(a.createtime, b.createtime, true))
    // TODO count negative and positive
    return ele
  })
}
