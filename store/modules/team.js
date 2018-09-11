import { unionBy } from 'lodash'
import TeamService from '@/services/TeamService'
export const state = {
  myTeam: null,
  searchResult: null,
  invitations: null,
  members: null,
  teamApplications: null,
  settings: null,
  recruitingMissions: null,
  appliedMissions: null,
  finishedMissions: null,
  // owner
  missionsForOwner: null,
  claimedMissionsForOwner: null,
  appliedMissionsForOwner: null,
  teamCreateInfo: null
}

export const getters = {
  myTeam: state => state.myTeam,
  searchResult: state => state.searchResult,
  invitations: state => state.invitations,
  members: state => state.members,
  teamApplications: state => state.teamApplications,
  settings: state => state.settings,
  recruitingMissions: state => state.recruitingMissions,
  appliedMissions: state => state.appliedMissions,
  finishedMissions: state => state.finishedMissions,

  teamCreateInfo: state => state.teamCreateInfo,
  // owner
  missionsForOwner: state => state.missionsForOwner,
  claimedMissionsForOwner: state => state.claimedMissionsForOwner,
  appliedMissionsForOwner: state => state.appliedMissionsForOwner
}

export const mutations = {
  UPDATE_MY_TEAM(state, myTeam) {
    state.myTeam = myTeam
  },
  RESET_SEARCH_RESULT(state, searchResult) {
    state.searchResult = searchResult
  },
  UPDATE_INVITATIONS(state, invitations) {
    state.invitations = invitations
  },
  REMOVE_INVITATIONS_ITEM(state, id) {
    let index = state.invitations.findIndex(invitation => invitation.applyForId === id)
    if (index > -1) state.invitations.splice(index, 1)
  },
  UPDATE_MEMBERS(state, members) {
    state.members = unionBy(members, state.members, 'userId')
  },
  REMOVE_MEMBER(state, id) {
    let index = state.members.findIndex(member => member.userId === id)
    if (index > -1) state.members.splice(index, 1)
  },
  UPDATE_SETTINGS(state, settings) {
    state.settings = settings
  },
  UPDATE_SEARCH_RESULT(state, searchResult) {
    state.searchResult = unionBy(searchResult, state.searchResult, 'teamId')
  },
  UPDATE_TEAM_APPLICATIONS(state, teamApplications) {
    state.teamApplications = unionBy(teamApplications, state.teamApplications, 'teamId')
  },
  UPDATE_RECRUITING_MISSIONS(state, missions) {
    state.recruitingMissions = unionBy(missions, state.recruitingMissions, 'taskId')
  },
  REMOVE_RECRUITING_MISSION_ITEM(state, id) {
    let index = state.recruitingMissions.findIndex(mission => {
      return mission.taskId === id
    })
    if (index > -1) state.recruitingMissions.splice(index, 1)
  },
  UPDATE_APPLIED_MISSIONS(state, { missions, reset = false }) {
    if (reset) state.appliedMissions = []
    state.appliedMissions = unionBy(missions, state.appliedMissions, 'taskId')
  },
  REMOVE_APPLIED_MISSION_ITEM(state, id) {
    let index = state.appliedMissions.findIndex(mission => mission.taskId === id)
    if (index > -1) state.appliedMissions.splice(index, 1)
  },
  UPDATE_FINISHED_MISSIONS(state, missions) {
    state.finishedMissions = unionBy(missions, state.finishedMissions, 'taskId')
  },
  REMOVE_FINISHED_MISSIONS_ITEM(state, id) {
    let index = state.finishedMissions.findIndex(mission => mission.taskId === id)
    if (index > -1) state.finishedMissions.splice(index, 1)
  },
  REMOVE_TEAM_APPLICATIONS_ITEM(state, id) {
    let index = state.teamApplications.findIndex(teamApplication => teamApplication.userId === id)
    if (index > -1) state.teamApplications.splice(index, 1)
  },
  UPDATE_TEAM_CREATE_INFO(state, payload) {
    state.teamCreateInfo = payload
  },

  // owner
  UPDATE_MISSIONS_FOR_OWNER(state, missions) {
    state.missionsForOwner = unionBy(missions, state.missionsForOwner, 'recruitmentId')
  },
  REMOVE_MISSION_ITEM_FOR_OWNER(state, id) {
    let index = state.missionsForOwner.findIndex(job => job.recruitmentId === id)
    if (index > -1) state.missionsForOwner.splice(index, 1)
  },
  RESET_MISSIONS_FOR_OWNER(state) {
    state.missionsForOwner = {}
  },
  UPDATE_CLAIMED_MISSIONS_FOR_OWNER(state, missions) {
    state.claimedMissionsForOwner = unionBy(missions, state.claimedMissionsForOwner, 'taskId')
  },
  REMOVE_CLAIMED_MISSION_ITEM_FOR_OWNER(state, taskId) {
    let index = state.claimedMissionsForOwner.findIndex(job => job.taskId === taskId)
    if (index > -1) state.claimedMissionsForOwner.splice(index, 1)
  },
  REMOVE_USER_FROM_CLAIMED_MISSION_ITEM_FOR_OWNER(state, { taskId, userId }) {
    let task = state.claimedMissionsForOwner.find(task => (task.taskId = taskId))
    task.applyNumber = +task.applyNumber - 1
    let index = task.applyUsers.findIndex(user => user.userId === userId)
    if (index > -1) task.applyUsers.splice(index, 1)
  },
  UPDATE_APPLIED_MISSIONS_FOR_OWNER(state, missions) {
    state.appliedMissionsForOwner = unionBy(missions, state.appliedMissionsForOwner, 'taskId')
  }
}

