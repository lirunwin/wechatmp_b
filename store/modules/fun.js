import FunService from '@/services/FunService'
import { unionBy } from 'lodash'
export const state = {
  funEvents: null,
  appliedFunEvents: null,
  comments: null
}

export const getters = {
  funEvents: state => state.funEvents,
  appliedFunEvents: state => state.appliedFunEvents,
  comments: state => state.comments
}

export const mutations = {
  UPDATE_FUN_EVENTS(state, events) {
    state.funEvents = unionBy(events, state.funEvents, 'id')
  },
  UPDATE_APPLIED_FUN_EVENTS(state, events) {
    state.appliedFunEvents = unionBy(events, state.appliedFunEvents, 'id')
  },
  UPDATE_COMMENTS(state, comments) {
    state.comments = unionBy(comments, state.comments, 'id')
  }
}

export const actions = {
  fetchFunEvents({ commit, state }, payload) {
    return FunService.fetchFunEvents(payload).then(res => {
      commit('UPDATE_FUN_EVENTS', res)
      return res
    })
  },
  fetchFunEventDetail({ commit, state }, payload) {
    return FunService.fetchFunEventDetail(payload)
  },
  applyFunEvent({ commit, state }, payload) {
    return FunService.applyFunEvent(payload).then(res => {
      return res
    })
  },
  fetchAppliedFunEvents({ commit, state }, payload) {
    return FunService.fetchAppliedFunEvents(payload).then(res => {
      commit('UPDATE_APPLIED_FUN_EVENTS', res)
      return res
    })
  },
  reserveFunEvent({ commit, state }, payload) {
    return FunService.reserveFunEvent(payload).then(res => {
      return res
    })
  },
  fetchComments({ commit, state }, payload) {
    return FunService.fetchComments(payload).then(res => {
      commit('UPDATE_COMMENTS', res)
      return res
    })
  },
  addComment({ commit, state }, payload) {
    return FunService.addComment(payload).then(res => {
      return res
    })
  }
}
