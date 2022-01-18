import { GET_BYPASSES } from '../mutation-types'
import axios from 'axios'

export default {

state: {
    bypasses: [],
    selectedDate: '2021-11-25',
    totalBypasses: 0
},

getters: {
    bypasses: state => state.bypasses
},

mutations:{
    [GET_BYPASSES] (state, bypasses) {
        console.log(bypasses)
        bypasses.forEach(bypass => {
            let element = {}
            element.id = bypass.id
            element.address = bypass.object.address
            element.execStatus = bypass.exec_status
            element.fixed = bypass.is_fixed
            element.undoneReason = bypass.undone_reason.name_short
            state.bypasses.push(element)
        }); 
        state.totalBypasses = bypasses.count
      }
    },
 
actions: {
    getBypasses ({commit, state}, executorId) {
      return new Promise((resolve, reject) => {
          axios({ 
              url: 'http://127.0.0.1:8000/api/v1/bypasses',
              params: {
                executor: executorId,
                action_date: state.selectedDate
              },
              method: 'GET'
          })
          .then(response => {
              commit(GET_BYPASSES, response.data)
              resolve(response)
          })
          .catch(err => {
              reject(err)
          })
      })
  }
}      
}

