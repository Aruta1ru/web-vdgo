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
  async loadEquipment ({ commit, dispatch, rootState }) { 
    dispatch('showLoadingSpinner') 
  try {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/equipment/`, {
          params: {
            object:  rootState.vdgoObject.vdgoObject.id
         }
        }
        
    )
    commit(GET_EQUIPMENT, response.data)
    dispatch('hideLoadingSpinner')
} catch (e) {
    dispatch('hideLoadingSpinner')
    console.log(e)
}
  }
}

}