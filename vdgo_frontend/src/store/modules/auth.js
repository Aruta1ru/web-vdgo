import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, LOGOUT,
    SET_USER_PROFILE } from '../mutation-types.js'
import axios from 'axios'

export default {

state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
},

getters: { 
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userProfile: state => state.user,
    idUser: state => state.user.id, 
    isUser: state => state.user.role === 'user',
    isAvatarName: (state) => {
            let name = state.user.name.split(' ')
            return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
          },  
    isAdmin: state => state.user.role === 'admin',
    roleText: state => {
        if (state.user.role === 'user') return 'Пользователь'
        else if (state.user.role === 'admin') return 'Администратор'
        else return ''
    }
},

mutations:{
    [AUTH_REQUEST] (state) {
        state.status = 'loading'
      },
    [AUTH_SUCCESS] (state, token) {
        state.status = 'success'
        state.token = token
      },
    [AUTH_ERROR] (state) {
        state.status = 'error'
      },
    [LOGOUT] (state) {
        state.status = ''
        state.token = ''
      },
    [SET_USER_PROFILE] (state, profile) {
        state.user.id = profile.executor.id
        state.user.name = profile.executor.name
        state.user.post = profile.executor.post
        state.user.unit = profile.executor.unit.name_short
        state.user.role = profile.role
    },

}, 
 
actions: {
  login({commit, dispatch}, user) {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST') 
            dispatch('showLoadingSpinner')
            axios({url: 'http://127.0.0.1:8000/api/v1/token/',
        data: user, method: 'POST'})
        .then(response => {
            const token = response.data.access
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('AUTH_SUCCESS', token, user)
            resolve(response)
            dispatch('hideLoadingSpinner')      
        }
        )
        .catch(err => { 
            commit('AUTH_ERROR')
            dispatch('catchError', err) 
            dispatch('hideLoadingSpinner')
            localStorage.removeItem('token')
            reject(err)
        })
        })
    },
   
    logout({commit, dispatch}) {
        return new Promise((resolve) => {
            dispatch('showLoadingSpinner')
            commit('LOGOUT')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
            dispatch('hideLoadingSpinner')
        })
    },

     async loadUserProfile({commit}) { 
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/v1/users/profile/'
            )
            commit(SET_USER_PROFILE, response.data)
        } catch (e) { 
            alert('Ошибка' + ' ' + e.response.status 
            + ' ' + e.message) ;
        }
    }
}      
}