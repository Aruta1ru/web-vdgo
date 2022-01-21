import { GET_REASONS } from '../mutation-types'
import axios from "axios"

export default {

state: {
    reasons: []
},

getters: {
    reasons: state => state.reasons
},

mutations:{
    [GET_REASONS] (state, reasons) {
        state.reasons = reasons
      },
    }, 
 
actions: {
  async loadReasons({commit}) {
    try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/v1/undone-reasons/'
        )
        commit(GET_REASONS, response.data)
    } catch (e) {
        console.log(e)
    }
}
}      
}