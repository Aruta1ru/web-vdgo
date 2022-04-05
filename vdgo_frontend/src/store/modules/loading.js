import { LOADING_SPINNER_SHOW_MUTATION, 
    LOADING_SPINNER_HIDE_MUTATION } from "../mutation-types.js"


export default {
state : {
showLoading: false
},

getters: {
    showLoading: state => state.showLoading
},

mutations: {
    [LOADING_SPINNER_SHOW_MUTATION] (state) {
        state.showLoading = true;
      },
    
      [LOADING_SPINNER_HIDE_MUTATION] (state) {
        state.showLoading = false;
      }

},
actions: {
showLoadingSpinner({commit}) {
    commit('LOADING_SPINNER_SHOW_MUTATION')
},

hideLoadingSpinner({commit}) {
    commit('LOADING_SPINNER_HIDE_MUTATION')
}
}
}
