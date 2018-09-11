import { unionBy } from 'lodash'
import MessageService from '@/services/MessageService'
export const state = {
  missionMsgs: [],
  applyMsgs: [],
  teamMsgs: [],
  systemMsgs: [],
  chargeMsgs: []
}

export const getters = {
  missionMsgs: state => state.missionMsgs,
  applyMsgs: state => state.applyMsgs,
  teamMsgs: state => state.teamMsgs,
  systemMsgs: state => state.systemMsgs,
  chargeMsgs: state => state.chargeMsgs
}

export const mutations = {
  UPDATE_MISSION_MSGS(state, missionMsgs) {
    state.missionMsgs = unionBy(missionMsgs, state.missionMsgs, 'id')
  },
  UPDATE_APPLY_MSGS(state, applyMsgs) {
    state.applyMsgs = unionBy(applyMsgs, state.applyMsgs, 'id')
  },
  UPDATE_TEAM_MSGS(state, teamMsgs) {
    state.teamMsgs = unionBy(teamMsgs, state.teamMsgs, 'id')
  },
  UPDATE_SYSTEM_MSGS(state, systemMsgs) {
    state.systemMsgs = unionBy(systemMsgs, state.systemMsgs, 'id')
  },
  UPDATE_CHARGE_MSGS(state, chargeMsgs) {
    state.chargeMsgs = unionBy(chargeMsgs, state.chargeMsgs, 'id')
  }
}

export const actions = {
  fetchMsgs({ commit }, payload) {
    return MessageService.fetchMsgs(payload).then(res => {
      if (payload.msgType === 'task') {
        commit('UPDATE_MISSION_MSGS', res)
      } else if (payload.msgType === 'apply') {
        commit('UPDATE_APPLY_MSGS', res)
      } else if (payload.msgType === 'team') {
        commit('UPDATE_TEAM_MSGS', res)
      } else if (payload.msgType === 'system') {
        commit('UPDATE_SYSTEM_MSGS', res)
      } else if (payload.msgType === 'feedback') {
        commit('UPDATE_CHARGE_MSGS', res)
      }
      return res
    })
  }
}
