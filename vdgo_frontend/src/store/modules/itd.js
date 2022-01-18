import { ITDService} from '../../api/ITDService'
import { GET_ITD } from '../mutation-types'

export default {

state: {
    itd:[]
},

getters: {
    itd: state => state.itd,
},

mutations:{
    [GET_ITD] (state, {itd}) {
        state.itd = itd
      },
    }, 
 
actions: {
    getITD ({ commit }) {
        ITDService.list().then(itd => {
          commit(GET_ITD, { itd })
        })
      },
}      
}