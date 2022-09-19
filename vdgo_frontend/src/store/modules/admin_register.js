
import { GET_USERS,
         ADD_USER,
         SET_REGISTER_EXECUTOR,
         SET_REGISTER_USERNAME,
         SET_REGISTER_PASSWORD
        } from '../mutation-types.js'
import axios from 'axios'

export default {

state: {
    registerUser : {
        username: null,
        password: null,
        executor: 0
    },
    users: []
},

getters: {
    users: (state) => state.users
},

mutations:{

    [GET_USERS](state, users) {
        state.users = []  
        for (const user of users) {
          let element = {};
          element.id = user.id;
          element.username = user.username;
          element.role = user.role
          element.executorName = user.executor.name
          element.executorPost = user.executor.post
          element.unitName = user.executor.unit.name_short
          state.users.push(element);
        }
      }, 

    [SET_REGISTER_EXECUTOR] (state, executor) {
        state.registerUser.executor = executor.id
    },
    [SET_REGISTER_USERNAME] (state, username) {
        state.registerUser.username = username
    },
    [SET_REGISTER_PASSWORD] (state, password) {
        state.registerUser.password = password
    },

    [ADD_USER] (state, newUser) {
        let element = {};
        element.id = newUser.id;
        element.username = newUser.username;
        element.role = newUser.role
        element.executorName = newUser.executor.name
        element.executorPost = newUser.executor.post
        element.unitName = newUser.executor.unit.name_short
        state.users.push(element)
      },

}, 
 
actions: {
    
    register({ commit, dispatch, state}) {
        return new Promise((resolve, reject) => {
            axios({url: 'http://127.0.0.1:8000/api/v1/users/',
        data: state.registerUser, method: 'POST' })
        .then(response => { 
            commit('ADD_USER', response.data)
            resolve(response)
        })
        .catch(err => { 
            dispatch('catchError', err) 
            reject(err)
        })
        })
    },
    
     async loadUsers({commit, dispatch}) { 
        dispatch('showLoadingSpinner')
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/v1/users/'
            )
            commit(GET_USERS, response.data.results)
            dispatch('hideLoadingSpinner')
        } catch (e) { 
            dispatch('hideLoadingSpinner')
            alert('Ошибка' + ' ' + e.response.status 
            + ' ' + e.message) ;
        }
    }
}      
}