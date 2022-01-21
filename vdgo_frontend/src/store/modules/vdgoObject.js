import { GET_OBJECT } from '../mutation-types'
import axios from "axios"

export default {

state: {
    vdgoObject: {}
},

getters: {
    idObject: state => state.vdgoObject.id,
    clients: state => state.vdgoObject.clients,
    prevBypasses: state => state.vdgoObject.bypasses,
    address: state => state.vdgoObject.address,
    phoneVdgo: state => state.vdgoObject.phone_vdgo,
    emailVdgo: state => state.vdgoObject.email_vdgo
},

mutations:{
    [GET_OBJECT] (state, vdgoObject) {
        state.vdgoObject = vdgoObject
      }
    }, 
 
actions: {
    async loadObject ({ commit }, id) {
      try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/vdg_objects/${id}/`
        )
        commit(GET_OBJECT, response.data)
    } catch (e) {
        console.log(e)
    }
      },
}      
}

