// import { unionBy } from 'lodash'
import RankingService from '@/services/RankingService'
export const state = {
  teamRanking: null,
  userRanking: null
}

export const getters = {
  teamRanking: state => state.teamRanking,
  userRanking: state => state.userRanking
}

export const mutations = {
  UPDATE_TEAM_RANKING(state, ranking) {
    state.teamRanking = ranking
  },
  UPDATE_USER_RANKING(state, ranking) {
    state.userRanking = ranking
  }
}

export const actions = {
  fetchTeamRanking({ commit }, payload) {
    return RankingService.fetchTeamRanking(payload).then(res => {
      commit('UPDATE_TEAM_RANKING', res)
      return res
    })
  },
  fetchUserRanking({ commit }, payload) {
    return RankingService.fetchUserRanking(payload).then(res => {
      commit('UPDATE_USER_RANKING', res)
      return res
    })
  }
}