export const actions = {
  fetchMyTeamInfo({ commit }, payload) {
    return TeamService.fetchMyTeamInfo(payload).then(res => {
      commit('UPDATE_MY_TEAM', res)
      return res
    })
  },

  createTeam({ commit }, payload) {
    return TeamService.createTeam(payload).then(res => {
      return res
    })
  },

  search({ commit }, payload) {
    let reset = payload.reset
    let params = Object.assign({}, payload)
    delete params.reset
    return TeamService.search(params).then(res => {
      if (reset) {
        commit('RESET_SEARCH_RESULT', res)
      } else {
        commit('UPDATE_SEARCH_RESULT', res)
      }
      return res
    })
  },
  applyTeam({ commit }, payload) {
    return TeamService.applyTeam(payload).then(res => {
      return res
    })
  },
  searchUser({ commit }, payload) {
    return TeamService.searchUser(payload)
  },
  fetchInvitations({ commit }, payload) {
    return TeamService.fetchInvitations(payload).then(res => {
      commit('UPDATE_INVITATIONS', res)
      return res
    })
  },
  fetchMembers({ commit }, payload) {
    return TeamService.fetchMembers(payload).then(res => {
      commit('UPDATE_MEMBERS', res)
      return res
    })
  },
  removeMember({ commit }, payload) {
    return TeamService.removeMember(payload).then(res => {
      commit('REMOVE_MEMBER', payload.id)
      return res
    })
  },
  handleInvitation({ commit }, payload) {
    return TeamService.handleInvitation(payload).then(res => {
      commit('REMOVE_INVITATIONS_ITEM', payload.id)
      return res
    })
  },
  quitTeam({ commit }, payload) {
    return TeamService.quitTeam(payload)
  },
  changeTeamRole({ commit }, payload) {
    return TeamService.changeTeamRole(payload)
  },
  rewards({ commit }, payload) {
    return TeamService.rewards(payload)
  },
  fetchTeamApplications({ commit }, payload) {
    return TeamService.fetchTeamApplications(payload).then(res => {
      commit('UPDATE_TEAM_APPLICATIONS', res)
      return res
    })
  },
  updateSettings({ commit }, payload) {
    return TeamService.updateSettings(payload).then(res => {
      commit('UPDATE_SETTINGS', payload)
      return res
    })
  },
  handleApplies({ commit, dispatch }, { id, type }) {
    return TeamService.handleApplies({ id, status: type }).then(res => {
      commit('REMOVE_TEAM_APPLICATIONS_ITEM', id)
      // dispatch('fetchMembers')
      return res
    })
  },
  fetchRecruitingMission({ commit }, payload) {
    let data = Object.assign({ type: 'recruit' }, payload)
    return TeamService.fetchTeamMission(data).then(res => {
      commit('UPDATE_RECRUITING_MISSIONS', res)
      return res
    })
  },
  fetchAppliedMission({ commit }, payload) {
    let data = Object.assign({ type: 'applied' }, payload)
    return TeamService.fetchTeamMission(data).then(res => {
      commit('UPDATE_APPLIED_MISSIONS', { missions: res, reset: payload.pageindex === 1 })
      return res
    })
  },
  applyMission({ commit }, payload) {
    return TeamService.applyMission(payload).then(res => {
      commit('REMOVE_RECRUITING_MISSION_ITEM', payload.id)
      return res
    })
  },
  fetchFinishedMission({ commit }, payload) {
    let data = Object.assign({ type: 'finish' }, payload)
    return TeamService.fetchTeamMission(data).then(res => {
      commit('UPDATE_FINISHED_MISSIONS', res)
      return res
    })
  },
  quitMission({ commit }, payload) {
    return TeamService.quitMission(payload).then(res => {
      commit('REMOVE_APPLIED_MISSION_ITEM', payload.id)
      return res
    })
  },

  // owner fetchMisiionByOwner
  fetchMisiionByOwner({ commit }, payload) {
    return TeamService.fetchMisiionByOwner(payload).then(res => {
      commit('UPDATE_MISSIONS_FOR_OWNER', res)
      return res
    })
  },
  fetchClaimedMissionByOwner({ commit }, payload) {
    return TeamService.fetchClaimedMissionByOwner(payload).then(res => {
      commit('UPDATE_CLAIMED_MISSIONS_FOR_OWNER', res)
      return res
    })
  },
  fetchAppliedMissionByOwner({ commit }, payload) {
    return TeamService.fetchAppliedMissionByOwner(payload).then(res => {
      commit('UPDATE_APPLIED_MISSIONS_FOR_OWNER', res)
      return res
    })
  },
  claimMissionByOwner({ commit }, payload) {
    return TeamService.claimMissionByOwner(payload).then(res => {
      commit('REMOVE_MISSION_ITEM_FOR_OWNER', payload.parttimeId)
      return res
    })
  },
  quitMissionByOwner({ commit }, payload) {
    return TeamService.quitMissionByOwner(payload).then(res => {
      commit('REMOVE_CLAIMED_MISSION_ITEM_FOR_OWNER', payload.id)
      return res
    })
  },
  applyMissionByOwner({ commit }, payload) {
    return TeamService.applyMissionByOwner(payload).then(res => {
      commit('REMOVE_CLAIMED_MISSION_ITEM_FOR_OWNER', payload.id)
      return res
    })
  },
  removeMissonAppliedUser({ commit }, payload) {
    return TeamService.removeMissonAppliedUser(payload).then(res => {
      // TODO
      commit('REMOVE_USER_FROM_CLAIMED_MISSION_ITEM_FOR_OWNER', payload)
      return res
    })
  },
  inviteUser({ commit }, payload) {
    return TeamService.inviteUser(payload).then(res => {
      return res
    })
  },
  fetchTeamCreateInfo({ commit }, payload) {
    return TeamService.fetchTeamCreateInfo(payload).then(res => {
      commit('UPDATE_TEAM_CREATE_INFO', res)
      return res
    })
  },
  dissolveTeam({ commit }, payload) {
    return TeamService.dissolveTeam(payload)
  }
}
