
import { GET_ITD, POST_ITD, REMOVE_FILE } from '../mutation-types.js'
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

     [REMOVE_FILE] (state, id) {
      state.itd = state.itd.filter(itdFile => itdFile.id !== id);
  } 

  }, 
 
actions: {

      async loadITD ({ dispatch, commit, rootGetters }) { 
        dispatch('showLoadingSpinner') 
      try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/files/`, {
              params: {
                file_category: 1,
                object:  rootGetters.idObject
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

deleteITD({commit, dispatch}, id) {
  return new Promise((resolve, reject) => {
  axios({url: `http://127.0.0.1:8000/api/v1/files/${id}/`, 
   method: 'DELETE' })
  .then(response => { 
      commit('REMOVE_FILE', id)
      resolve(response) 
  })
  .catch(err => {
    dispatch('catchError', err) 
      reject(err)
  })
  })
},

downloadITD ({rootGetters, dispatch}, filename) {
  axios({
    url: require(`../../../../vdgo_backend/media/${rootGetters.idObject}/${filename}`),
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
  .catch(err => {
    dispatch('catchError', err) 
})
},


uploadITD({dispatch, commit, rootGetters}, newITD) {
  return new Promise((resolve, reject) => {
  axios({url: `http://127.0.0.1:8000/api/v1/vdg_objects/${rootGetters.idObject}/load_files/`, 
  data: newITD,
   method: 'POST' })
  .then(response => {
      commit('POST_ITD', newITD)
      dispatch('loadITD')
      resolve(response) 
      
  })
  .catch(err => {
      dispatch('catchError', err) 
      reject(err)
  })
  })
}, 

openITD({rootGetters}, filename) {
  window.open(require(`../../../../vdgo_backend/media/${rootGetters.idObject}/${filename}`))
}


}
}