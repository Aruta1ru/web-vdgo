import { ImageService } from '../../api/ImageService' 
import { GET_IMAGES } from '../mutation-types'

export default {

state: {
    images: []
},

getters: {
    images: state => state.images,
},

mutations:{
    [GET_IMAGES] (state, { images }) {
        state.images = images
      }
    },

actions: {
      getImages ({ commit }) {
        ImageService.list().then(images => {
          commit(GET_IMAGES, { images })
        })
      },     
}      
}

