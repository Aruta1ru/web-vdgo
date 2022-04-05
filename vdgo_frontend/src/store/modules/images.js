
import { GET_IMAGES, POST_IMAGE} from '../mutation-types.js'
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
      }
  },

actions: {
      async getImages({ commit, dispatch, rootState}) { 
        dispatch('showLoadingSpinner')
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/files/`, 
            {
              params: {
                file_category: 0,
                object: rootState.vdgoObject.vdgoObject.id,
              },
            }
          );
          commit(GET_IMAGES, response.data);
          dispatch('hideLoadingSpinner')
        } catch (e) {
          console.log(e);
          dispatch('hideLoadingSpinner')
        }
      }, 

      deletePhoto({dispatch},id) {
        return new Promise((resolve, reject) => {
        axios({url: `http://127.0.0.1:8000/api/v1/files/${id}/`, 
         method: 'DELETE' })
        .then(response => {
            dispatch('getImages')
            resolve(response) 
            
        })
        .catch(err => {
            reject(err)
        })
        })
    }, 

    uploadPhoto({dispatch, commit, rootState}, newPhoto) {
      return new Promise((resolve, reject) => {
      axios({url: `http://127.0.0.1:8000/api/v1/vdg_objects/${rootState.vdgoObject.vdgoObject.id}/load_files/`, 
      data: newPhoto,
       method: 'POST' })
      .then(response => {
          commit('POST_IMAGE', newPhoto)
          dispatch('getImages')
          resolve(response) 
          
      })
      .catch(err => {
          reject(err)
      })
      })
  },

    downloadPhoto ({rootState}, filename) {
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
    }
  }
  }
