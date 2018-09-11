import MissionService from '@/services/MissionService'
import { labelToValue } from '@helper'
import { applyStatuses } from '@const'
import { unionBy } from 'lodash'
export const state = {
  countInfo: {},
  myMissions: [],
  invitations: [],
  applications: [],
  completedMissions: [],
  detail: {},
  myMissionLog: [],
  orders: [],
  salaryLog: [],
  checkInOutLog: [],
  checkStatus: {}
}

export const getters = {
  countInfo: state => state.countInfo,
  myMissions: state => state.myMissions,
  invitations: state => state.invitations,
  applications: state => state.applications,
  completedMissions: state => state.completedMissions,
  detail: state => state.detail,
  myMissionLog: state => state.myMissionLog,
  orders: state => state.orders,
  salaryLog: state => state.salaryLog,
  checkInOutLog: state => state.checkInOutLog,
  checkStatus: state => state.checkStatus
}

export const mutations = {
  UPDATE_COUNT_INFO(state, countInfo) {
    state.countInfo = countInfo
  },
  UPDATE_MY_MISSIONS(state, myMissions) {
    state.myMissions = unionBy(myMissions, state.myMissions, 'deliveryId')
  },
  REMOVE_MY_MISSION_ITEM(state, id) {
    let index = state.myMissions.findIndex(myMission => myMission.deliveryId === id)
    if (index > -1) state.myMissions.splice(index, 1)
  },
  UPDATE_INVITATIONS(state, invitations) {
    state.invitations = unionBy(invitations, state.invitations, 'deliveryId')
  },
  REMOVE_INVITATIONS_ITEM(state, id) {
    let index = state.invitations.findIndex(invitation => invitation.deliveryId === id)
    if (index > -1) state.invitations.splice(index, 1)
  },
  UPDATE_INVITATION(state, { id, flag }) {
    // change status
    let invitation = state.invitations.find(invitation => invitation.deliveryId === id)
    if (!invitation) return
    invitation.deliveryStatus = labelToValue(flag ? 'pass' : 'reject', applyStatuses)
    // add to state.myMissions
    state.myMissions = unionBy([invitation], state.myMissions, 'deliveryId')
    // delete from state.invitaions
    let index = state.invitations.findIndex(invitation => invitation.deliveryId === id)
    if (index > -1) state.invitations.splice(index, 1)
  },

  UPDATE_APPLICATIONS(state, applications) {
    state.applications = unionBy(applications, state.applications, 'deliveryId')
  },
  UPDATE_COMPLETED_MISSIONS(state, completedMissions) {
    state.completedMissions = unionBy(completedMissions, state.completedMissions, 'deliveryId')
  },
  UPDATE_DETAIL(state, detail) {
    state.detail = detail
  },
  UPDATE_MISSION_LOG(state, myMissionLog) {
    state.myMissionLog = unionBy(myMissionLog, state.myMissionLog)
  },
  UPDATE_ORDERS(state, payload) {
    let orders = Object.assign({}, payload)
    orders.list = unionBy(orders.list, state.orders.list, 'orderid')
    state.orders = orders
  },
  ADD_ORDER(state, order) {
    state.orders.list.push(order)
    // salaryLog.list = unionBy([salaryLog], state.salaryLog.list, 'id')
    // state.salaryLog = salaryLog
  },
  UPDATE_SALARY_LOG(state, payload) {
    let salaryLog = Object.assign({}, payload)
    salaryLog.list = unionBy(salaryLog.list, state.salaryLog.list, 'id')
    state.salaryLog = salaryLog
  },
  UPDATE_CHECK_IN_OUT_LOG(state, payload) {
    let checkInOutLog = Object.assign({}, payload)
    checkInOutLog.list = unionBy(checkInOutLog.list, state.checkInOutLog.list, 'signinId')
    state.checkInOutLog = checkInOutLog
  },
  UPDATE_CHECK_STATUS(state, checkStatus) {
    state.checkStatus = checkStatus
  }
}

export const actions = {
  feedback({ commit, state }, payload) {
    return MissionService.feedback(payload)
  },
  fetchCountInfo({ commit, state }, payload) {
    return MissionService.fetchCountInfo(payload).then(res => {
      commit('UPDATE_COUNT_INFO', res)
      return res
    })
  },
  fetchMyMissions({ commit, state }, payload) {
    return MissionService.fetchMyMissions(payload).then(res => {
      commit('UPDATE_MY_MISSIONS', res)
      return res
    })
  },
  fetchInvitations({ commit, state }, payload) {
    return MissionService.fetchInvitations(payload).then(res => {
      commit('UPDATE_INVITATIONS', res)
      return res
    })
  },
  fetchApplications({ commit, state }, payload) {
    return MissionService.fetchApplications(payload).then(res => {
      commit('UPDATE_APPLICATIONS', res)
      return res
    })
  },
  fetchCompletedMissions({ commit, state }, payload) {
    return MissionService.fetchCompletedMissions(payload).then(res => {
      commit('UPDATE_COMPLETED_MISSIONS', res)
      return res
    })
  },
  postComment({ commit, state }, payload) {
    return MissionService.postComment(payload).then(res => {
      commit('UPDATE_COMPLETED_MISSION_ITEM', res)
      return res
    })
  },
  handleInvitation({ commit, state }, payload) {
    return MissionService.handleInvitation(payload).then(res => {
      commit('UPDATE_INVITATION', payload)
      return res
    })
  },
  fetchDetail({ commit, state }, payload) {
    return MissionService.fetchDetail(payload).then(res => {
      commit('UPDATE_MISSION_LOG', res)
      return res
    })
  },
  fetchOrders({ commit, state }, payload) {
    return MissionService.fetchOrders(payload).then(res => {
      commit('UPDATE_ORDERS', res)
      return res
    })
  },
  fetchSalaryLog({ commit, state }, payload) {
    return MissionService.fetchSalaryLog(payload).then(res => {
      commit('UPDATE_SALARY_LOG', res)
      return res
    })
  },
  fetchCheckInOutLog({ commit, state }, payload) {
    return MissionService.fetchCheckInOutLog(payload).then(res => {
      commit('UPDATE_CHECK_IN_OUT_LOG', res)
      return res
    })
  },
  checkIn({ commit, state }, payload) {
    return MissionService.checkIn(payload)
  },
  checkOut({ commit, state }, payload) {
    return MissionService.checkOut(payload)
  },
  fetchCheckStatus({ commit, state }, payload) {
    return MissionService.fetchCheckStatus(payload).then(res => {
      commit('UPDATE_CHECK_STATUS', res)
      return res
    })
  },
  addOrder({ commit, state }, payload) {
    return MissionService.addOrder(payload).then(res => {
      payload.id = res

      commit('ADD_ORDER', payload)
      return res
    })
  },
  cancelMission({ commit, state }, payload) {
    return MissionService.cancelMission(payload).then(res => {
      commit('REMOVE_MY_MISSION_ITEM', payload.id)
      commit('REMOVE_INVITATIONS_ITEM', payload.id)
      return res
    })
  },
  endMission({ commit, state }, payload) {
    return MissionService.endMission(payload).then(res => {
      commit('REMOVE_MY_MISSION_ITEM', payload.id)
      return res
    })
  },
  delayMission({ commit, state }, payload) {
    return MissionService.delayMission(payload)
  },
  patchOrder({ commit, state }, payload) {
    return MissionService.patchOrder(payload)
  },
  overdueCheckInOut({ commit, state }, payload) {
    return MissionService.overdueCheckInOut(payload)
  }
}
