
import { GET_ITD, POST_ITD } from '../mutation-types.js'
import axios from 'axios'

export default {

state: {
    itd:[]
},

getters: {
    itd: state => state.itd,
},

mutations:{
    [GET_ITD] (state, itd) {
        state.itd = itd
      }, 
     [POST_ITD] (state, newITD) {
       state.itd.push(newITD)
     },
    }, 
 
actions: {

      async loadITD ({ commit, dispatch, rootState }) { 
        dispatch('showLoadingSpinner') 
      try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/files/`, {
              params: {
                file_category: 1,
                object:  rootState.vdgoObject.vdgoObject.id
             }
            }
            
        )
        commit(GET_ITD, response.data)
        dispatch('hideLoadingSpinner')
    } catch (e) {
        dispatch('hideLoadingSpinner')
        console.log(e)
    }
},

deleteITD({dispatch},id) {
  return new Promise((resolve, reject) => {
  axios({url: `http://127.0.0.1:8000/api/v1/files/${id}/`, 
   method: 'DELETE' })
  .then(response => {
      dispatch('loadITD')
      resolve(response) 
      
  })
  .catch(err => {
      reject(err)
  })
  })
},

downloadITD ({rootState}, filename) {
  axios({
    url: require(`../../../../vdgo_backend/media/${rootState.vdgoObject.vdgoObject.id}/${filename}`),
    method: 'GET',
    responseType: 'blob',
  })
  .then ((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
  })
},


uploadITD({dispatch, commit, rootState}, newITD) {
  return new Promise((resolve, reject) => {
  axios({url: `http://127.0.0.1:8000/api/v1/vdg_objects/${rootState.vdgoObject.vdgoObject.id}/load_files/`, 
  data: newITD,
   method: 'POST' })
  .then(response => {
      commit('POST_ITD', newITD)
      dispatch('loadITD')
      resolve(response) 
      
  })
  .catch(err => {
      reject(err)
  })
  })
},

}
}