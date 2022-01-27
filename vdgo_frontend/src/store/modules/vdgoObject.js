import { GET_OBJECT, GET_OBJECT_DOG_TYPE } from '../mutation-types'
import axios from "axios"

export default {

state: {
    vdgoObject: {},
    objectDogType: null
},

getters: {
    idObject: state => state.vdgoObject.id,
    clients: state => state.vdgoObject.clients,
    prevBypasses: state => state.vdgoObject.bypasses,
    address: state => state.vdgoObject.address,
    phoneVdgo: state => state.vdgoObject.phone_vdgo === null ? "н/д" : state.vdgoObject.phone_vdgo,
    emailVdgo: state => state.vdgoObject.email_vdgo === null ? "н/д" : state.vdgoObject.email_vdgo,
    dogType: (state) => {
        switch (state.objectDogType) {
            case 0: return "Отсутствует";
            case 1: return "Частное лицо";
            case 2: return "Юридическое лицо";
            case 3: return "СБК";
            default: return "н/д";
        }
    }
},

mutations:{
    [GET_OBJECT] (state, vdgoObject) {
        state.vdgoObject = vdgoObject
      },
    [GET_OBJECT_DOG_TYPE] (state, dogType) {
        state.objectDogType = dogType
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

    getDogType({commit}, dogType) {
        commit(GET_OBJECT_DOG_TYPE, dogType)
    }
}      
}

