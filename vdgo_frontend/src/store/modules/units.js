import { GET_UNITS } from '../mutation-types'
import axios from 'axios'

export default {

    state: () => ({
    units: []
}),

mutations:{
    [GET_UNITS] (state, units) {
        state.units = units
      }
    }, 
 
actions: {
    getUnits ({ commit }) {
        return new Promise((resolve, reject) => {
        axios({url: 'http://127.0.0.1:8000/api/v1/units/',
        method: 'GET' })
        .then(response => {
            commit(GET_UNITS, response.data)
            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
        })
      },
}      
}