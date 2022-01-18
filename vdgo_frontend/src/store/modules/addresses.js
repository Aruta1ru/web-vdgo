import { AddressService }  from '../../api/AddressService' 
import { GET_ADDRESSES } from '../mutation-types'

export default {

state: {
    addresses: []
},

getters: {
    addresses: state => state.addresses
},

mutations:{
    [GET_ADDRESSES] (state, { addresses }) {
        state.addresses = addresses
      }
    }, 
 
actions: {
    getAddresses ({ commit }) {
        AddressService.list().then(addresses => {
          commit(GET_ADDRESSES, { addresses })
        })
      },
}      
}

