import { GET_EQUIPMENT } from '../mutation-types.js'
import axios from 'axios'
export default {

state: {
    equipment:[]
},

getters: {
    equipment: state => state.equipment
},

mutations:{
    [GET_EQUIPMENT] (state, equipment) {
        state.equipment = equipment
      }
    }, 
 
actions: {
  async loadEquipment ({ commit,dispatch, rootGetters }) { 
    dispatch('showLoadingSpinner')  
  try {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/equipment/`, {
          params: {
            object:  rootGetters.idObject
         }
        }
)
    commit(GET_EQUIPMENT, response.data)
    dispatch('hideLoadingSpinner')
} catch (e) {
    dispatch('hideLoadingSpinner')
    alert('Ошибка' + ' ' + e.response.status 
            + ' ' + e.message) 
    console.log(e)
}
  }
}

}