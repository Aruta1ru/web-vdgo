import { EquipmentService } from '../../api/EquipmentService' 
import { GET_EQUIPMENT } from '../mutation-types'

export default {

state: {
    equipment:[]
},

getters: {
    equipment: state => state.equipment
},

mutations:{
    [GET_EQUIPMENT] (state, {equipment}) {
        state.equipment = equipment
      }
    }, 
 
actions: {
    getEquipment ({ commit }) {
        EquipmentService.list().then(equipment => {
          commit(GET_EQUIPMENT, { equipment })
        })
      },
}      
}