import axios from 'axios'

export default {
  fetchTeamRanking: data => axios.post('ranking/teamrank', data),
  fetchUserRanking: data => axios.post('ranking/userrank', data)
}
