import { GET_REASONS,SET_REASON } from '../mutation-types.js'
import axios from "axios"

export default {

state: {
    reasons: [],
    selectedReason: null
},

getters: {
    reasons: state => state.reasons,
    selectedReason: state => state.selectedReason
},

mutations:{
    [GET_REASONS] (state, reasons) {
        state.reasons = reasons
      },

      [SET_REASON] (state, selectedReason) {
        state.selectedReason = selectedReason
    }

    }, 
 
actions: {
  async loadReasons({commit}) {
    try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/v1/undone-reasons/'
        )
        commit(GET_REASONS, response.data)
    } catch (e) {
        alert('Ошибка' + ' ' + e.response.status 
            + ' ' + e.message) ;
        console.log(e)
    }
}, 

setReason({commit}, selectedReason) {
    commit(SET_REASON, selectedReason)
}
}      
}