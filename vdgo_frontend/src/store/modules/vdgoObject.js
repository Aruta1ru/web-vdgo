import { GET_OBJECT, GET_OBJECT_DOG_TYPE, SET_NEW_EMAIL_VDGO,
SET_NEW_PHONE_VDGO } from '../mutation-types.js'
import axios from "axios"

export default {

state: {
    vdgoObject: {},
    objectDogType: null,
    newEmailVdgo: null,
    newPhoneVdgo: null
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
      },
    
    [SET_NEW_EMAIL_VDGO]  (state, newEmailVdgo) {
        state.newEmailVdgo = newEmailVdgo
    }, 

    [SET_NEW_PHONE_VDGO]  (state, newPhoneVdgo) {
        state.newPhoneVdgo = newPhoneVdgo
    }
    }, 
 
actions: {
    async loadObject ({ commit, dispatch }, id) { 
        dispatch('showLoadingSpinner') 
      try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/vdg_objects/${id}/`
        )
        commit(GET_OBJECT, response.data)
        dispatch('hideLoadingSpinner')
    } catch (e) {
        dispatch('hideLoadingSpinner')
        console.log(e)
    }
      }, 

      updateEmail({dispatch,commit, getters,state}, id) {
        return new Promise((resolve, reject) => {
            axios({url: `http://127.0.0.1:8000/api/v1/vdg_objects/${id}/`,
        data: {
        id:  getters.idObject,
        address: getters.address,  
        email_vdgo: state.newEmailVdgo, 

        }, method: 'PUT' })
        .then(response => { 
          if (response.status === 200) {
            commit('SET_NEW_EMAIL_VDGO', response.data)
            dispatch('loadObject', id)
            resolve(response) 
          }
        })
        .catch(err => {
            reject(err)
        })
        })
    },

    updatePhone({dispatch,commit, getters,state}, id) {
        return new Promise((resolve, reject) => {
            axios({url: `http://127.0.0.1:8000/api/v1/vdg_objects/${id}/`,
        data: {
        id:  getters.idObject,
        address: getters.address,  
        phone_vdgo: state.newPhoneVdgo, 

        }, method: 'PUT' })
        .then(response => { 
          if (response.status === 200) {
            commit('SET_NEW_PHONE_VDGO', response.data)
            dispatch('loadObject', id)
            resolve(response) 
          }
        })
        .catch(err => {
            reject(err)
        })
        })
    },

    setEmail({commit}, newEmailVdgo) {
        commit(SET_NEW_EMAIL_VDGO, newEmailVdgo)
    }, 

    setPhone({commit}, newPhoneVdgo) {
        commit(SET_NEW_PHONE_VDGO, newPhoneVdgo)
    },

    getDogType({commit}, dogType) {
        commit(GET_OBJECT_DOG_TYPE, dogType)
    }
}      
}

