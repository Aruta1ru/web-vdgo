import { GET_EXECUTORS, SET_UNIT } from '../mutation-types.js'
import axios from 'axios'

export default {

state: {
    unit: 0,
    executors:[]
},

getters: {
    executors: state => state.executors,
},

mutations:{
    [GET_EXECUTORS] (state, executors) {
        state.executors = executors
      },
      [SET_UNIT] (state, unit) {
        state.unit = unit
      }
}, 
 
actions: {
  getExecutors ({ state, commit }, unit) {
    commit(SET_UNIT, unit)
    return new Promise((resolve, reject) => {
    axios({url: 'http://127.0.0.1:8000/api/v1/executors/',
    params: {
      unit: state.unit
    },
    method: 'GET' })
    .then(response => {
        commit(GET_EXECUTORS, response.data)
        resolve(response)
    })
    .catch(err => {
        reject(err)
    })
    })
  },
}      
}