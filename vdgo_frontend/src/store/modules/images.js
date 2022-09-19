
import { GET_IMAGES, POST_IMAGE, REMOVE_IMAGE} from '../mutation-types.js'
import axios from 'axios'
export default {

state: {
    images: []
},

getters: {
    images: state => state.images,
},

mutations:{
    [GET_IMAGES] (state,  images ) {
        state.images = images
      },
    [POST_IMAGE] (state, newPhoto) {
        state.images.push(newPhoto)
      },

   [REMOVE_IMAGE] (state, id) {
        state.images = state.images.filter(image => image.id !== id);
    } 
  },

actions: {
      async getImages({ commit,dispatch, rootGetters}) { 
        dispatch('showLoadingSpinner')
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/files/`, 
            {
              params: {
                file_category: 0,
                object: rootGetters.idObject,
              },
            }
          );
          commit(GET_IMAGES, response.data);
          dispatch('hideLoadingSpinner')
        } catch (e) {
          console.log(e);
          dispatch('hideLoadingSpinner')
          alert('Ошибка' + ' ' + e.response.status 
            + ' ' + e.message) ;
        }
      }, 

      deletePhoto({commit, dispatch},id) {
        return new Promise((resolve, reject) => {
        axios({url: `http://127.0.0.1:8000/api/v1/files/${id}/`, 
         method: 'DELETE' })
        .then(response => {
          commit('REMOVE_IMAGE', id)
          resolve(response) 
            
        })
        .catch(err => {
          dispatch('catchError', err) 
            reject(err)
        })
        })
    }, 

   uploadPhoto({dispatch, commit, rootGetters}, newPhoto) {
      return new Promise((resolve, reject) => {
      axios({url: `http://127.0.0.1:8000/api/v1/vdg_objects/${rootGetters.idObject}/load_files/`, 
      data: newPhoto,
       method: 'POST' })
      .then(response => { 
          commit('POST_IMAGE', newPhoto)
          dispatch('getImages') 
          resolve(response)
      })
      .catch(err => {
        dispatch('catchError', err) 
          reject(err)
      })
      })
  },

    downloadPhoto ({rootGetters, dispatch}, filename) {
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
    }
  }
  }
