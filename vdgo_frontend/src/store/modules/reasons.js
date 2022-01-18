import { ReasonsService } from '../../api/ReasonsService'
import { GET_REASONS } from '../mutation-types'

export default {

state: {
    reasons: []
},

getters: {
    reasons: state => state.reasons
},

mutations:{
    [GET_REASONS] (state, {reasons}) {
        state.reasons = reasons
      },
    }, 
 
actions: {
    getReasons ({ commit }) {
        ReasonsService.list().then(reasons => {
          commit(GET_REASONS, { reasons })
        })
      },
}      
}